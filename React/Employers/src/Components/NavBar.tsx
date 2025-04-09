import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Home, Info, UploadFile, Menu, Description, Logout, Login } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { IsLogin } from "../App";



const NavBar = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 50px",
  height: "30px",
});

const NavLeft = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const NavRight = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginLeft: "auto",
});

const NavLinkStyled = styled(Link)({
  textDecoration: "none",
  fontSize: "16px",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "lighter",
  color: "#333",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#455a64",
  },
});

export default function ResponsiveNavBar() {
  const [isLogin, setIsLogin] = useContext(IsLogin);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("EmployerId");
    setIsLogin(false);
  };

  return (
    <Box sx={{ position: "absolute", top: 0, right: 0, m: 2 }}>
     <NavBar>
  <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={toggleMenu}>
    <Menu />
  </IconButton>

  <NavLeft sx={{ display: { xs: "none", md: "flex" } }}>
    <NavLinkStyled to="/HomePage">
      <Home /> Home
    </NavLinkStyled>
    <NavLinkStyled to="/about">
      <Info /> About
    </NavLinkStyled>
  </NavLeft>

  <NavRight sx={{ display: { xs: "none", md: "flex" } }}>
    {isLogin ? (
      <>
        <NavLinkStyled to="/userFiles">
          <Description /> My files
        </NavLinkStyled>
        <NavLinkStyled to="/addFiles">
          <UploadFile /> Add files
        </NavLinkStyled>
        <NavLinkStyled to="/" onClick={handleLogout}>
          <Logout /> Logout
        </NavLinkStyled>
      </>
    ) : (
      <NavLinkStyled to="/login">
       <Login /> Register to upload files and access the site
      </NavLinkStyled>
    )}
  </NavRight>

  {/* תפריט צדדי במובייל */}
  <Box sx={{ display: { xs: "block", md: "none" } }}>
    {isLogin ? (
      <NavLinkStyled to="/" onClick={handleLogout}>
        <Logout /> Logout
      </NavLinkStyled>
    ) : (
      <NavLinkStyled to="/login">
        Register to upload files and access the site
      </NavLinkStyled>
    )}
  </Box>
</NavBar>



      {/* תפריט צדדי במובייל */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/HomePage" onClick={toggleMenu}>
              <Home /> <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/about" onClick={toggleMenu}>
              <Info /> <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
          {isLogin && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/userFiles" onClick={toggleMenu}>
                  <Description /> <ListItemText primary="My files" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/addFiles" onClick={toggleMenu}>
                  <UploadFile /> <ListItemText primary="Add files" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
}