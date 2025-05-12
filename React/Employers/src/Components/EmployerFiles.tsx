// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Card, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Dialog, DialogActions,
//   DialogContent, DialogTitle, TextField, CircularProgress
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { FileType } from "../types/fileType";
// import Swal from "sweetalert2";

// export default function EmployerFiles() {
//   const [files, setFiles] = useState<FileType[]>([]);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
//   const [newName, setNewName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   const fetchFiles = () => {
//     setLoading(true);
//     axios.get("http://localhost:5069/files", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (Array.isArray(response.data)) setFiles(response.data);
//       })
//       .catch((error) => console.error("Error fetching files:", error))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const handleDelete = (fileId: string) => {
//     axios.put(`http://localhost:5069/files/${fileId}/mark-deleted`, {}, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then(() => fetchFiles())
//       .catch((error) => console.error("Error deleting file:", error));
//   };
//   const employerId = localStorage.getItem('EmployerId') || '0';
//   const openEditDialog = (file: FileType) => {
//     setSelectedFile(file);
//     const originalName = file.fileName.startsWith(employerId)
//   ? file.fileName.substring(employerId.length)
//   : file.fileName;
// setNewName(originalName);
//     setEditDialogOpen(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!selectedFile) return;

//     try {
//       const checkResponse = await axios.get("http://localhost:5069/files/check-file-exists", {
//         params: {
//           fileName: newName,
//           employerId: employerId,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const exists = checkResponse.data.exists;

//       if (exists) {
//         setEditDialogOpen(false);
//         Swal.fire({
//           icon: "error",
//           title: "השם כבר קיים",
//           text: "יש קובץ אחר עם אותו שם. אנא בחרי שם אחר.",
//         });
//         return;
//       }

//       await axios.put(`http://localhost:5069/files/${selectedFile.id}/rename`, {
//         newFileName: newName,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       setEditDialogOpen(false);
//       setSelectedFile(null);
//       fetchFiles();
//     } catch (error) {
//       console.error("Error checking or updating file name:", error);
//       Swal.fire({
//         icon: "error",
//         title: "שגיאה",
//         text: "משהו השתבש, נסי שוב.",
//       });
//     }
//   };

//   return (
//     <Card sx={{ p: 3, maxWidth: "800px", mx: "auto", mt: 3 }}>
//       <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>הקבצים שהעלית</h2>

//       {loading ? (
//         <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
//           <CircularProgress />
//         </div>
//       ) : (
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>שם הקובץ</TableCell>
//               <TableCell>תאריך העלאה</TableCell>
//               <TableCell>הורדה</TableCell>
//               <TableCell>מחיקה</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {files.length > 0 ? (
//               files.map((file) => (
//                 <TableRow key={file.id}>
//                   <TableCell>
//                     <span style={{ display: "flex", alignItems: "center", gap: "8px", flexDirection: "row-reverse" }}>
//                       {file.fileName}
//                       <IconButton size="small" onClick={() => openEditDialog(file)}>
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     </span>
//                   </TableCell>
//                   <TableCell>{new Date(file.createdAt).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     <IconButton
//                       color="primary"
//                       onClick={async () => {
//                         const employerId = localStorage.getItem("EmployerId") || "0";
//                         const fullName = `${employerId}${file.fileName}`;
//                         try {
//                           const res = await axios.get("http://localhost:5069/files/generate-presigned-download-url", {
//                             params: { fileName: fullName },
//                             headers: {
//                               Authorization: `Bearer ${token}`,
//                             },
//                           });

//                           const downloadUrl = res.data.url;
//                           window.open(downloadUrl, "_blank"); 
//                         } catch (err) {
//                           console.error("Error generating download URL:", err);
//                         }
//                       }}
//                     >
//                       <DownloadIcon />
//                     </IconButton>
//                   </TableCell>

//                   <TableCell>
//                     <IconButton
//                       color="error"
//                       onClick={() => {
//                         Swal.fire({
//                           title: "Are you sure?",
//                           text: "You won't be able to revert this!",
//                           icon: "warning",
//                           showCancelButton: true,
//                           confirmButtonColor: "#3085d6",
//                           cancelButtonColor: "#d33",
//                           confirmButtonText: "Yes, delete it!",
//                         }).then((result) => {
//                           if (result.isConfirmed) {
//                             handleDelete(file.id);
//                             Swal.fire({
//                               title: "Deleted!",
//                               text: "Your file has been deleted.",
//                               icon: "success",
//                             });
//                           }
//                         });
//                       }}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} style={{ textAlign: "center", color: "gray" }}>
//                   אין קבצים להציג
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ mt: 2 }}
//         onClick={() => (window.location.href = "/addFiles")}
//       >
//         העלאת קובץ
//       </Button>

//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
//         <DialogTitle>עריכת שם קובץ</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//             label="שם הקובץ"
//             autoFocus
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditDialogOpen(false)}>ביטול</Button>
//           <Button onClick={handleSaveEdit} variant="contained">שמירה</Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// }


// // לסדר================================= לקצר ל use



// מעוצב לפי V0
"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Box,
  Typography,
  Paper,
  Chip,
  Tooltip,
  Fade,
  useTheme,
  alpha,
  TableContainer,
} from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import FolderIcon from "@mui/icons-material/Folder"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import DescriptionIcon from "@mui/icons-material/Description"
import ImageIcon from "@mui/icons-material/Image"
import ArticleIcon from "@mui/icons-material/Article"
import type { FileType } from "../types/fileType"
import Swal from "sweetalert2"

export default function EmployerFiles() {
  const [files, setFiles] = useState<FileType[]>([])
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const [newName, setNewName] = useState("")
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const theme = useTheme()

  const fetchFiles = () => {
    setLoading(true)
    axios
      .get("http://localhost:5069/files", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) setFiles(response.data)
      })
      .catch((error) => console.error("Error fetching files:", error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleDelete = (fileId: string) => {
    axios
      .put(
        `http://localhost:5069/files/${fileId}/mark-deleted`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then(() => fetchFiles())
      .catch((error) => console.error("Error deleting file:", error))
  }

  const employerId = localStorage.getItem("EmployerId") || "0"

  const openEditDialog = (file: FileType) => {
    setSelectedFile(file)
    const originalName = file.fileName.startsWith(employerId)
      ? file.fileName.substring(employerId.length)
      : file.fileName
    setNewName(originalName)
    setEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!selectedFile) return

    try {
      const checkResponse = await axios.get("http://localhost:5069/files/check-file-exists", {
        params: {
          fileName: newName,
          employerId: employerId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const exists = checkResponse.data.exists

      if (exists) {
        setEditDialogOpen(false)
        Swal.fire({
          icon: "error",
          title: "השם כבר קיים",
          text: "יש קובץ אחר עם אותו שם. אנא בחרי שם אחר.",
        })
        return
      }

      await axios.put(
        `http://localhost:5069/files/${selectedFile.id}/rename`,
        {
          newFileName: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      setEditDialogOpen(false)
      setSelectedFile(null)
      fetchFiles()
    } catch (error) {
      console.error("Error checking or updating file name:", error)
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "משהו השתבש, נסי שוב.",
      })
    }
  }

  // Function to determine file icon based on file extension
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "pdf":
        return <PictureAsPdfIcon color="error" />
      case "doc":
      case "docx":
        return <DescriptionIcon sx={{ color: "#4285F4" }} />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageIcon sx={{ color: "#34A853" }} />
      default:
        return <InsertDriveFileIcon color="primary" />
    }
  }

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          p: { xs: 2, md: 3 },
          direction: "rtl",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, white)`,
          }}
        >
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              p: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <FolderIcon fontSize="large" />
              <Typography variant="h5" fontWeight="bold">
                הקבצים שהעלית
              </Typography>
            </Box>
            <Chip
              label={`${files.length} קבצים`}
              size="medium"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Box>

          <Box sx={{ p: 3 }}>
            {loading ? (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 6, gap: 2 }}>
                <CircularProgress size={50} thickness={4} />
                <Typography variant="body1" color="text.secondary">
                  טוען קבצים...
                </Typography>
              </Box>
            ) : (
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  mb: 3,
                  overflow: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        שם הקובץ
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        תאריך העלאה
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        פעולות
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {files.length > 0 ? (
                      files.map((file) => (
                        <TableRow
                          key={file.id}
                          sx={{
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.light, 0.05),
                            },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              {getFileIcon(file.fileName)}
                              <Typography variant="body1">{file.fileName}</Typography>
                              <Tooltip title="ערוך שם קובץ">
                                <IconButton
                                  size="small"
                                  onClick={() => openEditDialog(file)}
                                  sx={{
                                    color: theme.palette.text.secondary,
                                    "&:hover": {
                                      color: theme.palette.primary.main,
                                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={formatDate(file.createdAt)}
                              sx={{
                                bgcolor: alpha(theme.palette.primary.light, 0.1),
                                fontWeight: "medium",
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                              <Tooltip title="הורד קובץ">
                                <IconButton
                                  color="primary"
                                  sx={{
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    "&:hover": {
                                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                                    },
                                  }}
                                  onClick={async () => {
                                    const employerId = localStorage.getItem("EmployerId") || "0"
                                    const fullName = `${employerId}${file.fileName}`
                                    try {
                                      const res = await axios.get(
                                        "http://localhost:5069/files/generate-presigned-download-url",
                                        {
                                          params: { fileName: fullName },
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        },
                                      )

                                      const downloadUrl = res.data.url
                                      window.open(downloadUrl, "_blank")
                                    } catch (err) {
                                      console.error("Error generating download URL:", err)
                                    }
                                  }}
                                >
                                  <DownloadIcon />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="מחק קובץ">
                                <IconButton
                                  color="error"
                                  sx={{
                                    bgcolor: alpha(theme.palette.error.main, 0.1),
                                    "&:hover": {
                                      bgcolor: alpha(theme.palette.error.main, 0.2),
                                    },
                                  }}
                                  onClick={() => {
                                    Swal.fire({
                                      title: "האם אתה בטוח?",
                                      text: "לא תוכל לשחזר את הקובץ!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "כן, מחק!",
                                      cancelButtonText: "ביטול",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleDelete(file.id)
                                        Swal.fire({
                                          title: "נמחק!",
                                          text: "הקובץ נמחק בהצלחה.",
                                          icon: "success",
                                        })
                                      }
                                    })
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
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              py: 4,
                              gap: 1,
                            }}
                          >
                            <ArticleIcon sx={{ fontSize: 50, color: "text.disabled" }} />
                            <Typography variant="h6" color="text.secondary">
                              אין קבצים להציג
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              העלה את הקובץ הראשון שלך כדי להתחיל
                            </Typography>
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
                sx={{
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
                }}
              >
                העלאת קובץ חדש
              </Button>
            </Box>
          </Box>
        </Paper>

        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              overflow: "hidden",
              direction: "rtl",
            },
          }}
        >
          <DialogTitle
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              py: 2,
            }}
          >
            עריכת שם קובץ
          </DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 1, px: 3, mt: 1 }}>
            <TextField
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              label="שם הקובץ"
              variant="outlined"
              autoFocus
              InputProps={{
                startAdornment: selectedFile && (
                  <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>{getFileIcon(selectedFile.fileName)}</Box>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setEditDialogOpen(false)} variant="outlined" sx={{ borderRadius: 1.5 }}>
              ביטול
            </Button>
            <Button onClick={handleSaveEdit} variant="contained" sx={{ borderRadius: 1.5 }}>
              שמירה
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  )
}


