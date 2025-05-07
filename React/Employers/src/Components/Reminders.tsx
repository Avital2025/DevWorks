import { useEffect, useState } from "react";
import { useReminderService } from "../utils/useReminderService";
import { Reminder } from "../types/reminderType";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
  Pagination
} from "@mui/material";
import ReminderDialog from "./ReminderDialog";

const PAGE_SIZE = 6;

export default function RemindersPage() {
  const { fetchReminders, markAsDone } = useReminderService();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchReminders()
      .then((data) => {
        const sorted = data.sort((a, b) => {
          if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
          return new Date(b.time ?? 0).getTime() - new Date(a.time ?? 0).getTime();
        });
        setReminders(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDone = async (id: number) => {
    await markAsDone(id);
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isRead: true } : r))
    );
    window.dispatchEvent(new Event("reminders-updated"));
  };

  const openDetails = (reminder: Reminder) => setSelectedReminder(reminder);
  const closeDetails = () => setSelectedReminder(null);

  const totalPages = Math.ceil(reminders.length / PAGE_SIZE);
  const pagedReminders = reminders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            תזכורות פעילות
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {reminders.length === 0 ? (
              <Typography align="center">אין תזכורות להצגה</Typography>
            ) : (
              pagedReminders.map((reminder) => (
                <Box
                  key={reminder.id}
                  p={2}
                  border="1px solid #ccc"
                  borderRadius={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgcolor={reminder.isRead ? "inherit" : "#f0f0f0"}
                  onClick={() => openDetails(reminder)}
                  sx={{ cursor: "pointer" }}
                >
                  <Box>
                    <Typography fontWeight="bold">{reminder.title}</Typography>
                    {reminder.content && (
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {reminder.content}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      {reminder.triggerType ?? "סוג לא ידוע"} |{" "}
                      {reminder.time
                        ? new Date(reminder.time).toLocaleString()
                        : "ללא תאריך"}
                    </Typography>
                  </Box>
                  {!reminder.isRead && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDone(reminder.id);
                      }}
                    >
                      סמן כבוצע
                    </Button>
                  )}
                </Box>
              ))
            )}
          </Box>

          {/* פאגינציה */}
          {reminders.length > PAGE_SIZE && (
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </CardContent>
      </Card>

      <ReminderDialog reminder={selectedReminder} onClose={closeDetails} />
    </Container>
  );
}
