import {
  Box, Typography, Paper, List, ListItem, IconButton, Tooltip, Chip, Card, Pagination,
} from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff"
import InfoIcon from "@mui/icons-material/Info"
import { ReactNode } from "react"
import { Reminder } from "../../types/reminderType"

type Props = {
  reminders: Reminder[]
  pagedReminders: Reminder[]
  page: number
  totalPages: number
  onDone: (id: number) => void
  onPageChange: (_: React.ChangeEvent<unknown>, value: number) => void
  onOpenDetails: (reminder: Reminder) => void
  children?: ReactNode
}

export default function ReminderList({
  reminders,
  pagedReminders,
  page,
  totalPages,
  onDone,
  onPageChange,
  onOpenDetails,
  children,
}: Props) {
  return (
    <Box maxWidth="sm" mx="auto" py={2}>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden", direction: "rtl" }}>
        <Box
          sx={{
            bgcolor: "primary.light",
            color: "primary.contrastText",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <NotificationsActiveIcon />
            <Typography variant="h6" fontWeight="bold">
              Recent reminders
            </Typography>
          </Box>
          {reminders.length > 0 && (
            <Chip
              label={`${reminders.length} תזכורות`}
              size="small"
              color="default"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
            />
          )}
        </Box>

        <Box sx={{ p: 2 }}>
          {reminders.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <NotificationsOffIcon sx={{ fontSize: 40, color: "text.disabled" }} />
              <Typography variant="body1" color="text.secondary">
                No reminders to display.
              </Typography>
            </Box>
          ) : (
            <List sx={{ display: "flex", flexDirection: "column", gap: 2, p: 0 }}>
              {pagedReminders.map((reminder) => (
                <Card
                  key={reminder.id}
                  variant="outlined"
                  sx={{
                    borderRadius: 1.5,
                    borderColor: reminder.isRead ? "divider" : "primary.light",
                    bgcolor: reminder.isRead ? "background.paper" : "rgba(25, 118, 210, 0.04)",
                    transition: "all 0.2s",
                    "&:hover": {
                      boxShadow: 1,
                      borderColor: reminder.isRead ? "grey.400" : "primary.main",
                    },
                  }}
                >
                  <ListItem sx={{ py: 1.5, px: 2 }}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                        <Typography
                          fontWeight={reminder.isRead ? "normal" : "bold"}
                          variant="body1"
                          sx={{ maxWidth: "70%" }}
                        >
                          {reminder.title}
                        </Typography>
                        <Chip
                          size="small"
                          icon={reminder.isRead ? <CheckCircleIcon /> : <NotificationsActiveIcon />}
                          label={reminder.isRead ? "בוצע" : "פעיל"}
                          color={reminder.isRead ? "default" : "primary"}
                          sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                        />
                      </Box>

                      {reminder.content && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {reminder.content}
                        </Typography>
                      )}

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
                          <AccessTimeIcon fontSize="small" sx={{ fontSize: "0.9rem" }} />
                          <Typography variant="caption">
                            {reminder.time ? new Date(reminder.time).toLocaleString() : "ללא תאריך"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="פרטים">
                            <IconButton
                              size="small"
                              onClick={() => onOpenDetails(reminder)}
                              sx={{ color: "primary.main" }}
                            >
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          {!reminder.isRead && (
                            <Tooltip title="סמן כבוצע">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDone(reminder.id)
                                }}
                              >
                                <CheckCircleIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                </Card>
              ))}
            </List>
          )}

          {reminders.length > 8 && (
            <Box py={2} display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={onPageChange}
                color="primary"
                size="small"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: 1,
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Paper>
      {children}
    </Box>
  )
}
