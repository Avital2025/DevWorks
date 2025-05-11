
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogContent
} from "@mui/material";
import {
  Home,
  Info,
  UploadFile,
  Menu,
  Description,
  Logout,
  Login,
  AccountCircle
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { IsLogin } from "../App";
import { Menu as MuiMenu, MenuItem } from "@mui/material";
import UpdateDetails from "./UpdateDetails";
import RemindersMenu from "./ReminderMenu";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const open = Boolean(anchorEl);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <NavLinkStyled to="/HomePage"><Home /> Home</NavLinkStyled>
          <NavLinkStyled to="/about"><Info /> About</NavLinkStyled>
        </NavLeft>




        <NavRight sx={{ display: { xs: "none", md: "flex" } }}>
          {isLogin ? (
            <>
              <NavLinkStyled to="/userFiles"><Description /> My files</NavLinkStyled>
              <NavLinkStyled to="/addFiles"><UploadFile /> Add files</NavLinkStyled>

              {/* 🔔 תפריט תזכורות מוקפץ */}
              <RemindersMenu />

              <IconButton onClick={handleProfileClick}><AccountCircle /></IconButton>
              <MuiMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => { setOpenDialog(true); handleClose(); }}>
                  Update Details
                </MenuItem>
                <MenuItem onClick={() => { handleLogout(); handleClose(); }}>
                  Logout
                </MenuItem>
              </MuiMenu>
            </>
          ) : (
            <NavLinkStyled to="/login">
              <Login /> Register to upload files and access the site
            </NavLinkStyled>
          )}
        </NavRight>


        {/* מובייל */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {isLogin ? (
            <>
              <RemindersMenu />
              <IconButton onClick={handleProfileClick}><AccountCircle /></IconButton>
              <MuiMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => { setOpenDialog(true); handleClose(); }}>
                  Update Details
                </MenuItem>
                <MenuItem onClick={() => { handleLogout(); handleClose(); }}>
                  Logout
                </MenuItem>
              </MuiMenu>
            </>
          ) : (
            <NavLinkStyled to="/login">Register to upload files and access the site</NavLinkStyled>
          )}
        </Box>

      </NavBar>

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
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/reminders" onClick={toggleMenu}>
                  <Info /> <ListItemText primary="Reminders" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/add-reminders" onClick={toggleMenu}>
                  <Info /> <ListItemText primary="Add reminders" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ minHeight: '70vh' }}>
          <UpdateDetails onClose={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
