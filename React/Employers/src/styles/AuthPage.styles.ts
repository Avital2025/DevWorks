import { Box, Paper,  useMediaQuery } from "@mui/material"
import { motion } from "framer-motion"
import { styled } from "@mui/system"

export const AuthWrapper = styled(Box)(({ theme }) => ({
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(
      to bottom,
      rgba(245, 247, 250, 1) 0%,
      rgba(245, 247, 250, 0.9) 30%,
      rgba(245, 247, 250, 0.6) 70%,
      rgba(245, 247, 250, 0) 100%
    )`,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  }))
  
export const AuthPaper = styled(Paper)(({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  return {
    borderRadius: 32,
    overflow: "hidden",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
  }
})

export const InfoSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
}))

export const InfoContent = styled(motion.div)({})

export const InfoCircles = styled("div")(() => ({
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "&::before": {
    width: 200,
    height: 200,
    bottom: -50,
    right: -50,
  },
  "&::after": {
    width: 150,
    height: 150,
    top: -30,
    left: -30,
  },
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
}))

export const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}))

export const FormContent = styled(motion.div)({})
