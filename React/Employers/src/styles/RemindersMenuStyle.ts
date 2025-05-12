// gpt

// import styled from "styled-components";
// import { Box, IconButton, Menu } from "@mui/material";

// export const NotificationIconButton = styled(IconButton)<{ open: boolean }>`
//   color: ${(props) => (props.open ? "#1976d2" : "inherit")};
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     background-color: rgba(0, 0, 0, 0.04);
//     transform: scale(1.05);
//   }
// `;

// export const StyledMenu = styled(Menu)`
//   .MuiPaper-root {
//     margin-top: 12px;
//     border-radius: 16px;
//     min-width: 320px;
//     overflow: hidden;
//   }

//   .MuiList-root {
//     padding: 0;
//   }
// `;

// export const MenuHeader = styled(Box)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 12px 16px;
//   background-color: #f5f5f5;
// `;

// export const MenuFooter = styled(Box)`
//   display: flex;
//   justify-content: space-around;
//   padding: 10px;
//   border-top: 1px solid #e0e0e0;
// `;

// export const MenuListBox = styled(Box)`
//   max-height: 300px;
//   overflow-y: auto;
// `;

// export const ReminderItem = styled(Box)<{ isRead: boolean }>`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   opacity: ${(props) => (props.isRead ? 0.5 : 1)};
// `;

// export const IconLabelWrapper = styled(Box)`
//   display: flex;
//   align-items: center;
// `;

// export const ReminderTime = styled("span")`
//   font-size: 0.75rem;
//   color: #999;
// `;

// export const MarkAllButton = styled("button")`
//   background: none;
//   border: none;
//   color: #1976d2;
//   cursor: pointer;
//   font-size: 0.85rem;

//   &:hover {
//     text-decoration: underline;
//   }
// `;
// RemindersMenuStyle.js


// gemini

import styled from "styled-components";
import { IconButton, Typography, Box, Button, Badge, Menu, Avatar, MenuItem } from "@mui/material";
import { Link } from "react-router-dom"; // יבוא של Link - לא בטוח שנחוץ כאן

interface StyledIconButtonProps {
  open?: boolean;
}

export const StyledIconButton = styled(IconButton) <StyledIconButtonProps>`
  color: ${({ open, theme }) => (open ? theme.palette.primary.main : theme.palette.text.primary)};
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    transform: scale(1.05);
  }
`;

export const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    font-size: 10px;
    height: 18px;
    min-width: 18px;
    padding: 0 4px;
    font-weight: bold;
  }
`;

export const StyledMenu = styled(Menu)`
  margin-top: 1.5;
  border-radius: 2px;
  min-width: 320px;
  overflow: hidden;
  & .MuiList-root {
    padding: 0;
  }
`;

export const MenuHeader = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: ${({ theme }) => theme.spacing(1.5, 2)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: rtl;
`;

export const MenuTitle = styled(Typography)`
  font-weight: bold;
`;

export const EmptyReminders = styled(Box)`
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.palette.text.secondary};
`;

interface ReminderItemProps {
  isRead?: boolean;
}

export const ReminderItem = styled(MenuItem) <ReminderItemProps>`
    white-space: normal;
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing(1.5)};
    padding: ${({ theme }) => theme.spacing(1.5, 2)};
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    background-color: ${({ isRead, theme }) =>
        isRead ? "transparent" : theme.palette.primary[100]};
    direction: rtl;
    &:hover {
      background-color: ${({ isRead, theme }) =>
        isRead ? theme.palette.action.hover : theme.palette.primary[200]};
    }
  `;

interface StyledAvatarProps {
  isRead?: boolean;
}

export const StyledAvatar = styled(Avatar) <StyledAvatarProps>`
    background-color: ${({ isRead, theme }) =>
        isRead ? theme.palette.grey[300] : theme.palette.primary.light};
    width: 36px;
    height: 36px;
  `;

export const ReminderContent = styled(Box)`
  flex-grow: 1;
  cursor: pointer;
  overflow: hidden;
`;

interface ReminderTitleProps {
  isRead?: boolean;
}

export const ReminderTitle = styled(Typography) <ReminderTitleProps>`
    font-weight: ${({ isRead }) => (isRead ? "normal" : "bold")};
    margin-bottom: ${({ theme }) => theme.spacing(0.5)};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `;

export const ReminderTime = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.75rem;
`;

export const ReadIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.primary.main};
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.lighter};
  }
`;

export const MenuActions = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const ActionButtons = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  direction: rtl;
`;

export const StyledButton = styled(Button)`
  border-radius: 1.5;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;
`;