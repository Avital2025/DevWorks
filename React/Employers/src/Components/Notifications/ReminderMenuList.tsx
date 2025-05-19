import {
    Box, Typography, MenuItem, Avatar, IconButton, Tooltip
  } from "@mui/material"
  import AccessTimeIcon from "@mui/icons-material/AccessTime"
  import CheckIcon from "@mui/icons-material/Check"
  import MarkunreadIcon from "@mui/icons-material/Markunread"
  import NotificationsIcon from "@mui/icons-material/Notifications"
import { Reminder } from "../../types/reminderType"
  
  export default function ReminderList({
    reminders,
    onOpenDialog,
    onMarkOneAsRead,
  }: {
    reminders: Reminder[],
    onOpenDialog: (reminder: Reminder) => void,
    onMarkOneAsRead: (id: number) => void
  }) {
    return (
      <Box sx={{ maxHeight: 350, overflow: "auto" }}>
        {reminders.length === 0 && (
          <Box sx={{
            p: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
            color: "text.secondary"
          }}>
            <NotificationsIcon sx={{ fontSize: 40, opacity: 0.5 }} />
            <Typography align="center">No reminders to display</Typography>
          </Box>
        )}
  
        {reminders.slice(0, 5).map((reminder) => (
          <MenuItem
            key={reminder.id}
            sx={{
              whiteSpace: "normal",
              display: "flex", alignItems: "flex-start", gap: 1.5,
              py: 1.5, px: 2,
              borderBottom: "1px solid", borderColor: "divider",
              bgcolor: reminder.isRead ? "transparent" : "rgba(25, 118, 210, 0.05)",
              direction: "rtl",
              "&:hover": {
                bgcolor: reminder.isRead ? "rgba(0, 0, 0, 0.04)" : "rgba(25, 118, 210, 0.08)"
              }
            }}
          >
            <Avatar sx={{
              bgcolor: reminder.isRead ? "grey.300" : "primary.light",
              width: 36, height: 36
            }}>
              <NotificationsIcon fontSize="small" />
            </Avatar>
  
            <Box
              sx={{ flexGrow: 1, cursor: "pointer", overflow: "hidden" }}
              onClick={() => onOpenDialog(reminder)}
            >
              <Typography
                fontWeight={reminder.isRead ? "normal" : "bold"}
                sx={{
                  mb: 0.5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {reminder.title}
              </Typography>
  
              <Box sx={{
                display: "flex", alignItems: "center", gap: 0.5,
                color: "text.secondary", fontSize: "0.75rem"
              }}>
                <AccessTimeIcon sx={{ fontSize: "0.875rem" }} />
                <Typography variant="caption">
                  {reminder.time ? new Date(reminder.time).toLocaleString() : "No date"}
                </Typography>
              </Box>
            </Box>
  
            {!reminder.isRead ? (
              <Tooltip title="Mark as read" arrow>
                <IconButton
                  size="small"
                  onClick={() => onMarkOneAsRead(reminder.id)}
                  sx={{
                    color: "primary.main",
                    "&:hover": { bgcolor: "primary.lighter" }
                  }}
                >
                  <MarkunreadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <CheckIcon fontSize="small" color="disabled" sx={{ mt: 0.5 }} />
            )}
          </MenuItem>
        ))}
      </Box>
    )
  }
  
