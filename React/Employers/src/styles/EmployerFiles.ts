// src/styles/employerFiles.styles.ts
import { alpha } from "@mui/material/styles";

export const containerBox = {
  maxWidth: "900px",
  mx: "auto",
  p: { xs: 2, md: 3 },
};

export const paperWrapper = (theme: any) => ({
  borderRadius: 3,
  overflow: "hidden",
  background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, white)`,
});

export const headerBox = (theme: any) => ({
  bgcolor: theme.palette.primary.main,
  color: "white",
  p: 2.5,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const chipInHeader = {
  bgcolor: "rgba(255,255,255,0.2)",
  color: "white",
  fontWeight: "bold",
};

export const loadingBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  py: 6,
  gap: 2,
};

export const tableContainer = {
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  mb: 3,
};

export const tableHeadRow = (theme: any) => ({
  bgcolor: alpha(theme.palette.primary.main, 0.1),
});

export const tableHeadCell = (theme: any) => ({
  fontWeight: "bold",
  fontSize: "1rem",
  color: theme.palette.primary.dark,
});

export const tableRowHover = (theme: any) => ({
  "&:hover": {
    bgcolor: alpha(theme.palette.primary.light, 0.05),
  },
  transition: "background-color 0.2s",
});

export const uploadButton = {
  borderRadius: 2,
  py: 1.2,
  px: 4,
  fontWeight: "bold",
  boxShadow: 2,
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: 4,
  },
  transition: "all 0.2s",
};

export const dialogTitle = (theme: any) => ({
  bgcolor: theme.palette.primary.main,
  color: "white",
  py: 2,
});

export const dialogContent = {
  pt: 3,
  pb: 1,
  px: 3,
  mt: 1,
};

export const dialogActions = {
  px: 3,
  py: 2,
};
