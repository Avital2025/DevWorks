"use client"

import {
  Box, Container, Typography, Grid, Link, IconButton,
  Divider, useTheme, alpha, Paper
} from "@mui/material"
import {
  Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon, Email as EmailIcon, Phone as PhoneIcon,
  LocationOn as LocationOnIcon, Favorite as FavoriteIcon
} from "@mui/icons-material"

export default function Footer() {
  const theme = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <Paper
      component="footer"
      elevation={3}
      sx={{
        mt: 5,
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(
          theme.palette.primary.main, 0.1,
        )})`,
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3} id="about">
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
                About
              </Typography>
              <Divider sx={{
                width: 60,
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
                mb: 2,
              }} />
            </Box>
            <Typography variant="body2" paragraph>
              We have been providing innovative and high-quality solutions to our clients since 2010. Our goal is to make technology accessible and easy to use.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
                Quick Links
              </Typography>
              <Divider sx={{
                width: 60,
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
                mb: 2,
              }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/HomePage" underline="hover" color="inherit">Home</Link>
              <Link href="#" underline="hover" color="inherit">Services</Link>
              <Link href="#about" underline="hover" color="inherit">About</Link>
              <Link href="#contact" underline="hover" color="inherit">Contact</Link>
              <Link href="#" underline="hover" color="inherit">Terms of Use</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} id="contact">
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
                Contact Us
              </Typography>
              <Divider sx={{
                width: 60,
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
                mb: 2,
              }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon fontSize="small" color="primary" />
                <Typography variant="body2">123 Herzl St, Tel Aviv</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon fontSize="small" color="primary" />
                <Typography variant="body2">03-1234567</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" color="primary" />
                <Typography variant="body2">info@example.co.il</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
                Follow Us
              </Typography>
              <Divider sx={{
                width: 60,
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
                mb: 2,
              }} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, idx) => (
                <IconButton key={idx} sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                }}>
                  <Icon />
                </IconButton>
              ))}
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2">Subscribe to our newsletter for updates</Typography>
              <Box component="form" sx={{ display: "flex", mt: 1 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    padding: "8px 12px",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRight: "none",
                    borderRadius: "4px 0 0 4px",
                    width: "100%",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    border: "none",
                    padding: "0 12px",
                    borderRadius: "0 4px 4px 0",
                    cursor: "pointer",
                  }}
                >
                  Subscribe
                </button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.15),
        py: 2,
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
      }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}>
            <Typography variant="body2" color="text.secondary" align="center">
              devWork {currentYear} © All rights reserved
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Built with <FavoriteIcon sx={{ fontSize: 14, color: "error.main", mx: 0.5, verticalAlign: "middle" }} /> in Israel
            </Typography>
          </Box>
        </Container>
      </Box>
    </Paper>
  )
}
