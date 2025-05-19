import { Box, Button, TextField, Typography, Container, Card, CardContent } from "@mui/material";
import { useRef, useState } from "react";
import { useRestService } from "../utils/useRestService";


export default function AuthPage() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const fullName = useRef<HTMLInputElement>(null);
  const [click, setClick] = useState<'Login' | 'Register'>('Login');
  const { handleAuth } = useRestService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleAuth(
        click,
        email.current?.value,
        password.current?.value,
        fullName.current?.value
      );
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {click === "Login" ? "Sign In" : "Sign Up"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            {click === "Register" && 
              <TextField inputRef={fullName} label="Full Name" variant="outlined" required fullWidth />
            }
            <TextField inputRef={email} label="Email" variant="outlined" type="email" required fullWidth />
            <TextField inputRef={password} label="Password" variant="outlined" type="password" required fullWidth />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {click === "Login" ? "Login" : "Register"}
            </Button>
            <Button onClick={() => setClick(click === "Login" ? "Register" : "Login")} color="secondary">
              {click === "Login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

