import { useEffect, useState } from "react";
import { Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { FileType } from "../types/fileType";

export default function EmployerFiles() {
  const [files, setFiles] = useState<FileType[]>([]);

  useEffect(() => {
    fetch("https://your-api.com/employer/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  return (
    <Card sx={{ p: 3, maxWidth: "800px", mx: "auto", mt: 3 }}>
    <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>הקבצים שהעלית</h2>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>שם הקובץ</TableCell>
          <TableCell>תאריך העלאה</TableCell>
          <TableCell>פעולות</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {files.length > 0 ? (
          files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>{file.name}</TableCell>
              <TableCell>{new Date(file.uploadDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <a href={file.url} download>
                  <Button variant="outlined" startIcon={<DownloadIcon />}>הורדה</Button>
                </a>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} style={{ textAlign: "center", color: "gray" }}>
              אין קבצים להציג
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </Card>
  );
}
