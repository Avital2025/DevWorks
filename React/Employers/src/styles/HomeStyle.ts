import styled from 'styled-components';
import { Box } from '@mui/material';


export const StyledBox = styled(Box)`
  padding: 16px;
  border-radius: 16px;
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
`;




