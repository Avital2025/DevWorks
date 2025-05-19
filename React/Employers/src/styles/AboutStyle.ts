import { alpha, Theme } from "@mui/material"

export const sectionStyle = () => ({
  py: { xs: 10, md: 14 },
  background: `linear-gradient(180deg, ${alpha('#607d8b', 0.05)} 0%, #ffffff 100%)`,
  position: 'relative',
  overflow: 'hidden',
})

export const backgroundStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '50%',
  background: `radial-gradient(ellipse at bottom left, ${alpha('#607d8b', 0.03)} 0%, rgba(255,255,255,0) 70%)`,
  zIndex: 0,
}

export const containerStyle = {
  position: 'relative',
  zIndex: 1,
}

export const titleBoxStyle = {}

export const overlineStyle = {
  color: '#607d8b',
  fontWeight: 600,
  letterSpacing: 2,
  mb: 1,
  display: 'block'
}

export const headingStyle = {
  fontWeight: 800,
  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
  color: 'text.primary',
  mb: 2,
  letterSpacing: '-0.02em',
  lineHeight: 1.2
}

export const descriptionStyle = (theme: Theme) => ({
  color: alpha(theme.palette.text.secondary, 0.9),
  fontSize: '1.1rem',
  lineHeight: 1.7,
  mb: 4
})

export const featureBoxStyle = {
  display: 'flex',
  p: 3,
  borderRadius: '12px',
  background: alpha('#607d8b', 0.03),
  border: `1px solid ${alpha('#607d8b', 0.08)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha('#607d8b', 0.05),
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 20px ${alpha('#607d8b', 0.1)}`
  }
}

export const iconStyle = {
  marginRight: 16,
  flexShrink: 0,
  marginTop: 4
}

export const featureTitleStyle = {
  fontWeight: 700,
  mb: 1
}

export const featureDescriptionStyle = (theme: Theme) => ({
  color: alpha(theme.palette.text.secondary, 0.9),
  lineHeight: 1.6
})

export const buttonStyle = {
  mt: 5,
  color: '#607d8b',
  borderColor: '#607d8b',
  borderWidth: '2px',
  px: 3,
  py: 1,
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#4b636e',
    bgcolor: 'rgba(96, 125, 139, 0.05)',
    transform: 'translateY(-2px)',
  }
}

export const imageWrapperStyle = {
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: { xs: '-15px', md: '-25px' },
    right: { xs: '-15px', md: '-25px' },
    width: { xs: '50%', md: '60%' },
    height: { xs: '50%', md: '60%' },
    background: `linear-gradient(135deg, ${alpha('#607d8b', 0.2)} 0%, ${alpha('#607d8b', 0.05)} 100%)`,
    borderRadius: '20px',
    zIndex: -1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: { xs: '-15px', md: '-25px' },
    left: { xs: '-15px', md: '-25px' },
    width: { xs: '50%', md: '60%' },
    height: { xs: '50%', md: '60%' },
    background: `linear-gradient(135deg, ${alpha('#607d8b', 0.05)} 0%, ${alpha('#607d8b', 0.2)} 100%)`,
    borderRadius: '20px',
    zIndex: -1
  }
}

export const imageStyle = {
  width: "100%",
  height: "auto",
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  aspectRatio: "5 / 3",
  objectFit: "cover",
  border: `1px solid ${alpha('#607d8b', 0.1)}`
}

export const quoteBoxStyle = {
  mt: 4,
  p: 3,
  borderRadius: '12px',
  background: 'white',
  border: `1px solid ${alpha('#607d8b', 0.1)}`,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
}

export const quoteTextStyle = (theme: Theme) => ({
  fontStyle: 'italic',
  color: alpha(theme.palette.text.secondary, 0.9),
  mb: 2
})

export const avatarStyle = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  bgcolor: '#607d8b',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 700,
  mr: 2
}

export const userInfoBoxStyle = {}
