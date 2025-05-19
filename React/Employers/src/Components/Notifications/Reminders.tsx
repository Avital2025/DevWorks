import { useEffect, useState } from "react"
import { Container, CircularProgress, Typography } from "@mui/material"
import ReminderList from "./ReminderList"
import ReminderDialog from "./ReminderDialog"
import { Reminder } from "../../types/reminderType"
import { useReminderService } from "../../utils/useReminderService"

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
    <ReminderList
      reminders={reminders}
      pagedReminders={pagedReminders}
      page={page}
      totalPages={totalPages}
      onDone={handleDone}
      onPageChange={handlePageChange}
      onOpenDetails={setSelectedReminder}
    >
      <ReminderDialog reminder={selectedReminder} onClose={() => setSelectedReminder(null)} />
    </ReminderList>
  )
}
