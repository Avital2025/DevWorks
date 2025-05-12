import type React from "react"
import { useEffect, useState } from "react"
import { useReminderService } from "../utils/useReminderService"
import type { Reminder } from "../types/reminderType"
import { Box, Typography, Container, CircularProgress, Pagination, Paper, List, ListItem, IconButton, 
  Tooltip, Chip, Card,} from "@mui/material"
import ReminderDialog from "./ReminderDialog"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff"
import InfoIcon from "@mui/icons-material/Info"

const PAGE_SIZE = 8 
export default function RemindersPage() {
  const { fetchReminders, markAsDone } = useReminderService()
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchReminders()
      .then((data) => {
        const sorted = data.sort((a, b) => {
          if (a.isRead !== b.isRead) return a.isRead ? 1 : -1
          return new Date(b.time ?? 0).getTime() - new Date(a.time ?? 0).getTime()
        })
        setReminders(sorted)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleDone = async (id: number) => {
    await markAsDone(id)
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, isRead: true } : r)))
    window.dispatchEvent(new Event("reminders-updated"))
  }

  const openDetails = (reminder: Reminder) => setSelectedReminder(reminder)
  const closeDetails = () => setSelectedReminder(null)

  const totalPages = Math.ceil(reminders.length / PAGE_SIZE)
  const pagedReminders = reminders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        <CircularProgress size={40} thickness={4} color="primary" />
        <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
          Loading reminders...
        </Typography>
      </Container>
    )
  }
  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          direction: "rtl",
        }}
      >
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
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <NotificationsOffIcon sx={{ fontSize: 40, color: "text.disabled" }} />
              <Typography variant="body1" color="text.secondary">
                No reminders to display.
              </Typography>
            </Box>
          ) : (
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 0,
              }}
            >
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
                  <ListItem
                    sx={{
                      py: 1.5,
                      px: 2,
                    }}
                  >
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
                              onClick={() => openDetails(reminder)}
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
                                  handleDone(reminder.id)
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

          {/* פאגינציה */}
          {reminders.length > PAGE_SIZE && (
            <Box py={2} display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
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

      <ReminderDialog reminder={selectedReminder} onClose={closeDetails} />
    </Container>
  )
}


// לחלק את העמוד?
