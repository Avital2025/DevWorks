import { Box, Button, Grid, Card, CardContent, Typography } from "@mui/material"
import EventNoteIcon from "@mui/icons-material/EventNote"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SaveIcon from "@mui/icons-material/Save"

interface Props {
  title: string
  selectedDate: Date | null
  selectedTime: Date | null
  onCancel: () => void
  onSave: () => void
}

const formatDate = (date: Date | null) =>
  date?.toLocaleDateString("he-IL", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) || ""

const formatTime = (date: Date | null) =>
  date?.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }) || ""

export default function ReminderSummary({ title, selectedDate, selectedTime, onCancel, onSave }: Props) {
  return (
    <Box sx={{ p: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}`, bgcolor: (theme) => theme.palette.primary.light + "11" }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={7}>
          <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: "background.paper" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Reminder Summary
              </Typography>
              <Typography variant="h6" fontWeight="medium" gutterBottom noWrap>
                {title || "No title specified"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <EventNoteIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(selectedDate) || "No date selected"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {formatTime(selectedTime) || "No time selected"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" color="inherit" fullWidth onClick={onCancel} sx={{ py: 1.5, borderRadius: 2, textTransform: "none" }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" fullWidth onClick={onSave} startIcon={<SaveIcon />} sx={{ py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: "bold" }}>
              Save Reminder
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
