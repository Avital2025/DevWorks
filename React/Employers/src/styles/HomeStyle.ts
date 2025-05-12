import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";

// קופסת פיצ'רים
export const StyledBox = styled(Box)`
  padding: 16px;
  border-radius: 16px;
  transition: 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

// קופסת כותרת ראשית
export const HeaderBox = styled(Box)`
  text-align: center;
  margin-bottom: 64px;

  h3 {
    font-weight: bold;
    color: #37474f;
    margin-bottom: 24px;
  }

  h6 {
    color: #607d8b;
    margin-bottom: 24px;
  }
`;

// עטיפת העמוד הראשי
export const MainWrapper = styled(Box)`
  padding: 100px 20px 40px;
  background-color: #fff;
  direction: ltr;
`;

// כפתור עיקרי
export const ActionButton = styled(Button)`
  background-color: #37474f;
  color: #fff;
  &:hover {
    background-color: #263238;
  }
  margin-right: 16px;
`;

// כפתור משני
export const OutlineButton = styled(Button)`
  border-color: #37474f !important;
  color: #37474f;
  &:hover {
    border-color: #263238 !important;
    color: #263238;
  }
`;

// כותרת אזור פיצ'רים
export const SectionTitle = styled(Typography)`
  color: #37474f;
  margin-bottom: 40px;
  display: inline-block;
  padding: 10px 30px;
  border-radius: 50px;
  background-color: rgba(55, 71, 79, 0.1);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  letter-spacing: 1px;
`;

// טקסט פוטר
export const FooterText = styled(Typography)`
  color: #607d8b;
`;

// עטיפת שני הכפתורים
export const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 16px;
`;


//final