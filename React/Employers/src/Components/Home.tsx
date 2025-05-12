// import { Box, Typography, Button, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
// import { Home, Info } from "@mui/icons-material";
// import Hiringemployees from '../assets/Hiring-employees.jpg';
// import { useContext } from "react";
// import { IsLogin } from "../App";
// import {
//   StyledBox,
//   HeaderBox,
//   SectionTitle,
//   MainWrapper,
//   ActionButton,
//   OutlineButton,
//   FooterText,
//   CenteredBox
// } from "../styles/HomeStyle";

// const HomePage = () => {
//   const [isLogin] = useContext(IsLogin);

//   return (
//     <MainWrapper>
//       <HeaderBox>
//         <Typography variant="h3">DevWork</Typography>
//         <Typography variant="h6">
//           Your platform to manage job listings and files easily
//         </Typography>
//       </HeaderBox>

//       <Grid container spacing={6} sx={{ mt: 10 }}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" sx={{ mb: 4 }}>
//             Manage your job listings, upload files, and access your data with ease.
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 5, lineHeight: 2 }}>
//             As an employer, DevWork allows you to upload, organize, and manage all of your job-related files effortlessly.
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 6, lineHeight: 2 }}>
//             With the ability to mark files as irrelevant or outdated, you can ensure that your job listings are always up-to-date.
//           </Typography>
//           <CenteredBox>
//             <Link to={isLogin ? "/addFiles" : "/login"} style={{ textDecoration: "none" }}>
//               <ActionButton variant="contained">
//                 <Home sx={{ mr: 1 }} />
//                 {isLogin ? "Upload file" : "Login to Manage Listings"}
//               </ActionButton>
//             </Link>
//             <Link to="/about" style={{ textDecoration: "none" }}>
//               <OutlineButton variant="outlined">
//                 <Info sx={{ mr: 1 }} />
//                 Learn More About DevWork
//               </OutlineButton>
//             </Link>
//           </CenteredBox>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Box
//             component="img"
//             src={Hiringemployees}
//             alt="Example of using DevWork"
//             sx={{ width: "90%", borderRadius: "8px", boxShadow: 3 }}
//           />
//         </Grid>
//       </Grid>

//       <Box sx={{ textAlign: "center", mt: 16 }}>
//         <SectionTitle variant="h4">Key Features</SectionTitle>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={4}>
//             <StyledBox>
//               <Typography variant="h6">Upload and Manage Files</Typography>
//               <Typography variant="body2">
//                 Effortlessly upload your files and manage them from one central platform.
//               </Typography>
//             </StyledBox>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <StyledBox>
//               <Typography variant="h6">Update Job Listings</Typography>
//               <Typography variant="body2">
//                 Keep your job listings up to date with the latest project requirements.
//               </Typography>
//             </StyledBox>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <StyledBox>
//               <Typography variant="h6">Easy File Access</Typography>
//               <Typography variant="body2">
//                 Quickly access and download your uploaded files whenever needed.
//               </Typography>
//             </StyledBox>
//           </Grid>
//         </Grid>
//       </Box>

//     </MainWrapper>
//   );
// };

// export default HomePage;


// //final
import { Box, Typography, Button, styled, Grid } from "@mui/material";
 import { Link } from "react-router-dom";
 import Hiringemployees from '../assets/Hiring-employees.jpg';
 import { useContext } from "react";
 import { IsLogin } from "../App";
 import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
 import CloudUploadIcon from '@mui/icons-material/CloudUpload';
 import SecurityIcon from '@mui/icons-material/Security';

 // סגנונות מותאמים אישית
 const HeroSection = styled(Box)({
  background: '#607d8b', // גוון אפור כחלחל כפי שנראה בתמונה
  color: '#fff',
  padding: '80px 20px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
 });

 const HeroTitle = styled(Typography)({
  fontSize: '2.5rem',
  fontWeight: 500,
  marginBottom: '1rem',
 });

 const HeroSubtitle = styled(Typography)({
  fontSize: '1.2rem',
  marginBottom: '2rem',
  maxWidth: '600px',
  lineHeight: 1.6,
 });

 const HeroButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#607d8b',
  padding: '12px 30px',
  borderRadius: '5px',
  fontSize: '1rem',
  fontWeight: 500,
  margin: '0 10px',
  '&:hover': {
  backgroundColor: '#e0e0e0',
  },
 });

 const FeaturesSection = styled(Box)({
  padding: '40px 20px',
  textAlign: 'center',
  backgroundColor: '#f5f5f5', // רקע בהיר יותר לשאר הסקציות
 });

 const FeatureGrid = styled(Grid)({
  marginTop: '20px',
 });

 const FeatureCard = styled(Box)({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textAlign: 'center',
  height: '100%', // כדי שהגובה יהיה אחיד
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
 });

 const FeatureIcon = styled(Box)({
  fontSize: '2rem',
  color: '#1976d2', // צבע ראשי
  marginBottom: '10px',
 });

 const HomePage = () => {
  const [isLogin] = useContext(IsLogin);

  return (
  <Box>
  {/* Hero Section - כמו מסך הפתיחה בתמונה */}
  <HeroSection>
  <HeroTitle variant="h4">נהל את המשימות והקבצים שלך בקלות</HeroTitle>
  <HeroSubtitle variant="subtitle1">
  פלטפורמה חדשנית המאפשרת לך לנהל תזכורות, להעלות קבצים ולעקוב אחר המשימות שלך במקום אחד.
  </HeroSubtitle>
  <Box>
  <Link to={isLogin ? "/dashboard" : "/login"} style={{ textDecoration: 'none' }}>
  <HeroButton variant="contained">{isLogin ? 'התחל עכשיו' : 'התחברות'}</HeroButton>
  </Link>
  <Link to="/signup" style={{ textDecoration: 'none' }}>
  <HeroButton variant="outlined">צור משתמש</HeroButton>
  </Link>
  </Box>
  </HeroSection>

  {/* סקציית הפיצ'רים המרכזיים - דומה לתמונה הראשונה */}
  <FeaturesSection>
  <Typography variant="h5" sx={{ mb: 4 }}>
  הפתרון המושלם לניהול המשימות שלך
  </Typography>
  <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
  פלטפורמה מתקדמת המשלבת את כל הכלים שאתה צריך כדי להישאר מאורגן ויעיל.
  </Typography>
  <FeatureGrid container spacing={4}>
  <Grid item xs={12} md={4}>
  <FeatureCard>
  <FeatureIcon><NotificationImportantIcon /></FeatureIcon>
  <Typography variant="h6">מערכת תזכורות חכמה</Typography>
  <Typography variant="body2" color="textSecondary">
  קבל תזכורות בזמן אמת למשימות חשובות. המערכת שלנו מאפשרת לך להגדיר תזכורות מותאמות אישית ולעקוב אחר המשימות שלך בקלות.
  </Typography>
  </FeatureCard>
  </Grid>
  <Grid item xs={12} md={4}>
  <FeatureCard>
  <FeatureIcon><CloudUploadIcon /></FeatureIcon>
  <Typography variant="h6">ניהול קבצים מתקדם</Typography>
  <Typography variant="body2" color="textSecondary">
  העלה, ארגן ושתף קבצים בקלות. המערכת שלנו מאפשרת לך לנהל את כל הקבצים שלך במקום אחד, עם אפשרויות חיפוש וארגון מתקדמות.
  </Typography>
  </FeatureCard>
  </Grid>
  <Grid item xs={12} md={4}>
  <FeatureCard>
  <FeatureIcon><SecurityIcon /></FeatureIcon>
  <Typography variant="h6">אבטחה מתקדמת</Typography>
  <Typography variant="body2" color="textSecondary">
  המידע שלך מאובטח עם הצפנה מתקדמת ואמצעי אבטחה נוספים. אנו מקפידים על פרטיות המידע שלך ושומרים מערכת אמינה ובטוחה.
  </Typography>
  </FeatureCard>
  </Grid>
  </FeatureGrid>
  </FeaturesSection>

  {/* כאן יבוא החלק של הנתונים הסטטיסטיים והחלק התחתון */}
  </Box>
  );
 };

 export default HomePage;