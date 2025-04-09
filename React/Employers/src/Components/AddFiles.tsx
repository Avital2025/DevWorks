
import { StyledBox, StyledTypography, StyledTextField, StyledPaper, StyledButton, StyledCircularProgress, StyledAlert } from '../styles/AddFileStyle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useFile from '../utils/useFile';
import { Box, CircularProgress } from '@mui/material';

const FileUploader = () => {
  
  const { uploadStatus, handleFileChange, handleUpload, loading, progress, file } = useFile();

  return (
    <StyledBox>
      <StyledTypography variant="h6" fontWeight={600} color="textPrimary">
        Project Upload
      </StyledTypography>

      <StyledTextField
        label="Project Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <StyledPaper elevation={1}>
        <CloudUploadIcon sx={{ fontSize: 40, color: 'action.active' }} />
        <StyledTypography variant="body1">
          Drag and drop your file here or click to browse files
        </StyledTypography>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <StyledButton variant="outlined">
            Select File
          </StyledButton>
        </label>

        {file && <StyledTypography variant="caption">{file.name}</StyledTypography>}
      </StyledPaper>

      <StyledTypography variant="caption" color="textSecondary" align="left">
        Supported formats: PDF, DOCX, ZIP (max 10MB)
      </StyledTypography>

      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading || !file}
        fullWidth
      >
        {loading ? <StyledCircularProgress size={24} /> : '+ Upload Project'}
      </StyledButton>

      {progress > 0 && (
        <Box width="100%" mt={2}>
          <CircularProgress variant="determinate" value={progress} sx={{ width: '100%' }} />
          <StyledTypography variant="body2" align="center">{progress}%</StyledTypography>
        </Box>
      )}

      {uploadStatus && (
        <StyledAlert severity={uploadStatus.includes('successfully') ? 'success' : 'error'}>
          {uploadStatus}
        </StyledAlert>
      )}
    </StyledBox>
  );
};

export default FileUploader;
