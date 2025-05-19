import { useEffect, useState } from "react"
import {
  IconButton, Menu, Fade, Tooltip, Badge, Box, Chip, Typography
} from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useReminderService } from "../utils/useReminderService"
import type { Reminder } from "../types/reminderType"
import ReminderActions from "./Notifications/ReminderActions"
import ReminderDialog from "./Notifications/ReminderDialog"
import ReminderMenuList from "./Notifications/ReminderMenuList"


export default function RemindersMenu() {
  const { fetchReminders, markAsDone } = useReminderService()
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dialogReminder, setDialogReminder] = useState<Reminder | null>(null)

  const open = Boolean(anchorEl)
  const unreadCount = reminders.filter((r) => !r.isRead).length

  const fetch = async () => {
    const data = await fetchReminders()
    const sorted = data.sort((a, b) => {
      if (a.isRead !== b.isRead) return a.isRead ? 1 : -1
      return new Date(b.time ?? 0).getTime() - new Date(a.time ?? 0).getTime()
    })
    setReminders(sorted)
  }

  useEffect(() => {
    fetch()
    const interval = setInterval(fetch, 30000)
    const onUpdate = () => fetch()
    window.addEventListener("reminders-updated", onUpdate)
    return () => {
      clearInterval(interval)
      window.removeEventListener("reminders-updated", onUpdate)
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleMarkAllAsRead = async () => {
    const unread = reminders.filter((r) => !r.isRead)
    await Promise.all(unread.map((r) => markAsDone(r.id)))
    fetch()
  }

  const handleMarkOneAsRead = async (id: number) => {
    await markAsDone(id)
    fetch()
  }

  const handleOpenDialog = (reminder: Reminder) => {
    setDialogReminder(reminder)
  }

  return (
    <>
      <Tooltip title="Notifications" arrow>
        <IconButton onClick={handleClick} sx={{ color: open ? "primary.main" : "text.primary" }}>
          <Badge
            badgeContent={unreadCount}
            color="error"
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "10px", height: "18px", minWidth: "18px", padding: "0 4px", fontWeight: "bold"
              },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          elevation: 5,
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 320,
            overflow: "hidden",
            "& .MuiList-root": { padding: 0 },
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{
          bgcolor: "primary.light",
          color: "primary.contrastText",
          px: 2, py: 1.5,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          direction: "rtl"
        }}>
          <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
          {unreadCount > 0 && (
            <Chip label={`${unreadCount} new`} size="small" color="error" sx={{ fontWeight: "bold" }} />
          )}
        </Box>

        <ReminderMenuList
          reminders={reminders}
          onOpenDialog={handleOpenDialog}
          onMarkOneAsRead={handleMarkOneAsRead}
        />

        <ReminderActions
          unreadCount={unreadCount}
          onMarkAllAsRead={handleMarkAllAsRead}
          onCloseMenu={handleClose}
        />
      </Menu>

      <ReminderDialog reminder={dialogReminder} onClose={() => setDialogReminder(null)} />
    </>
  )
}


