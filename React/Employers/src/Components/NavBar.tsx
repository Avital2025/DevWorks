import type React from "react"
import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import {
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Dialog, DialogContent, Box,
  Typography, AppBar, Toolbar, Menu as MuiMenu, MenuItem, Avatar
} from "@mui/material"
import {
  Home, UploadFile, Menu, Description, Login
} from "@mui/icons-material"
import { IsLogin } from "../App"
import UpdateDetails from "./UpdateDetails"
import RemindersMenu from "./ReminderMenu"

export default function ResponsiveNavBar() {
  const [isLogin, setIsLogin] = useContext(IsLogin)
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [userName, setUserName] = useState("")

  const open = Boolean(anchorEl)

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setUserName(user.fullName || "")
      } catch {
        setUserName("")
      }
    }
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("EmployerId")
    setIsLogin(false)
    window.location.reload()
  }

  const initials = userName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1, px: { xs: 3, sm: 6, md: 8 } }}>
        <Toolbar sx={{
          maxWidth: '1200px', width: '100%', mx: 'auto', py: 1,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: { xs: 1, md: 2 },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton onClick={toggleMenu} sx={{ display: { md: 'none' }, mr: 1 }}>
              <Menu />
            </IconButton>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: { md: 3 } }}>
              <Link to="/HomePage" style={{ display: 'flex', alignItems: 'center', color: '#374151', textDecoration: 'none' }}>
                <Home sx={{ mr: 1 }} />
                <Typography variant="body1" fontWeight="medium">Home</Typography>
              </Link>
              {isLogin && (
                <>
                  <Link to="/userFiles" style={{ display: 'flex', alignItems: 'center', color: '#374151', textDecoration: 'none' }}>
                    <Description sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="medium">My files</Typography>
                  </Link>
                  <Link to="/addFiles" style={{ display: 'flex', alignItems: 'center', color: '#374151', textDecoration: 'none' }}>
                    <UploadFile sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight="medium">Add file</Typography>
                  </Link>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: { xs: 1, md: 0 } }}>
            {isLogin ? (
              <>
                <RemindersMenu />
                <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#64748b', width: 36, height: 36, fontSize: '1rem' }}>
                    {initials}
                  </Avatar>
                </IconButton>
                <MuiMenu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      px: 1,
                      py: 0.5,
                      borderRadius: 2,
                      boxShadow: 3,
                      minWidth: 160,
                    }
                  }}
                >
                  <MenuItem onClick={() => { setOpenDialog(true); handleClose() }}>
                    <Typography fontWeight="medium" color="text.primary">Update Details</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleLogout(); handleClose() }}>
                    <Typography fontWeight="medium" color="error.main">Logout</Typography>
                  </MenuItem>
                </MuiMenu>
              </>
            ) : (
              <Link to="/login" style={{ display: 'flex', alignItems: 'center', color: '#374151', textDecoration: 'none' }}>
                <Login sx={{ mr: 1 }} />
                <Typography variant="body1" fontWeight="medium" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                  Log in to access the site
                </Typography>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={toggleMenu}
        PaperProps={{ sx: { width: 256, backgroundColor: 'white' } }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" fontWeight="bold" color="text.primary">Menu</Typography>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/HomePage" onClick={toggleMenu}>
              <Home sx={{ mr: 2, color: 'gray' }} />
              <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 'medium' }} />
            </ListItemButton>
          </ListItem>
          {isLogin && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/userFiles" onClick={toggleMenu}>
                  <Description sx={{ mr: 2, color: 'gray' }} />
                  <ListItemText primary="My files" primaryTypographyProps={{ fontWeight: 'medium' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/addFiles" onClick={toggleMenu}>
                  <UploadFile sx={{ mr: 2, color: 'gray' }} />
                  <ListItemText primary="Add file" primaryTypographyProps={{ fontWeight: 'medium' }} />
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
        PaperProps={{ sx: { borderRadius: 2, width: '100%', maxWidth: '480px' } }}
      >
        <DialogContent
          sx={{
            p: 4,
            height: '450px',
            maxHeight: '46vh',
            width: '100%',
            maxWidth: '400px',
            mx: 'auto',
          }}
        >
          <UpdateDetails onClose={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
