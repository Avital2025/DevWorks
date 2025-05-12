import type React from "react"
import { IconButton, Menu, MenuItem, Typography, Box, Button, Badge, Tooltip, Fade, Chip, Avatar } from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useReminderService } from "../utils/useReminderService"
import type { Reminder } from "../types/reminderType"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CheckIcon from "@mui/icons-material/Check"
import MarkunreadIcon from "@mui/icons-material/Markunread"
import ReminderDialog from "./ReminderDialog"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import AddAlertIcon from "@mui/icons-material/AddAlert"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"

export default function RemindersMenu() {
  const { fetchReminders, markAsDone } = useReminderService()
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dialogReminder, setDialogReminder] = useState<Reminder | null>(null)
  const open = Boolean(anchorEl)

  const fetch = async () => {
    const data = await fetchReminders()

    // סדר לפי: לא נקראים קודם, ואז לפי תאריך יורד
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

  const unreadCount = reminders.filter((r) => !r.isRead).length

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
      <Tooltip title="התראות" arrow>
        <IconButton
          onClick={handleClick}
          sx={{
            color: open ? "primary.main" : "text.primary",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              transform: "scale(1.05)",
            },
          }}
        >
          <Badge
            badgeContent={unreadCount}
            color="error"
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "10px",
                height: "18px",
                minWidth: "18px",
                padding: "0 4px",
                fontWeight: "bold",
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
            "& .MuiList-root": {
              padding: 0,
            },
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.light",
            color: "primary.contrastText",
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            direction: "rtl",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            התראות
          </Typography>
          {unreadCount > 0 && (
            <Chip label={`${unreadCount} חדשות`} size="small" color="error" sx={{ fontWeight: "bold" }} />
          )}
        </Box>

        <Box sx={{ maxHeight: 350, overflow: "auto" }}>
          {reminders.length === 0 && (
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
              }}
            >
              <NotificationsIcon sx={{ fontSize: 40, opacity: 0.5 }} />
              <Typography align="center">אין תזכורות להצגה</Typography>
            </Box>
          )}

          {reminders.slice(0, 5).map((reminder) => (
            <MenuItem
              key={reminder.id}
              sx={{
                whiteSpace: "normal",
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                py: 1.5,
                px: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: reminder.isRead ? "transparent" : "rgba(25, 118, 210, 0.05)",
                direction: "rtl",
                "&:hover": {
                  bgcolor: reminder.isRead ? "rgba(0, 0, 0, 0.04)" : "rgba(25, 118, 210, 0.08)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: reminder.isRead ? "grey.300" : "primary.light",
                  width: 36,
                  height: 36,
                }}
              >
                <NotificationsIcon fontSize="small" />
              </Avatar>

              <Box
                sx={{
                  flexGrow: 1,
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => handleOpenDialog(reminder)}
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

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: "0.875rem" }} />
                  <Typography variant="caption">
                    {reminder.time ? new Date(reminder.time).toLocaleString() : "ללא תאריך"}
                  </Typography>
                </Box>
              </Box>

              {/* אייקון - סמן כנקרא */}
              {!reminder.isRead ? (
                <Tooltip title="סמן כנקרא" arrow>
                  <IconButton
                    size="small"
                    onClick={() => handleMarkOneAsRead(reminder.id)}
                    sx={{
                      color: "primary.main",
                      "&:hover": { bgcolor: "primary.lighter" },
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
              onClick={handleMarkAllAsRead}
              fullWidth
              variant="outlined"
              startIcon={<CheckIcon />}
              disabled={unreadCount === 0}
              sx={{ borderRadius: 1.5 }}
            >
              סמן הכל כנקרא
            </Button>
            <Button
              component={Link}
              to="/add-reminders"
              onClick={handleClose}
              fullWidth
              variant="contained"
              startIcon={<AddAlertIcon />}
              sx={{ borderRadius: 1.5 }}
            >
              הוסף תזכורת
            </Button>
          </Box>

          <Button
            component={Link}
            to="/reminders"
            onClick={handleClose}
            fullWidth
            variant="text"
            color="primary"
            startIcon={<FormatListBulletedIcon />}
            sx={{ borderRadius: 1.5 }}
          >
            לצפייה בכל ההתראות
          </Button>
        </Box>
      </Menu>

      {/* דיאלוג תזכורת */}
      <ReminderDialog reminder={dialogReminder} onClose={() => setDialogReminder(null)} />
    </>
  )
}

// // gemini 
// import type React from "react";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useReminderService } from "../utils/useReminderService";
// import type { Reminder } from "../types/reminderType";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import CheckIcon from "@mui/icons-material/Check";
// import MarkunreadIcon from "@mui/icons-material/Markunread";
// import ReminderDialog from "./ReminderDialog";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import AddAlertIcon from "@mui/icons-material/AddAlert";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import { Typography } from "@mui/material";
// import Tooltip from "@mui/material/Tooltip";
// import Fade from "@mui/material/Fade";
// import Chip from "@mui/material/Chip";
// import Box from "@mui/material/Box";
// import { StyledIconButton, StyledBadge, StyledMenu, MenuHeader, MenuTitle, EmptyReminders, ReminderItem, 
// StyledAvatar, ReminderContent, ReminderTitle, ReminderTime, ReadIconButton, MenuActions, ActionButtons, 
// StyledButton} from "../styles/RemindersMenuStyle";

// export default function RemindersMenu() {
//   const { fetchReminders, markAsDone } = useReminderService();
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [dialogReminder, setDialogReminder] = useState<Reminder | null>(null);
//   const open = Boolean(anchorEl);

//   const fetch = async () => {
//     const data = await fetchReminders();
//     const sorted = data.sort((a, b) => {
//       if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
//       return new Date(b.time ?? 0).getTime() - new Date(a.time ?? 0).getTime();
//     });
//     setReminders(sorted);
//   };

//   useEffect(() => {
//     fetch();
//     const interval = setInterval(fetch, 30000);
//     const onUpdate = () => fetch();
//     window.addEventListener("reminders-updated", onUpdate);
//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("reminders-updated", onUpdate);
//     };
//   }, []);

//   const unreadCount = reminders.filter((r) => !r.isRead).length;

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMarkAllAsRead = async () => {
//     const unread = reminders.filter((r) => !r.isRead);
//     await Promise.all(unread.map((r) => markAsDone(r.id)));
//     fetch();
//   };

//   const handleMarkOneAsRead = async (id: number) => {
//     await markAsDone(id);
//     fetch();
//   };

//   const handleOpenDialog = (reminder: Reminder) => {
//     setDialogReminder(reminder);
//   };

//   return (
//     <>
//       <Tooltip title="התראות" arrow>
//         <StyledIconButton onClick={handleClick} open={open}>
//           <StyledBadge badgeContent={unreadCount} color="error" overlap="circular">
//             <NotificationsIcon />
//           </StyledBadge>
//         </StyledIconButton>
//       </Tooltip>

//       <StyledMenu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Fade}
//         PaperProps={{
//           elevation: 5,
//           sx: { mt: 1.5, borderRadius: 2, minWidth: 320, overflow: "hidden", "& .MuiList-root": { padding: 0 } },
//         }}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <MenuHeader>
//           <MenuTitle variant="subtitle1" fontWeight="bold">
//             התראות
//           </MenuTitle>
//           {unreadCount > 0 && (
//             <Chip label={`${unreadCount} חדשות`} size="small" color="error" sx={{ fontWeight: "bold" }} />
//           )}
//         </MenuHeader>

//         <Box sx={{ maxHeight: 350, overflow: "auto" }}>
//           {reminders.length === 0 && (
//             <EmptyReminders>
//               <NotificationsIcon sx={{ fontSize: 40, opacity: 0.5 }} />
//               <Typography align="center">אין תזכורות להצגה</Typography>
//             </EmptyReminders>
//           )}

//           {reminders.slice(0, 5).map((reminder) => (
//             <ReminderItem key={reminder.id} isRead={reminder.isRead}>
//               <StyledAvatar isRead={reminder.isRead}>
//                 <NotificationsIcon fontSize="small" />
//               </StyledAvatar>
//               <ReminderContent onClick={() => handleOpenDialog(reminder)}>
//                 <ReminderTitle isRead={reminder.isRead}>{reminder.title}</ReminderTitle>
//                 <ReminderTime>
//                   <AccessTimeIcon sx={{ fontSize: "0.875rem" }} />
//                   <Typography variant="caption">
//                     {reminder.time ? new Date(reminder.time).toLocaleString() : "ללא תאריך"}
//                   </Typography>
//                 </ReminderTime>
//               </ReminderContent>
//               {!reminder.isRead ? (
//                 <Tooltip title="סמן כנקרא" arrow>
//                   <ReadIconButton size="small" onClick={() => handleMarkOneAsRead(reminder.id)}>
//                     <MarkunreadIcon fontSize="small" />
//                   </ReadIconButton>
//                 </Tooltip>
//               ) : (
//                 <CheckIcon fontSize="small" color="disabled" sx={{ mt: 0.5 }} />
//               )}
//             </ReminderItem>
//           ))}
//         </Box>

//         {/* <MenuActions>
//           <ActionButtons>
//             <StyledButton 
//               onClick={handleMarkAllAsRead}
//               fullWidth
//               variant="outlined"
//               startIcon={<CheckIcon />}
//               disabled={unreadCount === 0}
//             >
//               סמן הכל כנקרא
//             </StyledButton>
//             <StyledButton 
//               as={Link}
//               to="/add-reminders"
//               onClick={handleClose}
//               fullWidth
//               variant="contained"
//               startIcon={<AddAlertIcon />}
//             >
//               הוסף תזכורת
//             </StyledButton>
//           </ActionButtons>

//           <StyledButton 
//             as={Link}
//             to="/reminders"
//             onClick={handleClose}
//             fullWidth
//             variant="text"
//             color="primary"
//             startIcon={<FormatListBulletedIcon />}
//           >
//             לצפייה בכל ההתראות
//           </StyledButton>
//         </MenuActions> */}
//         <MenuActions>
//         <ActionButtons>
//           <StyledButton
//             onClick={handleMarkAllAsRead}
//             fullWidth
//             variant="outlined"
//             startIcon={<CheckIcon />}
//             disabled={unreadCount === 0}
//             sx={{ borderRadius: 1.5 }} // הוספנו sx
//           >
//             סמן הכל כנקרא
//           </StyledButton>
//           <StyledButton
//             as={Link}
//             to="/add-reminders"
//             onClick={handleClose}
//             fullWidth
//             variant="text"
//             startIcon={<AddAlertIcon />}
//             sx={{ borderRadius: 1.5, color: "#1976d2", "&:hover": { textDecoration: "underline" } }} // הוספנו sx
//           >
//             הוסף תזכורת
//           </StyledButton>
//         </ActionButtons>

//         <StyledButton
//           as={Link}
//           to="/reminders"
//           onClick={handleClose}
//           fullWidth
//           variant="text"
//           color="primary"
//           startIcon={<FormatListBulletedIcon />}
//           sx={{ borderRadius: 1.5, color: "#1976d2", "&:hover": { textDecoration: "underline" } }} // הוספנו sx
//         >
//           לצפייה בכל ההתראות
//         </StyledButton>
//       </MenuActions>
//       </StyledMenu>

//       <ReminderDialog reminder={dialogReminder} onClose={() => setDialogReminder(null)} />
//     </>
//   );
// }

// gpt
// import type React from "react";
// import { MenuItem, Typography, Button, Badge, Tooltip,} from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useReminderService } from "../utils/useReminderService";
// import type { Reminder } from "../types/reminderType";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import CheckIcon from "@mui/icons-material/Check";
// import MarkunreadIcon from "@mui/icons-material/Markunread";
// import ReminderDialog from "./ReminderDialog";
// import AddAlertIcon from "@mui/icons-material/AddAlert";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import {
//   NotificationIconButton,
//   StyledMenu,
//   MenuHeader,
//   MenuFooter,
//   MenuListBox,
//   ReminderItem,
//   IconLabelWrapper,
//   ReminderTime,
//   MarkAllButton,
// } from "../styles/RemindersMenuStyle";

// export default function RemindersMenu() {
//   const { fetchReminders, markAsDone } = useReminderService();
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [dialogReminder, setDialogReminder] = useState<Reminder | null>(null);
//   const open = Boolean(anchorEl);

//   const fetch = async () => {
//     const data = await fetchReminders();
//     const sorted = data.sort((a, b) => {
//       if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
//       return new Date(b.time ?? 0).getTime() - new Date(a.time ?? 0).getTime();
//     });
//     setReminders(sorted);
//   };

//   useEffect(() => {
//     fetch();
//     const interval = setInterval(fetch, 30000);
//     const onUpdate = () => fetch();
//     window.addEventListener("reminders-updated", onUpdate);
//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("reminders-updated", onUpdate);
//     };
//   }, []);

//   const unreadCount = reminders.filter((r) => !r.isRead).length;

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMarkAllAsRead = async () => {
//     const unread = reminders.filter((r) => !r.isRead);
//     await Promise.all(unread.map((r) => markAsDone(r.id)));
//     fetch();
//   };

//   const handleMarkOneAsRead = async (id: number) => {
//     await markAsDone(id);
//     fetch();
//   };

//   const handleOpenDialog = (reminder: Reminder) => {
//     setDialogReminder(reminder);
//   };

//   return (
//     <>
//       <Tooltip title="התראות" arrow>
//         <NotificationIconButton onClick={handleClick} open={open}>
//           <Badge
//             badgeContent={unreadCount}
//             color="error"
//             overlap="circular"
//             sx={{
//               "& .MuiBadge-badge": {
//                 fontSize: "10px",
//                 height: "18px",
//                 minWidth: "18px",
//                 padding: "0 4px",
//                 fontWeight: "bold",
//               },
//             }}
//           >
//             <NotificationsIcon />
//           </Badge>
//         </NotificationIconButton>
//       </Tooltip>

//       <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
//         <MenuHeader>
//           <Typography variant="subtitle1">תזכורות</Typography>
//           <MarkAllButton onClick={handleMarkAllAsRead}>סמן הכל כנקרא</MarkAllButton>
//         </MenuHeader>

//         <MenuListBox>
//           {reminders.map((reminder) => (
//             <MenuItem key={reminder.id} onClick={() => handleOpenDialog(reminder)}>
//               <ReminderItem isRead={reminder.isRead}>
//                 <IconLabelWrapper>
//                   {reminder.isRead ? <CheckIcon color="disabled" /> : <MarkunreadIcon color="primary" />}
//                   <Typography variant="body2" sx={{ ml: 1 }}>
//                     {reminder.title}
//                   </Typography>
//                 </IconLabelWrapper>
//                 {reminder.time && <ReminderTime>{new Date(reminder.time).toLocaleString()}</ReminderTime>}
//               </ReminderItem>
//             </MenuItem>
//           ))}
//         </MenuListBox>

//         <MenuFooter>
//           <Button component={Link} to="/reminders" startIcon={<FormatListBulletedIcon />}>
//             כל התזכורות
//           </Button>
//           <Button component={Link} to="/add-reminder" startIcon={<AddAlertIcon />}>
//             הוספת תזכורת
//           </Button>
//         </MenuFooter>
//       </StyledMenu>

//       {dialogReminder && (
//         <ReminderDialog reminder={dialogReminder} onClose={() => setDialogReminder(null)} />
//       )}
//     </>
//   );
// }
