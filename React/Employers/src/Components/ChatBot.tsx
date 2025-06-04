import { useState, useRef, useEffect } from "react";
import { TextField, IconButton, Box, Typography, Paper, Button, } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setMessages([
        {
          role: "bot",
          content:
            "היי! אני העוזר החכם שלך 🤖\nאני כאן כדי לעזור לך עם שאלות על קבצים, ניתוחים או כל דבר אחר במערכת. במה תרצה להתחיל?",
        },
      ]);
    }
  }, [chatOpen]);

  const handleSend = async (input?: string) => {
    const messageToSend = input ?? userInput;
    if (!messageToSend.trim()) return;

    const newMessages: { role: "user" | "bot"; content: string }[] = [
      ...messages,
      { role: "user", content: messageToSend }
    ];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/files/chat`,
        { userInput: messageToSend },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessages([...newMessages, { role: "bot", content: res.data }]);
    } catch (err) {
      console.error("Error:", err);
      setError("שגיאה בשליחת הבקשה ל-AI.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {!chatOpen && (
        <Button
          variant="contained"
          startIcon={<ChatIcon />}
          onClick={() => setChatOpen(true)}
          sx={{
            position: "fixed",
            bottom: 50,
            left: 50,
            width: 170,
            zIndex: 1300,
            borderRadius: "50px",
            px: 2,
          }}
        >
          AI דבר עם
        </Button>
      )}

      {chatOpen && (
        <Paper
          elevation={5}
          sx={{
            position: "fixed",
            bottom: 60,
            left: 40,
            width: 320,
            maxHeight: 450,
            maxWidth: "95vw",
            height: 500,
            display: "flex",
            flexDirection: "column",
            zIndex: 1301,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#333",
              color: "#fff",
              px: 2,
              py: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            <Typography fontWeight="bold">🧠 עוזר AI</Typography>
            <IconButton size="small" onClick={() => setChatOpen(false)}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 2,
              py: 1,
              backgroundColor: "#f5f5f5",
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "75%",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor:
                      msg.role === "user" ? "#d1ecf1" : "#eeeeee",
                    whiteSpace: "pre-wrap",
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body2">
                    {msg.role === "user" ? "👩‍💻 " : "🤖 "}
                    {msg.content}
                  </Typography>
                </Box>
              </Box>
            ))}

            {messages.length === 1 && !loading && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  textAlign: "right",     
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                 :הצעות לדוגמה
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {[
                    "?DevWork מה זה ",
                    '?מי רואה את המשרות שאני מעלה',
                    "?איך אני מעלה קובץ",
                  ].map((suggestion) => (
                    <Paper
                      key={suggestion}
                      onClick={() => {
                        setUserInput(suggestion);
                        handleSend(suggestion);
                      }}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        backgroundColor: "#e0f7fa",
                        borderRadius: 3,
                        cursor: "pointer",
                        ":hover": { backgroundColor: "#b2ebf2" },
                      }}
                    >
                      <Typography variant="body2">{suggestion}</Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}


            {loading && (
              <Typography variant="body2" color="textSecondary">
                🤖 כותב תשובה...
              </Typography>
            )}
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ display: "flex", p: 1, borderTop: "1px solid #ccc" }}>
            <TextField
              placeholder="כתוב שאלה..."
              variant="outlined"
              size="small"
              fullWidth
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={() => handleSend()}
              disabled={loading || !userInput.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
