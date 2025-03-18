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

import React, { useState, useCallback } from "react";
import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";

export default function AddFiles() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setUploadStatus(null);
        }
    }, []);

    // const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (!selectedFile) {
    //         setUploadStatus("Please select a file first!");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("file", selectedFile);

    //     setUploadStatus(null);
    //     setLoading(true);

    //     try {
    //         const response = await fetch("/upload", {
    //             method: "POST",
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             setUploadStatus("File uploaded successfully!");
    //             setSelectedFile(null);
    //         } else {
    //             setUploadStatus("File upload failed!");
    //         }
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //         setUploadStatus("Error uploading file!");
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [selectedFile]);
    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) {
            setUploadStatus("Please select a file first!");
            return;
        }
    
        setUploadStatus(null);
        setLoading(true);
    
        try {
            // שליחת בקשה ל-Backend לקבלת URL חתום
            const response = await fetch(`/generate-presigned-url?fileName=${encodeURIComponent(selectedFile.name)}`);
            const data = await response.json();
            if (!response.ok) throw new Error("Failed to get presigned URL");
    
            // העלאת הקובץ ישירות ל-S3
            const uploadResponse = await fetch(data.url, {
                method: "PUT",
                body: selectedFile,
                headers: {
                    "Content-Type": selectedFile.type
                }
            });
    
            if (uploadResponse.ok) {
                setUploadStatus("File uploaded successfully!");
                setSelectedFile(null);
                {selectedFile && (
                    <Typography>
                        <a href={`https://devworksbucket.s3.amazonaws.com/${selectedFile.name}`} target="_blank" rel="noopener noreferrer">
                            View File
                        </a>
                    </Typography>
                )}
                
            } else {
                setUploadStatus("File upload failed!");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("Error uploading file!");
        } finally {
            setLoading(false);
        }
    }, [selectedFile]);
    
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2} p={3} boxShadow={3} borderRadius={2} maxWidth={400} mx="auto" bgcolor="background.paper">
            <Typography variant="h5" fontWeight={600} color="primary">Upload a File</Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "100%" }}>
                <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file-upload" />
                <label htmlFor="file-upload">
                    <Button variant="contained" component="span">
                        Choose File
                    </Button>
                </label>
                {selectedFile && <Typography>{selectedFile.name}</Typography>}
                <Button type="submit" variant="contained" color="secondary" disabled={loading || !selectedFile}>
                    {loading ? <CircularProgress size={24} /> : "Upload"}
                </Button>
            </form>
            {uploadStatus && <Alert severity={uploadStatus.includes("successfully") ? "success" : "error"}>{uploadStatus}</Alert>}
        </Box>
    );
}
