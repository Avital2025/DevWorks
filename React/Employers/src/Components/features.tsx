import { Box, Grid, Typography, Paper, Container, useTheme, alpha } from "@mui/material"
import { FileText, Bell, Upload } from 'lucide-react'
import { motion } from "framer-motion"

const features = [
  {
    name: "Easy Job Posting",
    description: "Upload job descriptions and let our AI analyze and publish them efficiently, saving you time and effort.",
    icon: Upload,
    color: "#607d8b"
  },
  {
    name: "Job Listings Management",
    description: "View and manage all your posted job listings in one convenient dashboard with powerful filtering options.",
    icon: FileText,
    color: "#455a64"
  },
  {
    name: "Smart Reminders",
    description: "Set and receive timely reminders for interviews, follow-ups, and deadlines to stay on top of your hiring process.",
    icon: Bell,
    color: "#78909c"
  },
]

export default function Features() {
  const theme = useTheme()

  return (
    <Box 
      id="features" 
      sx={{
        py: { xs: 10, md: 14 },
        background: `linear-gradient(180deg, #ffffff 0%, ${alpha('#607d8b', 0.05)} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '40%',
          height: '60%',
          background: `radial-gradient(circle, ${alpha('#607d8b', 0.03)} 0%, ${alpha('#607d8b', 0)} 70%)`,
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Box textAlign="center" mb={8}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: '#607d8b', 
                fontWeight: 600,
                letterSpacing: 2,
                mb: 1,
                display: 'block'
              }}
            >
              FEATURES
            </Typography>
            <Typography 
              variant="h3" 
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                color: 'text.primary',
                mb: 2,
                letterSpacing: '-0.02em'
              }}
            >
              A better way to manage job postings
            </Typography>
            <Typography 
              variant="h6" 
              sx={{
                color: alpha(theme.palette.text.secondary, 0.9),
                fontWeight: 400,
                maxWidth: '42rem',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              DevWork provides employers with powerful tools to streamline the hiring process from start to finish.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${alpha('#607d8b', 0.1)}`,
                    background: 'white',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      transform: 'translateY(-5px)',
                      borderColor: alpha('#607d8b', 0.2)
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      mb: 3,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${feature.color} 0%, ${alpha(feature.color, 0.7)} 100%)`,
                      boxShadow: `0 8px 20px ${alpha(feature.color, 0.25)}`,
                    }}
                  >
                    <feature.icon size={28} color="white" />
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      color: 'text.primary'
                    }}
                  >
                    {feature.name}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: alpha(theme.palette.text.secondary, 0.9),
                      lineHeight: 1.7,
                      flex: 1
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

