import { Box, Typography, TextField, Divider } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import TitleIcon from "@mui/icons-material/Title"
import NotesIcon from "@mui/icons-material/Notes"
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { he } from "date-fns/locale"
import { motion } from "framer-motion"

interface Props {
  title: string
  content: string
  selectedTime: Date | null
  onTitleChange: (val: string) => void
  onContentChange: (val: string) => void
  onTimeChange: (val: Date | null) => void
  isMobile: boolean
}

export default function ReminderForm({ title, content, selectedTime, onTitleChange, onContentChange, onTimeChange, isMobile }: Props) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Reminder Details
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <TitleIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="medium">
            Title
          </Typography>
        </Box>
        <TextField
          fullWidth
          placeholder="Enter reminder title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          variant="outlined"
          InputProps={{ sx: { borderRadius: 2 } }}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <NotesIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="medium">
            Description
          </Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Enter reminder details (optional)"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          variant="outlined"
          InputProps={{ sx: { borderRadius: 2 } }}
        />
      </Box>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="medium">
              Time
            </Typography>
          </Box>
          <TimePicker
            value={selectedTime}
            onChange={onTimeChange}
            sx={{ width: "100%" }}
            slotProps={{
              textField: {
                variant: "outlined",
                InputProps: { sx: { borderRadius: 2 } },
              },
            }}
          />
        </Box>
      </LocalizationProvider>

      {isMobile && (
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Select Date Below
          </Typography>
        </Divider>
      )}
    </motion.div>
  )
}
