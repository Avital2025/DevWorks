import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
  Divider
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useReminderService } from "../utils/useReminderService";
import { Reminder } from "../types/reminderType";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import MarkunreadIcon from "@mui/icons-material/Markunread"; // סימן של "לא נקרא"
import ReminderDialog from "./ReminderDialog";

export default function RemindersMenu() {
  const { fetchReminders, markAsDone } = useReminderService();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogReminder, setDialogReminder] = useState<Reminder | null>(null);
  const open = Boolean(anchorEl);

  const fetch = async () => {
    const data = await fetchReminders();

    // סדר לפי: לא נקראים קודם, ואז לפי תאריך יורד
    const sorted = data
      .sort((a, b) => {
        if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
        return new Date(b.time ?? 0).getTime() - new Date(a.time ?? 0).getTime();

      });

    setReminders(sorted);
  };

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, 30000);
  
    const onUpdate = () => fetch(); // <<< מאזין לאירוע
    window.addEventListener("reminders-updated", onUpdate); // <<< מאזין
  
    return () => {
      clearInterval(interval);
      window.removeEventListener("reminders-updated", onUpdate); // <<< ניקוי
    };
  }, []);
  

  const unreadCount = reminders.filter((r) => !r.isRead).length;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAllAsRead = async () => {
    const unread = reminders.filter((r) => !r.isRead);
    await Promise.all(unread.map((r) => markAsDone(r.id)));
    fetch();
  };

  const handleMarkOneAsRead = async (id: number) => {
    await markAsDone(id);
    fetch();
  };

  const handleOpenDialog = (reminder: Reminder) => {
    setDialogReminder(reminder);
  };

  return (
    <>
      <IconButton onClick={handleClick} sx={{ color: "#333", position: "relative" }}>
        <NotificationsIcon />
        {unreadCount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 2,
              right: 2,
              backgroundColor: "red",
              color: "white",
              fontSize: "10px",
              minWidth: 16,
              height: 16,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            {unreadCount}
          </Box>
        )}
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box sx={{ px: 2, pt: 1, minWidth: 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            התראות
          </Typography>
          <Divider />

          {reminders.length === 0 && (
            <Typography sx={{ p: 2 }} align="center">
            אין תזכורות להצגה 
            </Typography>
          )}

          {reminders.slice(0, 5).map((reminder) => (
            <MenuItem
              key={reminder.id}
              sx={{ whiteSpace: "normal", display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => handleOpenDialog(reminder)}>
                <Typography fontWeight="bold">{reminder.title}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {reminder.time
                    ? new Date(reminder.time).toLocaleString()
                    : "ללא תאריך"}
                </Typography>
              </Box>

              {/* אייקון - סמן כנקרא */}
              {!reminder.isRead ? (
                <IconButton size="small" onClick={() => handleMarkOneAsRead(reminder.id)}>
                  <MarkunreadIcon fontSize="small" />
                </IconButton>
              ) : (
                <CheckIcon fontSize="small" color="disabled" />
              )}
            </MenuItem>
          ))}

          <Divider sx={{ my: 1 }} />

          <Box sx={{ px: 1, display: "flex", justifyContent: "space-between", gap: 1 }}>
            <Button onClick={handleMarkAllAsRead} fullWidth>
              סמן הכל כנקרא
            </Button>
            <Button
              component={Link}
              to="/add-reminders"
              onClick={handleClose}
              fullWidth
            >
              הוסף תזכורת
            </Button>
          </Box>

          <Box sx={{ px: 1, pt: 1 }}>
            <Button
              component={Link}
              to="/reminders"
              onClick={handleClose}
              fullWidth
              variant="outlined"
            >
              לצפייה בכל ההתראות
            </Button>
          </Box>
        </Box>
      </Menu>

      {/* דיאלוג תזכורת */}
      <ReminderDialog reminder={dialogReminder} onClose={() => setDialogReminder(null)} />



    </>
  );
}
