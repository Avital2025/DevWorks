import { useEffect, useState } from "react";
import { Card, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FileType } from "../types/fileType";

export default function EmployerFiles() {
  const [files, setFiles] = useState<FileType[]>([]);

  // useEffect(() => {
  //   fetch("http://localhost:5069/files")
  //     .then((res) => res.json())
  //     .then((data) => setFiles(data))
  //     .catch((error) => console.error("Error fetching files:", error));
  // }, []);
useEffect(() => {
  fetch("http://localhost:5069/files")
    .then((res) => res.json())
    .then((data) => {
      console.log("API Response:", data); // הדפסת המידע שהתקבל מה-API
      if (Array.isArray(data)) {
        setFiles(data);
      } else {
        console.error("Invalid data format:", data);
      }
    })
    .catch((error) => console.error("Error fetching files:", error));
}, []);
  const handleEdit = (fileId: string) => {
    console.log("Edit file", fileId);
    // הוסף כאן לוגיקה לעריכת קובץ
  };

  const handleDelete = (fileId: string) => {
    console.log("Delete file", fileId);
    // הוסף כאן לוגיקה למחיקת קובץ
  };

  return (
    <Card sx={{ p: 3, maxWidth: "800px", mx: "auto", mt: 3 }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>הקבצים שהעלית</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>שם הקובץ</TableCell>
            <TableCell>תאריך העלאה</TableCell>
            <TableCell>הורדה</TableCell>
            <TableCell>עריכה</TableCell>
            <TableCell>מחיקה</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {files.length > 0 ? (
            files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{new Date(file.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <a href={file.url} download>
                    <IconButton color="primary">
                      <DownloadIcon />
                    </IconButton>
                  </a>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEdit(file.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(file.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center", color: "gray" }}>
                אין קבצים להציג
              </TableCell>
            </TableRow>
          )}
        </TableBody> */}
        <TableBody>
          {files.length > 0 ? (
            files.map((file) => (
              <TableRow key={file.id}> {/* הוספת key עם id של הקובץ */}
                <TableCell>{file.name}</TableCell>
                <TableCell>{new Date(file.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <a href={file.url} download>
                    <IconButton color="primary">
                      <DownloadIcon />
                    </IconButton>
                  </a>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEdit(file.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(file.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center", color: "gray" }}>
                אין קבצים להציג
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => (window.location.href = "/addFiles")}
      >
        העלאת קובץ
      </Button>
    </Card>
  );
}
