
import axios from "axios";
import { useCallback, useState } from "react";




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


    const handleUpload = useCallback(async () => {
        if (!file) {
            setUploadStatus('Please select a file first!');
            return;
        }

        setUploadStatus(null);
        setLoading(true);
        setProgress(0);
        try {

            // שלב 1: קבלת Presigned URL מהשרת עבור העלאה (PUT)
            const response = await axios.get('http://localhost:5069/files/generate-presigned-url', {
                params: { fileName: file.name }
            });
            console.log(response.data.url);

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

            // שלב 3: קבלת URL להורדה (GET) מ-S3
            const downloadUrlResponse = await axios.get('http://localhost:5069/files/generate-presigned-download-url', {
                params: { fileName: file.name }
            });
            const downloadUrl = downloadUrlResponse.data.url;

            // שלב 4: שליחת ה-URL ל-endpoint שמעדכן את ה-DB
            const model = {
                FileUrl: downloadUrl, // שולח את ה-URL להורדה במקום ה-URL להעלאה
                EmployerId: parseInt(localStorage.getItem('EmployerId') || '0', 10),
            };

            await axios.post('http://localhost:5069/files/process-file', model);


            setUploadStatus('File uploaded and processed successfully!');
            setFile(null);
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