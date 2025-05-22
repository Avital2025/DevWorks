import { Box, Container, Grid } from "@mui/material"
import { motion } from "framer-motion"
import image from "../assets/Hiring-employees.jpg"
import { sectionStyle, backgroundStyle, containerStyle, titleBoxStyle, overlineStyle, headingStyle,
  descriptionStyle, featureBoxStyle, iconStyle, featureTitleStyle, featureDescriptionStyle,  imageWrapperStyle, imageStyle,
  quoteBoxStyle, quoteTextStyle, avatarStyle, userInfoBoxStyle} from "../styles/AboutStyle";
import { CheckCircle } from 'lucide-react'
import { Typography, Stack } from "@mui/material"

export default function About() {
  return (
    <Box id="about" sx={sectionStyle}>
      <Box sx={backgroundStyle} />
      <Container maxWidth="lg" sx={containerStyle}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <Box sx={titleBoxStyle}>
                <Typography variant="overline" sx={overlineStyle}>
                  ABOUT DEVWORK
                </Typography>
                <Typography variant="h3" sx={headingStyle}>
                  Connecting employers with talent
                </Typography>
                <Typography variant="body1" sx={descriptionStyle}>
                  DevWork was created to simplify the job posting process for employers while making it easier for job seekers to find relevant opportunities. Our AI-powered platform streamlines every step of the hiring journey.
                </Typography>
              </Box>

              <Stack spacing={4} mt={5}>
                {[
                  {
                    title: "For Employers",
                    description: "Post jobs easily, manage listings, and set reminders all in one platform with powerful AI assistance."
                  },
                  {
                    title: "For Job Seekers",
                    description: "Find relevant job opportunities that match your skills and connect directly with employers through our platform."
                  }
                ].map((item, index) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}>
                    <Box sx={featureBoxStyle}>
                      <CheckCircle color="#607d8b" size={24} style={iconStyle} />
                      <Box>
                        <Typography variant="h6" sx={featureTitleStyle}>
                          {item.title}
                        </Typography>
                        <Typography variant="body1" sx={featureDescriptionStyle}>
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Stack>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }}>
 
              </motion.div>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <Box sx={imageWrapperStyle}>
                <Box component="img" src={image} alt="DevWork platform screenshot" sx={imageStyle} />
              </Box>

              <Box sx={quoteBoxStyle}>
                <Typography variant="body1" sx={quoteTextStyle}>
                  "DevWork has transformed our hiring process. The AI analysis of job descriptions has improved the quality of applicants significantly."
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={avatarStyle}>JS</Box>
                  <Box sx={userInfoBoxStyle}>
                    <Typography variant="subtitle2" fontWeight={700}>
                      Jessica Smith
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      HR Director, TechCorp
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
