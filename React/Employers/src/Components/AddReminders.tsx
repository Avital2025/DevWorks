"use client"
import reminder from "../assets/reminder.png";

import type React from "react"
import { useReminderService } from "../utils/useReminderService"
import { Box, Button, Container, TextField, Typography, Paper, InputAdornment, Fade } from "@mui/material"
import { useState } from "react"
import Swal from "sweetalert2"
import TitleIcon from "@mui/icons-material/Title"
import DescriptionIcon from "@mui/icons-material/Description"
import EventIcon from "@mui/icons-material/Event"
import AddAlertIcon from "@mui/icons-material/AddAlert"

export default function AddReminderPage() {
  const { createReminder } = useReminderService()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [dateTime, setDateTime] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const reminder = {
        title,
        content,
        time: dateTime ? new Date(dateTime).toISOString() : new Date().toISOString(),
      }
      await createReminder(reminder)

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your reminder has been saved",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.error("Failed to create reminder:", error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the reminder",
      })
    }
    setTitle("")
    setContent("")
    setDateTime("")
  }

  return (
<Box
  sx={{
    backgroundImage: `url(${reminder})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // לבן שקוף
    backgroundBlendMode: "overlay",
    minHeight: "100vh",
    py: 6,
  }}
>



    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Fade in={true} timeout={500}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.light",
              color: "primary.contrastText",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <AddAlertIcon />
            <Typography variant="h6" fontWeight="bold">
              Add a New Reminder
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
            <Box display="flex" flexDirection="column" gap={2.5}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon fontSize="small" color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                  },
                }}
              />

              <TextField
                label="Content (optional)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={3}
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon fontSize="small" color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                  },
                }}
              />

              <TextField
                label="Reminder Date & Time"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon fontSize="small" color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddAlertIcon />}
                sx={{
                  borderRadius: 1.5,
                  py: 1,
                  px: 3,
                  fontWeight: "medium",
                  boxShadow: 1,
                }}
              >
                Add Reminder
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Container>
  </Box>
  )
}


// להוציא עיצוב
