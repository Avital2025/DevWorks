import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, CircularProgress
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FileType } from "../types/fileType";
import Swal from "sweetalert2";

export default function EmployerFiles() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchFiles = () => {
    setLoading(true);
    axios.get("http://localhost:5069/files", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (Array.isArray(response.data)) setFiles(response.data);
      })
      .catch((error) => console.error("Error fetching files:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = (fileId: string) => {
    axios.put(`http://localhost:5069/files/${fileId}/mark-deleted`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => fetchFiles())
      .catch((error) => console.error("Error deleting file:", error));
  };
  const employerId = localStorage.getItem('EmployerId') || '0';
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
      const checkResponse = await axios.get("http://localhost:5069/files/check-file-exists", {
        params: {
          fileName: newName,
          employerId: employerId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const exists = checkResponse.data.exists;

      if (exists) {
        setEditDialogOpen(false);
        Swal.fire({
          icon: "error",
          title: "השם כבר קיים",
          text: "יש קובץ אחר עם אותו שם. אנא בחרי שם אחר.",
        });
        return;
      }

      await axios.put(`http://localhost:5069/files/${selectedFile.id}/rename`, {
        newFileName: newName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setEditDialogOpen(false);
      setSelectedFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Error checking or updating file name:", error);
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "משהו השתבש, נסי שוב.",
      });
    }
  };

  return (
    <Card sx={{ p: 3, maxWidth: "800px", mx: "auto", mt: 3 }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>הקבצים שהעלית</h2>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <CircularProgress />
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם הקובץ</TableCell>
              <TableCell>תאריך העלאה</TableCell>
              <TableCell>הורדה</TableCell>
              <TableCell>מחיקה</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {files.length > 0 ? (
              files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px", flexDirection: "row-reverse" }}>
                      {file.fileName}
                      <IconButton size="small" onClick={() => openEditDialog(file)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </TableCell>
                  <TableCell>{new Date(file.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={async () => {
                        const employerId = localStorage.getItem("EmployerId") || "0";
                        const fullName = `${employerId}${file.fileName}`;
                        try {
                          const res = await axios.get("http://localhost:5069/files/generate-presigned-download-url", {
                            params: { fileName: fullName },
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          });

                          const downloadUrl = res.data.url;
                          window.open(downloadUrl, "_blank"); 
                        } catch (err) {
                          console.error("Error generating download URL:", err);
                        }
                      }}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete(file.id);
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success",
                            });
                          }
                        });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center", color: "gray" }}>
                  אין קבצים להציג
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => (window.location.href = "/addFiles")}
      >
        העלאת קובץ
      </Button>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>עריכת שם קובץ</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            label="שם הקובץ"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleSaveEdit} variant="contained">שמירה</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
