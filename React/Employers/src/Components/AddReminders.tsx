import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box, Container, Paper, Grid, useTheme, useMediaQuery, alpha
} from "@mui/material"
import Swal from "sweetalert2"
import { motion } from "framer-motion"
import { useReminderService } from "../utils/useReminderService"
import ReminderCalendar from "./AddRemindersPages/ReminderCalender"
import ReminderHeader from "./AddRemindersPages/ReminderHeader"
import ReminderSummary from "./AddRemindersPages/ReminderSummary"
import ReminderForm from "./AddRemindersPages/ReminserForm"


export default function AddReminderCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date())
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()
  const { createReminder } = useReminderService()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleSave = async () => {
    if (!title || !selectedDate || !selectedTime) {
      Swal.fire("Missing Data", "Please enter all fields", "warning")
      return
    }

    const combinedDate = new Date(selectedDate!)
    combinedDate.setHours(selectedTime!.getHours(), selectedTime!.getMinutes())

    Swal.fire({ title: "Saving...", allowOutsideClick: false, didOpen: () => Swal.showLoading() })

    try {
      await createReminder({ title, content, time: combinedDate })
      Swal.fire({ position: "top-end", icon: "success", title: "Reminder saved", showConfirmButton: false, timer: 3000 })
      setTitle("")
      setContent("")
      setSelectedDate(new Date())
      setSelectedTime(new Date())
      navigate("/add-reminders")
    } catch (error) {
      Swal.fire("Error", "Failed to save reminder", "error")
    }
  }

  return (
    <Box sx={{ minHeight: "100vh",mt: 10, py: 4, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", position: "relative", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", top: "5%", right: "5%", width: 200, height: 200, borderRadius: "50%", background: alpha(theme.palette.primary.main, 0.1), zIndex: 0 }} />
      <Box sx={{ position: "absolute", bottom: "10%", left: "5%", width: 150, height: 150, borderRadius: "50%", background: alpha(theme.palette.secondary.main, 0.1), zIndex: 0 }} />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ReminderHeader />
          <Paper elevation={6} sx={{ borderRadius: 4, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
            <Grid container>
              <Grid item xs={12} md={5} sx={{ p: 4, bgcolor: "background.paper", borderRight: isMobile ? "none" : `1px solid ${theme.palette.divider}` }}>
                <ReminderForm
                  title={title}
                  content={content}
                  selectedTime={selectedTime}
                  onTitleChange={setTitle}
                  onContentChange={setContent}
                  onTimeChange={setSelectedTime}
                  isMobile={isMobile}
                />
              </Grid>
              <Grid item xs={12} md={7} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 3 }}>
                <ReminderCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
              </Grid>
            </Grid>
            <ReminderSummary
              title={title}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onCancel={() => navigate(-1)}
              onSave={handleSave}
            />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}
