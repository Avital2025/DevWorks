import { Box, Typography } from "@mui/material"
import EventNoteIcon from "@mui/icons-material/EventNote"
import { StaticDatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { he } from "date-fns/locale"
import { motion } from "framer-motion"

interface Props {
  selectedDate: Date | null
  onDateChange: (date: Date | null) => void
}

export default function ReminderCalendar({ selectedDate, onDateChange }: Props) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <EventNoteIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">Select Date</Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
        <Box sx={{ bgcolor: "background.paper", borderRadius: 3, p: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <StaticDatePicker
            value={selectedDate}
            onChange={onDateChange}
            shouldDisableDate={(date) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const checkDate = new Date(date)
              checkDate.setHours(0, 0, 0, 0)
              return checkDate < today
            }}
            displayStaticWrapperAs="desktop"
          />
        </Box>
      </LocalizationProvider>
    </motion.div>
  )
}
