import { Box, Typography, Button, Stack, Container, useTheme, alpha } from "@mui/material"
import { ArrowRight } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { IsLogin } from "../App"
import { useContext } from "react"

export default function Hero() {
  const navigate = useNavigate()
  const theme = useTheme()
  const [isLogin] = useContext(IsLogin);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <Box 
      position="relative" 
      overflow="hidden" 
      sx={{
        background: `linear-gradient(180deg, ${alpha('#607d8b', 0.05)} 0%, rgba(255,255,255,1) 100%)`,
        pt: { xs: 12, md: 16 },
        pb: { xs: 10, md: 14 }
      }}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#607d8b', 0.1)} 0%, ${alpha('#607d8b', 0)} 70%)`,
          zIndex: 0
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#607d8b', 0.08)} 0%, ${alpha('#607d8b', 0)} 70%)`,
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Box 
            sx={{ 
              textAlign: 'center',
              maxWidth: 'md',
              mx: 'auto',
              px: { xs: 2, sm: 4 }
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                component="span" 
                variant="overline" 
                sx={{ 
                  color: '#607d8b',
                  fontWeight: 600,
                  letterSpacing: 2,
                  mb: 2,
                  display: 'block'
                }}
              >
                WELCOME TO DEVWORK
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography 
                variant="h2" 
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: '#263238',
                  mb: 3
                }}
              >
                Simplify your{" "}
                <Box 
                  component="span" 
                  sx={{ 
                    color: '#607d8b',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'linear-gradient(90deg, #607d8b 0%, rgba(96, 125, 139, 0.4) 100%)',
                      borderRadius: '2px'
                    }
                  }}
                >
                  hiring process
                </Box>
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: alpha(theme.palette.text.secondary, 0.9),
                  fontWeight: 400,
                  maxWidth: '42rem',
                  mx: 'auto',
                  mb: 5,
                  lineHeight: 1.6
                }}
              >
                Post job listings efficiently, let our AI analyze them, and connect with qualified candidates through our streamlined platform.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 2, sm: 3 }} 
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    if (isLogin) {
                      navigate('/addfiles');
                    } else {
                      navigate('/login');
                    }
                  }}
                  sx={{
                    bgcolor: '#607d8b',
                    px: 4,
                    py: 1.5,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 10px 20px rgba(96, 125, 139, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#4b636e',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 15px 25px rgba(96, 125, 139, 0.3)',
                    }
                  }}
                >
                  Get started
                  <ArrowRight style={{ marginLeft: 8, strokeWidth: 2.5 }} size={18} />
                </Button>

                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => navigate('/about')}
                  sx={{
                    color: '#607d8b',
                    borderColor: '#607d8b',
                    borderWidth: '2px',
                    px: 4,
                    py: 1.5,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#4b636e',
                      bgcolor: 'rgba(96, 125, 139, 0.05)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Learn more
                </Button>
              </Stack>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              style={{ marginTop: '2rem' }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                  mt: 6,
                  opacity: 0.7
                }}
              >
                {['Trusted by', 'Google', 'Microsoft', 'Amazon', 'Meta'].map((text, index) => (
                  <Typography 
                    key={index} 
                    sx={{ 
                      color: index === 0 ? 'text.secondary' : '#607d8b',
                      fontWeight: index === 0 ? 400 : 700,
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      display: { xs: index > 2 ? 'none' : 'block', md: 'block' }
                    }}
                  >
                    {text}
                  </Typography>
                ))}
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

