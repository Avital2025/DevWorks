import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';


export const NavBar = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 50px",
  height: "30px",
});

export const NavLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

export const NavRight = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginLeft: "auto",
});

export const NavLinkStyled = styled(Link)({
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
