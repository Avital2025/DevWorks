
// import {  Link, NavLink } from "react-router";

// import { Box } from "@mui/system";

// export default ()=>{

//   return(
//       <>
//          <Box
//       sx={{
//         position: "absolute",
//         top: 0,
//         right: 0,
//         m: 2, 
//       }}/>
//       <Box sx={{   position: "absolute",
//         top: 0,
//         right: 0,
//         m: 2,
//       }}>

//         <nav>

//             <Link to="/HomePage">   Home   </Link>
//             <Link to="/about">   אודות   </Link>
//             <Link to="/login">   הרשמו כדי להעלות קבצים   </Link>
//             <NavLink to='/rer'/>

//         </nav>
//       </Box>

//         </>
//     )
// }
/*--------------------*/
// import { Link, NavLink } from "react-router-dom";
// import { Box } from "@mui/system";
// import { Home, Info, UploadFile } from "@mui/icons-material"; // אייקונים מתוך MUI

// export default () => {
//   return (
//     <>
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           right: 0,
//           m: 2,
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           right: 0,
//           m: 2,
//         }}
//       >
//         <nav
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             fontFamily: "'Roboto', sans-serif",
//             fontSize: "16px",
//           }}
//         >
//           <Link
//             to="/HomePage"
//             style={{
//               textDecoration: "none",
//               color: "#1976D2",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               padding: "5px",
//               borderRadius: "4px",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             <Home />
//             Home
//           </Link>
//           <Link
//             to="/about"
//             style={{
//               textDecoration: "none",
//               color: "#1976D2",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               padding: "5px",
//               borderRadius: "4px",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             <Info />
//             אודות
//           </Link>
//           <Link
//             to="/login"
//             style={{
//               textDecoration: "none",
//               color: "#1976D2",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               padding: "5px",
//               borderRadius: "4px",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             <UploadFile />
//             הרשמו כדי להעלות קבצים
//           </Link>
//           <NavLink to='/rer'/>
//         </nav>
//       </Box>
//     </>
//   );
// };
/*----------------------------------------------*/


// const RecruitersContainer = styled("div")({
//   display: "flex",
//   justifyContent: "flex-end",
//   alignItems: "center",
//   gap: "10px",
// });

// const Button = styled("button")({
//   fontSize: "16px",
//   padding: "8px 16px",
//   borderRadius: "25px",
//   color: "#f8f1e4",
//   background: "linear-gradient(135deg, #2b2d42, #1e1f33)",
//   border: "2px solid #e1d5c9",
//   cursor: "pointer",
//   transition: "background 0.3s, border-color 0.3s",
//   "&:hover": {
//     background: "linear-gradient(135deg, #3a3c5c, #292a44)",
//     borderColor: "#f8f1e4",
//   },
// });
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Home, Info, UploadFile } from "@mui/icons-material"; // אייקונים מתוך MUI
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { IsLogin } from "../App";


const NavBar = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 50px", // רווח יותר סביר
  height: "30px", // הוספתי גובה יותר נעים
  //borderBottom: "1px solid #ddd",  קו תחתון עדין
});

const NavLeft = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px", // הוספתי רווח בין הקישורים
});

const NavRight = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px", // הוספתי רווח בין הקישורים
  float : "left"
});

const NavLinkStyled = styled(Link)({
  textDecoration: "none", // ביטול קו תחתון
  fontSize: "16px", // גודל טקסט נעים
  fontFamily: "'Roboto', sans-serif", // שינוי הגופן
  fontWeight: "lighter",
  // color: "#607d8b",  צבע טקסט כהה
  color: "#333",
  display: "flex",
  alignItems: "center", // לוודא שהאייקון והטקסט יהיו מיושרים
  gap: "8px", // רווח בין האייקון לטקסט
  padding: "10px", // ריפוד סביב הקישור
  transition: "color 0.3s ease", // אפקט מעבר צבע
  "&:hover": {
    color: "#455a64", // צבע כחול בהhover

  },
});
export default () => {
  const [isLogin] = useContext(IsLogin);
  return (
    <Box sx={{ position: "absolute", top: 0, right: 0, m: 2 }}>
      <NavBar>
        <NavLeft>
          <NavLinkStyled to="/HomePage">
            <Home /> Home
          </NavLinkStyled>
          <NavLinkStyled to="/about">
            <Info /> About
          </NavLinkStyled>
        </NavLeft>

        <NavRight>
          <NavLinkStyled to={isLogin ? "/addFiles" : "/login"}>
            <UploadFile /> {isLogin ? "Upload file" : "Register to upload files and access the site"}
          </NavLinkStyled>
        </NavRight>
      </NavBar>
    </Box>
  );
};


