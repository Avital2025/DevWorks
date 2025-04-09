// import { Container, Typography, Card, CardContent } from "@mui/material";

// const About = () => {
//   return (
//     <Container maxWidth="md">
//       <Card sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
//         <CardContent>
//           <Typography variant="h4" color="primary" gutterBottom>
//             על האתר
//           </Typography>
//           <Typography variant="body1">
//             ברוכים הבאים לאתר המתכונים שלנו! כאן תמצאו מגוון רחב של מתכונים טעימים לכל ארוחה.
//             האתר מאפשר לכם לגלות מתכונים חדשים, לשתף את המתכונים האהובים עליכם, וליצור חוויית בישול קלה ומהנה.
//           </Typography>
//           <Typography variant="body1" sx={{ mt: 2 }}>
//             בין אם אתם בשלנים מתחילים או שפים מקצועיים, יש כאן משהו לכל אחד! 
//             נסו את המתכונים שלנו והפתיעו את המשפחה והחברים עם טעמים מדהימים.
//           </Typography>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default About;

import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import PeopleIcon from "@mui/icons-material/People"
import BoltIcon from "@mui/icons-material/Bolt"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

export default function Features() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f8f8f8" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
            }}
          >
            Why Choose DevWork?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: "1.125rem",
              lineHeight: 1.6,
            }}
          >
            Our platform streamlines the process of finding and managing developers for your software projects.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    p: 1,
                    borderRadius: 1,
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DescriptionIcon />
                </Box>
                <Typography variant="h5" component="h3" fontWeight={600}>
                  Easy File Management
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Upload, update, and manage your project files with our intuitive interface. Our platform makes it simple
                to organize your project documentation, requirements, and specifications in one place. You can easily
                share files with developers and track changes throughout the project lifecycle.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    p: 1,
                    borderRadius: 1,
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleIcon />
                </Box>
                <Typography variant="h5" component="h3" fontWeight={600}>
                  Skilled Developers
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Connect with pre-vetted developers who specialize in your technology stack. Our rigorous screening
                process ensures you work with only the most qualified professionals. We match you with developers who
                have proven experience in your specific industry and project requirements.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    p: 1,
                    borderRadius: 1,
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BoltIcon />
                </Box>
                <Typography variant="h5" component="h3" fontWeight={600}>
                  Fast Matching
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Our algorithm quickly matches your project with the most suitable developers. Instead of spending weeks
                searching for the right talent, our platform analyzes your project requirements and connects you with
                qualified developers within days, saving you valuable time and resources.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    p: 1,
                    borderRadius: 1,
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircleIcon />
                </Box>
                <Typography variant="h5" component="h3" fontWeight={600}>
                  Quality Assurance
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                We ensure high-quality deliverables through our comprehensive review process. Every project goes through
                multiple quality checks to ensure it meets your specifications and industry standards. Our platform
                includes built-in tools for code reviews, testing, and project milestone tracking.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

