import { useReminderService } from "../utils/useReminderService";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddReminderPage() {
  const { createReminder } = useReminderService();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reminder = {
        title,
        content,
        time: dateTime ? new Date(dateTime).toISOString() : new Date().toISOString(),
      };
      await createReminder(reminder);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your reminder has been saved",
        showConfirmButton: false,
        timer: 1500
      });

    }
    catch (error) {
      console.error("Failed to create reminder:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the reminder"
      }
      )};
    setTitle("");
    setContent("");
    setDateTime("");
  };
      return (
        <Container maxWidth="sm">
          <Typography variant="h5" gutterBottom textAlign="center" mt={4}>
            Add a New Reminder
          </Typography>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Content (optional)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={3}
            />
            <TextField
              label="Reminder Date & Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Add Reminder
            </Button>
          </Box>
        </Container>
      );
    }
