
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



import { Link, NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { Home, Info, UploadFile } from "@mui/icons-material"; // אייקונים מתוך MUI


export default () => {
  return (
    <>
      <Box sx={{ position: "absolute", top: 0, right: 0, m: 2 }} />
      <Box sx={{ position: "absolute", top: 0, right: 0, m: 2 }}>
        <nav className="nav-container">
          <Link to="/HomePage" className="nav-link">
            <Home />
            Home
          </Link>
          <Link to="/about" className="nav-link">
            <Info />
            אודות
          </Link>
          <Link to="/login" className="nav-link">
            <UploadFile />
            הרשמו כדי להעלות קבצים
          </Link>
          <NavLink to="/rer" />
        </nav>
      </Box>
    </>
  );
};
