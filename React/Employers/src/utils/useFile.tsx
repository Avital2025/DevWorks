

import axios from "axios";
import { useCallback, useState } from "react";
import Swal from 'sweetalert2';

const useFile = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            setUploadStatus(null);
        }
    }, []);

    const handleUpload = useCallback(async (FileName: string) => {
        if (!file) {
            setUploadStatus('Please select a file first!');
            return;
        }

        const employerId = localStorage.getItem('EmployerId') || '0';
        const uniqueFileName = `${employerId}${FileName}`;

        setUploadStatus(null);
        setLoading(true);
        setProgress(0);

        try {
           console.log("starting checking file existence");
            console.log(uniqueFileName); 

            // קריאה לשרת לבדוק אם הקובץ כבר קיים
            const checkFileExistsResponse = await axios.get('http://localhost:5069/files/check-file-exists', {
                params: { fileName: uniqueFileName, employerId }
            });

            if (checkFileExistsResponse.data.exists) {
                // אם הקובץ קיים, הצג הודעת שגיאה למשתמש
                Swal.fire({
                    icon: 'error',
                    title: 'Duplicate file name',
                    text: 'A file with this name already exists. Please choose a different name.',
                });
                return; // יצא מהפונקציה כדי שלא נמשיך בהעלאה
            }

            const response = await axios.get('http://localhost:5069/files/generate-presigned-url', {
                params: { fileName: uniqueFileName }
            });

            const presignedUrl = response.data.url;

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

            const downloadUrlResponse = await axios.get('http://localhost:5069/files/generate-presigned-download-url', {
                params: { fileName: uniqueFileName }
            });

            const downloadUrl = downloadUrlResponse.data.url;

            const model = {
                FileUrl: downloadUrl,
                FileName: uniqueFileName,
                EmployerId: parseInt(employerId, 10),
            };

            await axios.post('http://localhost:5069/files/process-file', model);

            setUploadStatus('File uploaded and processed successfully!');
            setFile(null);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The file was uploaded successfully.",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Error uploading file.');
        } finally {
            setLoading(false);
        }
    }, [file]);

    return { handleFileChange, uploadStatus, loading, handleUpload, progress, file };
};

export default useFile;
