import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
} from "@mui/material";
import { Reminder } from "../types/reminderType";

export default function ReminderDialog({
    reminder,
    onClose,
}: {
    reminder: Reminder | null;
    onClose: () => void;
}) {
    return (
        <Dialog open={!!reminder} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {reminder?.triggerType === "time" ? "תזכורת" : ""} {/* אם "time", תזכורת */}
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    {reminder?.title}
                </Typography>

                {reminder?.content && (
                    <Typography sx={{ mt: 2 }}>{reminder.content}</Typography>
                )}

                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {reminder?.time
                        ? new Date(reminder.time).toLocaleString()
                        : "ללא תאריך"}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>סגור</Button>
            </DialogActions>
        </Dialog>
    );
}
