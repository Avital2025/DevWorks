import  { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export default function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleSend = async () => {
  //   if (!userInput.trim()) return;
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const res = await axios.post("/chat", userInput, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setResponse(res.data);
  //   } catch (err: any) {
  //     setError("שגיאה בשליחת הבקשה ל-AI.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSend = async () => {
    console.log("handleSend called"); // בדיקה שהפונקציה הופעלה
  
    if (!userInput.trim()) {
      console.log("Empty input - aborting");
      return;
    }
  
    setLoading(true);
    setError("");
    try {
      console.log("Sending request to /chat with:", userInput);
      const res = await axios.post("/chat", JSON.stringify(userInput), {
        headers: { "Content-Type": "application/json" }
      });
      
      
      console.log("Response from server:", res.data);
      setResponse(res.data);
    } catch (err: any) {
      console.error("Error sending request:", err);
      setError("שגיאה בשליחת הבקשה ל-AI.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        שאל את עוזר ה-AI של DevWork
      </Typography>
      <TextField
        label="הקלד שאלה"
        multiline
        rows={4}
        fullWidth
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          disabled={loading}
        >
          שלח
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {response && (
        <Box mt={2}>
          <Typography variant="subtitle1">תשובת ה-AI:</Typography>
          <Typography>{response}</Typography>
        </Box>
      )}
    </Paper>
  );
}
