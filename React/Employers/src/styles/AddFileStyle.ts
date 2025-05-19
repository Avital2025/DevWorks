import styled from 'styled-components';
import { Alert, Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
`;

export const StyledTypography = styled(Typography)`
  width: 100%;
  text-align: left;
`;

export const StyledTextField = styled(TextField)`
  margin: 16px 0;
`;

export const StyledPaper = styled(Paper)`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 32px;
  border: 2px dashed grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  cursor: pointer;
`;

export const StyledButton = styled(Button).attrs((props) => ({
  ...props, 
  component: 'span',
}))`
  margin-top: 16px;
`;

export const StyledCircularProgress = styled(CircularProgress)`
  margin-top: 16px;
`;

export const StyledAlert = styled(Alert)`
  margin-top: 16px;
`;

