import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Paper, Box, Fade, Divider, } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { Reminder } from "../../types/reminderType"

export default function ReminderDialog({
    reminder,
    onClose,
}: {
    reminder: Reminder | null
    onClose: () => void
}) {
    return (
        <Dialog
            open={!!reminder}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            TransitionComponent={Fade}
            transitionDuration={300}
            PaperProps={{
                elevation: 5,
                sx: {
                    borderRadius: 2,
                    overflow: "hidden",
                },
            }}
        >
            <DialogTitle
                sx={{
                    bgcolor: "primary.light",
                    color: "primary.contrastText",
                    py: 2,
                    fontWeight: "bold",
                    direction: "rtl",
                }}
            >
                {reminder?.triggerType === "time" ? "תזכורת" : ""} {/* אם "time", תזכורת */}
            </DialogTitle>
            <DialogContent sx={{ p: 3, direction: "rtl" }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "text.primary",
                        mb: 2,
                    }}
                >
                    {reminder?.title}
                </Typography>

                {reminder?.content && (
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            mb: 3,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                        }}
                    >
                        <Typography>{reminder.content}</Typography>
                    </Paper>
                )}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "text.secondary",
                        mt: 2,
                    }}
                >
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2">
                        {reminder?.time ? new Date(reminder.time).toLocaleString() : "ללא תאריך"}
                    </Typography>
                </Box>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2, justifyContent: "flex-start" }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: 2,
                        px: 3,
                    }}
                >
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    )
}


