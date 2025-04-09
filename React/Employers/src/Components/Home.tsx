// import { Box, Typography, Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import { Home, Info } from "@mui/icons-material"; // אייקונים מתוך MUI
// import { styled } from "@mui/material/styles";

// const HomePage = () => {
//   return (
//     <Box sx={{ padding: "80px 20px 20px", backgroundColor: "#fff" }}>
//       {/* Intro */}
//       <Box sx={{ textAlign: "center", mb: 4 }}>
//         <Typography variant="h3" sx={{ fontWeight: "bold", color: "#37474f", mb: 2 }}>
//           Welcome to DevWork
//         </Typography>
//         <Typography variant="h6" sx={{ color: "#607d8b", mb: 2 }}>
//           The platform for employers to manage job listings and files easily.
//         </Typography>
//         <Typography variant="body1" sx={{ color: "#455a64" }}>
//           As an employer, you can upload, update, and manage all of your job listings in one place.
//         </Typography>
//       </Box>

//       {/* Buttons */}
//       <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
//         <Link to="/login" style={{ textDecoration: "none" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               backgroundColor: "#37474f",
//               color: "#fff",
//               "&:hover": { backgroundColor: "#263238" },
//             }}
//           >
//             <Home sx={{ mr: 1 }} />
//             Login to Manage Listings
//           </Button>
//         </Link>
//         <Link to="/about" style={{ textDecoration: "none" }}>
//           <Button
//             variant="outlined"
//             color="primary"
//             sx={{
//               borderColor: "#37474f",
//               color: "#37474f",
//               "&:hover": { borderColor: "#263238", color: "#263238" },
//             }}
//           >
//             <Info sx={{ mr: 1 }} />
//             Learn More About DevWork
//           </Button>
//         </Link>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, Info } from "@mui/icons-material"; // אייקונים מתוך MUI
import Hiringemployees from '../assets/Hiring-employees.jpg';
import { useContext } from "react";
import { IsLogin } from "../App";

const HomePage = () => {
  
  const [isLogin] = useContext(IsLogin);
  return (
    <Box sx={{ padding: "100px 20px 40px", backgroundColor: "#fff", direction: "ltr" }}>
      {/* Header section */}
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#37474f", mb: 6 }}>
        DevWork 
        </Typography>
        <Typography variant="h6" sx={{ color: "#607d8b", mb: 6 }}>
          Your platform to manage job listings and files easily
        </Typography>
      </Box>

      {/* Main content with left image and right text */}
      <Grid container spacing={6} sx={{ mt: 10 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ color: "#455a64", mb: 4 }}>
            Manage your job listings, upload files, and access your data with ease.
          </Typography>
          <Typography variant="body1" sx={{ color: "#607d8b", mb: 5, lineHeight: 2 }}>
            As an employer, DevWork allows you to upload, organize, and manage all of your job-related files effortlessly. Whether you’re adding a new job listing or updating an existing one, our platform gives you full control.
          </Typography>
          <Typography variant="body2" sx={{ color: "#455a64", mb: 6, lineHeight: 2 }}>
            With the ability to mark files as irrelevant or outdated, you can ensure that your job listings are always up-to-date and relevant.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <Link to={isLogin ? "/addFiles" : "/login"} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#37474f",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#263238" },
                }}
              >
                <Home sx={{ mr: 1 }} />
                {isLogin ? "Upload file" : " Login to Manage Listings"}
              </Button>


            </Link>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderColor: "#37474f",
                  color: "#37474f",
                  "&:hover": { borderColor: "#263238", color: "#263238" },
                }}
              >
                <Info sx={{ mr: 1 }} />
                Learn More About DevWork
              </Button>
            </Link>
          </Box>
        </Grid>
        
        {/* Image section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={Hiringemployees}
            alt="Example of using DevWork"
            sx={{ width: "90%", borderRadius: "8px", boxShadow: 3, height: "auto" }}
          />
        </Grid>
      </Grid>

      {/* Features section */}
      <Box sx={{ textAlign: "center", mt: 16 }}>
      <Typography
  variant="h4"
  sx={{
    color: "#37474f",
    mb: 5,
    position: "relative",
    display: "inline-block",
    padding: "10px 30px",
    borderRadius: "50px",
    backgroundColor: "rgba(55, 71, 79, 0.1)", // רקע עדין
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // צל עדין
    fontWeight: "bold",
    letterSpacing: "1px",
  }}
>
  Key Features
</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, borderRadius: 2, transition: "0.3s", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)", boxShadow: 3 } }}>
              <Typography variant="h6" sx={{ color: "#607d8b", mb: 3 }}>
                Upload and Manage Files
              </Typography>
              <Typography variant="body2" sx={{ color: "#455a64" }}>
                Effortlessly upload your files and manage them from one central platform.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, borderRadius: 2, transition: "0.3s", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)", boxShadow: 3 } }}>
              <Typography variant="h6" sx={{ color: "#607d8b", mb: 3 }}>
                Update Job Listings
              </Typography>
              <Typography variant="body2" sx={{ color: "#455a64" }}>
                Keep your job listings up to date with the latest project requirements.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, borderRadius: 2, transition: "0.3s", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)", boxShadow: 3 } }}>
              <Typography variant="h6" sx={{ color: "#607d8b", mb: 3 }}>
                Easy File Access
              </Typography>
              <Typography variant="body2" sx={{ color: "#455a64" }}>
                Quickly access and download your uploaded files whenever needed.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer section */}
      <Box sx={{ textAlign: "center", mt: 12, color: "#607d8b" }}>
        <Typography variant="body2">
          © 2025 DevWork. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
