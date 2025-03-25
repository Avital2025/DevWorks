// import React, { useState, useCallback } from 'react';

// export default function addfiles() {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [uploadStatus, setUploadStatus] = useState<string | null>(null); // הוספת סטייט לסטטוס העלאה

//     const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files.length > 0) {
//             setSelectedFile(event.target.files[0]);
//             setUploadStatus(null); // איפוס סטטוס העלאה בעת בחירת קובץ חדש
//         }
//     }, []);

//     const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (!selectedFile) {
//             setUploadStatus('Please select a file first!');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', selectedFile);

//         setUploadStatus('Uploading...'); // עדכון סטטוס העלאה

//         try {
//             const response = await fetch('/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 setUploadStatus('File uploaded successfully!');
//                 setSelectedFile(null); // איפוס קובץ נבחר לאחר העלאה מוצלחת
//             } else {
//                 setUploadStatus('File upload failed!');
//             }
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setUploadStatus('Error uploading file!');
//         }
//     }, [selectedFile]);

//     return (
//         <div>
//             <h2>Upload a File</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="file" onChange={handleFileChange} />
//                 <button type="submit">Upload</button>
//             </form>
//             {uploadStatus && <p>{uploadStatus}</p>} {/* הצגת סטטוס העלאה */}
//         </div>
//     );
// };


// ==================================
// import React, { useState, useCallback } from "react";
// import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";

// export default function AddFiles() {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [uploadStatus, setUploadStatus] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);

//     const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files.length > 0) {
//             setSelectedFile(event.target.files[0]);
//             setUploadStatus(null);
//         }
//     }, []);

//     // const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
//     //     event.preventDefault();
//     //     if (!selectedFile) {
//     //         setUploadStatus("Please select a file first!");
//     //         return;
//     //     }

//     //     const formData = new FormData();
//     //     formData.append("file", selectedFile);

//     //     setUploadStatus(null);
//     //     setLoading(true);

//     //     try {
//     //         const response = await fetch("/upload", {
//     //             method: "POST",
//     //             body: formData,
//     //         });

//     //         if (response.ok) {
//     //             setUploadStatus("File uploaded successfully!");
//     //             setSelectedFile(null);
//     //         } else {
//     //             setUploadStatus("File upload failed!");
//     //         }
//     //     } catch (error) {
//     //         console.error("Error uploading file:", error);
//     //         setUploadStatus("Error uploading file!");
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // }, [selectedFile]);
//     const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (!selectedFile) {
//             setUploadStatus("Please select a file first!");
//             return;
//         }

//         setUploadStatus(null);
//         setLoading(true);

//         try {
//             // שליחת בקשה ל-Backend לקבלת URL חתום
//             const fileName = encodeURIComponent(selectedFile.name.trim().replace(" ", "_"));

//             const response = await fetch(`http://localhost:5069/files/generate-presigned-url?fileName=${fileName}`);
//             const data = await response.json();
//             console.log(data.url);
            
//             console.log(data.url);
//            // const data = await response.json();
//             if (!response.ok) throw new Error("Failed to get presigned URL");

//             // העלאת הקובץ ישירות ל-S3
//             const uploadResponse = await fetch(data.url, {
//                 method: "PUT",
//                 body: selectedFile,
//                 headers: {
//                     "Content-Type": selectedFile.type,  // הכותרת המתאימה לקובץ, לדוגמה application/pdf, image/jpeg
//                   },
//             });

//             if (uploadResponse.ok) {
//                 setUploadStatus("File uploaded successfully!");
//                 setSelectedFile(null);
//                 {
//                     selectedFile && (
//                         <Typography>
//                             <a href={`https://devwork.s3.eu-north-1.amazonaws.com/${selectedFile.name}`} target="_blank" rel="noopener noreferrer">
//                                 View File
//                             </a>
//                         </Typography>
//                     )
//                 }

//             } else {
//                 setUploadStatus("File upload failed!");
//             }
//         } catch (error) {
//             console.error("Error uploading file:", error);
//             setUploadStatus("Error uploading file!");
//         } finally {
//             setLoading(false);
//         }
//     }, [selectedFile]);

//     return (
//         <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2} p={3} boxShadow={3} borderRadius={2} maxWidth={400} mx="auto" bgcolor="background.paper">
//             <Typography variant="h5" fontWeight={600} color="primary">Upload a File</Typography>
//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "100%" }}>
//                 <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file-upload" />
//                 <label htmlFor="file-upload">
//                     <Button variant="contained" component="span">
//                         Choose File
//                     </Button>
//                 </label>
//                 {selectedFile && <Typography>{selectedFile.name}</Typography>}
//                 <Button type="submit" variant="contained" color="secondary" disabled={loading || !selectedFile}>
//                     {loading ? <CircularProgress size={24} /> : "Upload"}
//                 </Button>
//             </form>
//             {uploadStatus && <Alert severity={uploadStatus.includes("successfully") ? "success" : "error"}>{uploadStatus}</Alert>}
//         </Box>
//     );
// }
// React Component















// ======================
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setUploadStatus(null);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) {
      setUploadStatus('Please select a file first!');
      return;
    }

    setUploadStatus(null);
    setLoading(true);
    setProgress(0);

    try {
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axios.get('http://localhost:5069/files/generate-presigned-url', {
        params: { fileName: file.name }
      });

      const presignedUrl = response.data.url;

      // שלב 2: העלאת הקובץ ישירות ל-S3
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      setUploadStatus('File uploaded successfully!');
      setFile(null);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setUploadStatus(`Error uploading file: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [file]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      p={3}
      boxShadow={3}
      borderRadius={2}
      maxWidth={400}
      mx="auto"
      bgcolor="background.paper"
    >
      <Typography variant="h5" fontWeight={600} color="primary">
        Upload a File
      </Typography>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          Choose File
        </Button>
      </label>
      {file && <Typography>{file.name}</Typography>}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleUpload}
        disabled={loading || !file}
      >
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>

      {progress > 0 && (
        <Box width="100%" mt={2}>
          <CircularProgress variant="determinate" value={progress} sx={{ width: '100%' }} />
          <Typography variant="body2" align="center">{progress}%</Typography>
        </Box>
      )}

      {uploadStatus && (
        <Alert severity={uploadStatus.includes('successfully') ? 'success' : 'error'}>
          {uploadStatus}
        </Alert>
      )}
    </Box>
  );
};

export default FileUploader;


// import React, { useState, useCallback } from "react";
// import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";

// interface FileUploadProps {
//     // ניתן להוסיף כאן props במידה ויש
// }

// export default function AddFiles(props: FileUploadProps) {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [uploadStatus, setUploadStatus] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

//     const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files.length > 0) {
//             setSelectedFile(event.target.files[0]);
//             setUploadStatus(null);
//         }
//     }, []);

//     // const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
//     //     event.preventDefault();
//     //     if (!selectedFile) {
//     //         setUploadStatus("Please select a file first!");
//     //         return;
//     //     }

//     //     setUploadStatus(null);
//     //     setLoading(true);
//     //     setUploadedFileUrl(null);

//     //     try {
//     //         const fileName = encodeURIComponent(selectedFile.name.trim().replace(" ", "_"));
//     //         const response = await fetch(`http://localhost:5069/files/generate-presigned-url?fileName=${fileName}`);
//     //         const data = await response.json();

//     //         if (!response.ok) throw new Error("Failed to get presigned URL");

//     //         console.log("Presigned URL:", data.url); // הוספת לוג לבדיקת ה-URL
//     //         console.log("Original URL:", data.url);
//     //         console.log("Decoded URL:", decodeURIComponent(data.url));
//     //         const presignedUrl = decodeURIComponent(data.url);

//     //         const uploadResponse = await fetch(presignedUrl, {
//     //             method: "PUT",
//     //             body: selectedFile,
//     //             headers: {
//     //                 "Content-Type": selectedFile.type
//     //             }
//     //         });
            

//     //         console.log("Upload response status:", uploadResponse.status);
//     //         console.log("Upload response text:", await uploadResponse.text());
            
            

//     //         if (uploadResponse.ok) {
//     //             setUploadStatus("File uploaded successfully!");
//     //             setSelectedFile(null);
//     //             setUploadedFileUrl(`https://devwork.s3.eu-north-1.amazonaws.com/${fileName}`);
//     //         } else {
//     //             setUploadStatus("File upload failed!");
//     //         }
//     //     } catch (error: any) {
//     //         console.error("Error uploading file:", error);
//     //         setUploadStatus("Error uploading file!");
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // }, [selectedFile]);
//     const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (!selectedFile) {
//             setUploadStatus("Please select a file first!");
//             return;
//         }
    
//         setUploadStatus(null);
//         setLoading(true);
//         setUploadedFileUrl(null);
    
//         try {
//             const fileName = encodeURIComponent(selectedFile.name.trim().replace(" ", "_"));
//             const response = await fetch(`http://localhost:5069/files/generate-presigned-url?fileName=${fileName}`);
//             const data = await response.json();
    
//             if (!response.ok) throw new Error("Failed to get presigned URL");
    
//             console.log("Presigned URL:", data.url);
//             console.log("Original URL:", data.url);
//             console.log("Decoded URL:", decodeURIComponent(data.url));
            
//             const presignedUrl = decodeURIComponent(data.url);
    
//             const uploadResponse = await fetch(presignedUrl, {
  
                
//                 method: "PUT",
//                 body: selectedFile,
//                 headers: {
//                     'Content-Type': 'application/octet-stream',
//                 }
//             });
    
//             console.log("Upload response status:", uploadResponse.status);
//             console.log("Upload response text:", await uploadResponse.text());
    
//             if (uploadResponse.ok) {
//                 setUploadStatus("File uploaded successfully!");
//                 setSelectedFile(null);
//                 setUploadedFileUrl(`https://devwork.s3.eu-north-1.amazonaws.com/${decodeURIComponent(fileName)}`);
//             } else {
//                 setUploadStatus("File upload failed!");
//             }
//         } catch (error: any) {
//             console.error("Error uploading file:", error);
//             setUploadStatus(`Error uploading file: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     }, [selectedFile]);
    
//     return (
//         <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2} p={3} boxShadow={3} borderRadius={2} maxWidth={400} mx="auto" bgcolor="background.paper">
//             <Typography variant="h5" fontWeight={600} color="primary">Upload a File</Typography>
//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "100%" }}>
//                 <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file-upload" />
//                 <label htmlFor="file-upload">
//                     <Button variant="contained" component="span">
//                         Choose File
//                     </Button>
//                 </label>
//                 {selectedFile && <Typography>{selectedFile.name}</Typography>}
//                 <Button type="submit" variant="contained" color="secondary" disabled={loading || !selectedFile}>
//                     {loading ? <CircularProgress size={24} /> : "Upload"}
//                 </Button>
//             </form>
//             {uploadStatus && <Alert severity={uploadStatus.includes("successfully") ? "success" : "error"}>{uploadStatus}</Alert>}
//             {uploadedFileUrl && (
//                 <Typography>
//                     <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
//                         View File
//                     </a>
//                 </Typography>
//             )}
//         </Box>
//     );
// }