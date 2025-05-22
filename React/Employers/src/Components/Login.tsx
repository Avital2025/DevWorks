import type React from "react"
import { useRef, useState } from "react"
import { Container, TextField, Typography, Button, Divider, Box} from "@mui/material"
import { useRestService } from "../utils/useRestService"
import { AuthWrapper, AuthPaper, InfoSection, InfoContent, InfoCircles, FormSection, FormContent,} from "../styles/AuthPage.styles"

export default function AuthPage({ onClose }: { onClose?: () => void }) {
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const fullName = useRef<HTMLInputElement>(null)
  const [click, setClick] = useState<"Login" | "Register">("Login")
  const { handleAuth } = useRestService()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await handleAuth(click, email.current?.value, password.current?.value, fullName.current?.value)
      onClose?.()
    } catch (error) {
      console.error("Authentication failed:", error)
    }
  }
  return (
    <AuthWrapper>
      <Container maxWidth="lg">
        <AuthPaper>
          <InfoSection>
            <InfoContent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {click === "Login" ? "Welcome Back!" : "Join Our Community"}
              </Typography>

              <Typography variant="body1" sx={{ mb: 4, maxWidth: "80%" }}>
                {click === "Login"
                  ? "We're excited to see you again. Log in to access your account and continue your journey with us."
                  : "Create an account to get started with our services and unlock all the features we offer."}
              </Typography>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Why choose us?
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Secure and reliable platform
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Easy-to-use interface
                  </Typography>
                  <Typography component="li" variant="body1">
                    24/7 customer support
                  </Typography>
                </Box>
              </Box>
            </InfoContent>
            <InfoCircles />
          </InfoSection>

          <FormSection>
            <FormContent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h4" align="center" gutterBottom fontWeight="medium">
                {click === "Login" ? "Sign In" : "Create Account"}
              </Typography>

              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
                {click === "Login"
                  ? "Enter your credentials to access your account"
                  : "Fill in the form below to create your account"}
              </Typography>

              <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3} mt={2}>
                {click === "Register" && (
                  <TextField
                    inputRef={fullName}
                    label="Full Name"
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                )}

                <TextField
                  inputRef={email}
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{ sx: { borderRadius: 2 } }}
                />

                <TextField
                  inputRef={password}
                  label="Password"
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{ sx: { borderRadius: 2 } }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 2, py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: "bold", fontSize: "1rem" }}
                >
                  {click === "Login" ? "Login" : "Register"}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                <Button
                  onClick={() => setClick(click === "Login" ? "Register" : "Login")}
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  {click === "Login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </Button>
              </Box>
            </FormContent>
          </FormSection>
        </AuthPaper>
      </Container>
    </AuthWrapper>
  )
}
