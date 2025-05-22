import { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, CircularProgress, Box, Typography, Paper, Chip, Tooltip, Fade, useTheme, TableContainer
} from "@mui/material";
import {
  Download as DownloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  UploadFile as UploadFileIcon,
  Folder as FolderIcon,
  InsertDriveFile as InsertDriveFileIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  Article as ArticleIcon
} from "@mui/icons-material";
import Swal from "sweetalert2";
import type { FileType } from "../types/fileType";
import { useEmployerFileService } from "../utils/useEmployerFilesService";
import { styles } from  "../styles/EmployerFilesStyle";

export default function EmployerFiles() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    fetchFiles,
    deleteFile,
    renameFile,
    generateDownloadUrl,
    employerId,
  } = useEmployerFileService();

  const theme = useTheme();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const data = await fetchFiles();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      await deleteFile(fileId);
      await loadFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete",
        text: "Something went wrong while trying to delete the file. Please try again.",
      });
    }
    
  };

  const openEditDialog = (file: FileType) => {
    setSelectedFile(file);
    const originalName = file.fileName.startsWith(employerId)
      ? file.fileName.substring(employerId.length)
      : file.fileName;
    setNewName(originalName);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedFile) return;

    try {

      await renameFile(selectedFile.id, newName);
      setEditDialogOpen(false);
      setSelectedFile(null);
      loadFiles();
    } catch (error) {
      console.error("Error renaming file:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong, please try again.",
      });
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf": return <PictureAsPdfIcon color="error" />;
      case "doc":
      case "docx": return <DescriptionIcon sx={{ color: "#4285F4" }} />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif": return <ImageIcon sx={{ color: "#34A853" }} />;
      default: return <InsertDriveFileIcon color="primary" />;
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });

  return (
    <Fade in timeout={500}>
      <Box sx={styles.container}>
        <Paper elevation={3} sx={styles.paper(theme)}>
          <Box sx={styles.header(theme)}>
            <Box sx={styles.headerTitle}>
              <FolderIcon fontSize="large" />
              <Typography variant="h5" fontWeight="bold">Your Uploaded Files</Typography>
            </Box>
            <Chip label={`${files.length} files`} size="medium" sx={styles.fileCountChip} />
          </Box>

          <Box sx={{ p: 3 }}>
            {loading ? (
              <Box sx={styles.loadingBox}>
                <CircularProgress size={50} thickness={4} />
                <Typography variant="body1" color="text.secondary">Loading files...</Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} elevation={0} sx={styles.tableContainer}>
                <Table>
                  <TableHead>
                    <TableRow sx={styles.tableHeadRow(theme)}>
                      <TableCell sx={styles.tableHeadCell(theme)}>File Name</TableCell>
                      <TableCell sx={styles.tableHeadCell(theme)}>Upload Date</TableCell>
                      <TableCell align="center" sx={styles.tableHeadCell(theme)}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {files.length > 0 ? (
                      files.map((file) => (
                        <TableRow key={file.id} sx={styles.tableRow(theme)}>
                          <TableCell>
                            <Box sx={styles.fileCellBox}>
                              {getFileIcon(file.fileName)}
                              <Typography variant="body1">{file.fileName}</Typography>
                              <Tooltip title="Edit file name">
                                <IconButton size="small" onClick={() => openEditDialog(file)}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip size="small" label={formatDate(file.createdAt)} sx={styles.dateChip(theme)} />
                          </TableCell>
                          <TableCell>
                            <Box sx={styles.actionButtons}>
                              <Tooltip title="Download file">
                                <IconButton
                                  color="primary"
                                  sx={styles.downloadButton(theme)}
                                  onClick={async () => {
                                    try {
                                      const fullName = `${employerId}${file.fileName}`;
                                      const url = await generateDownloadUrl(fullName);
                                      window.open(url, "_blank");
                                    } catch (err) {
                                      console.error("Error generating download URL:", err);
                                    }
                                  }}
                                >
                                  <DownloadIcon />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Delete file">
                                <IconButton
                                  color="error"
                                  sx={styles.deleteButton(theme)}
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You will not be able to recover this file!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                      cancelButtonText: "Cancel",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleDelete(file.id);
                                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                                      }
                                    });
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Box sx={styles.emptyBox}>
                            <ArticleIcon sx={{ fontSize: 50, color: "text.disabled" }} />
                            <Typography variant="h6" color="text.secondary">No files to display</Typography>
                            <Typography variant="body2" color="text.secondary">Upload your first file to get started</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<UploadFileIcon />}
                onClick={() => (window.location.href = "/addFiles")}
                sx={styles.uploadButton}
              >
                Upload New File
              </Button>
            </Box>
          </Box>
        </Paper>

        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} PaperProps={{ sx: { borderRadius: 2 } }}>
          <DialogTitle sx={styles.dialogTitle(theme)}>Edit File Name</DialogTitle>
          <DialogContent sx={styles.dialogContent}>
            <TextField
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              label="File Name"
              variant="outlined"
              autoFocus
              InputProps={{
                startAdornment: selectedFile && (
                  <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                    {getFileIcon(selectedFile.fileName)}
                  </Box>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
            />
          </DialogContent>
          <DialogActions sx={styles.dialogActions}>
            <Button onClick={() => setEditDialogOpen(false)} variant="outlined" sx={{ borderRadius: 1.5 }}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained" sx={{ borderRadius: 1.5 }}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
}

