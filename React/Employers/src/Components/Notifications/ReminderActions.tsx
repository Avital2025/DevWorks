import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
import CheckIcon from "@mui/icons-material/Check"
import AddAlertIcon from "@mui/icons-material/AddAlert"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"

export default function ReminderActions({
  unreadCount,
  onMarkAllAsRead,
  onCloseMenu,
}: {
  unreadCount: number,
  onMarkAllAsRead: () => void,
  onCloseMenu: () => void
}) {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          mb: 1.5,
          direction: "rtl",
        }}
      >
        <Button
          onClick={onMarkAllAsRead}
          fullWidth
          variant="outlined"
          startIcon={<CheckIcon />}
          disabled={unreadCount === 0}
          sx={{ borderRadius: 1.5 }}
        >
          Mark all as read
        </Button>
        <Button
          component={Link}
          to="/add-reminders"
          onClick={onCloseMenu}
          fullWidth
          variant="contained"
          startIcon={<AddAlertIcon />}
          sx={{ borderRadius: 1.5 }}
        >
          Add reminder
        </Button>
      </Box>

      <Button
        component={Link}
        to="/reminders"
        onClick={onCloseMenu}
        fullWidth
        variant="text"
        color="primary"
        startIcon={<FormatListBulletedIcon />}
        sx={{ borderRadius: 1.5 }}
      >
        View all notifications
      </Button>
    </Box>
  )
}

