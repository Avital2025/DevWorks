import { IconButton, Typography, Box } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate } from "react-router-dom"

export default function ReminderHeader() {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, bgcolor: "background.paper", boxShadow: 1 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        Create New Reminder
      </Typography>
    </Box>
  )
}
