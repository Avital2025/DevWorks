import { Theme, alpha } from "@mui/material";

export const styles = {
  container: { maxWidth: "900px", mx: "auto", p: { xs: 2, md: 3 } },
  paper: (theme: Theme) => ({
    borderRadius: 3,
    overflow: "hidden",
    background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, white)`,
  }),
  header: (theme: Theme) => ({
    bgcolor: theme.palette.primary.main,
    color: "white",
    p: 2.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  headerTitle: { display: "flex", alignItems: "center", gap: 1.5 },
  fileCountChip: {
    bgcolor: "rgba(255,255,255,0.2)",
    color: "white",
    fontWeight: "bold",
  },
  loadingBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: 6,
    gap: 2,
  },
  tableContainer: {
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    mb: 3,
  },
  tableHeadRow: (theme: Theme) => ({
    bgcolor: alpha(theme.palette.primary.main, 0.1),
  }),
  tableHeadCell: (theme: Theme) => ({
    fontWeight: "bold",
    fontSize: "1rem",
    color: theme.palette.primary.dark,
  }),
  tableRow: (theme: Theme) => ({
    "&:hover": {
      bgcolor: alpha(theme.palette.primary.light, 0.05),
    },
    transition: "background-color 0.2s",
  }),
  fileCellBox: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },
  dateChip: (theme: Theme) => ({
    bgcolor: alpha(theme.palette.primary.light, 0.1),
    fontWeight: "medium",
  }),
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 1,
  },
  downloadButton: (theme: Theme) => ({
    bgcolor: alpha(theme.palette.primary.main, 0.1),
    "&:hover": {
      bgcolor: alpha(theme.palette.primary.main, 0.2),
    },
  }),
  deleteButton: (theme: Theme) => ({
    bgcolor: alpha(theme.palette.error.main, 0.1),
    "&:hover": {
      bgcolor: alpha(theme.palette.error.main, 0.2),
    },
  }),
  emptyBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: 4,
    gap: 1,
  },
  uploadButton: {
    borderRadius: 2,
    py: 1.2,
    px: 4,
    fontWeight: "bold",
    boxShadow: 2,
    transition: "all 0.2s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: 4,
    },
  },
  dialogTitle: (theme: Theme) => ({
    bgcolor: theme.palette.primary.main,
    color: "white",
    py: 2,
  }),
  dialogContent: {
    pt: 3,
    pb: 1,
    px: 3,
    mt: 1,
  },
  dialogActions: {
    px: 3,
    py: 2,
  },
};
