import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box, ListItem, Typography } from "@mui/material";
import { Fonts } from "shared/constants/AppEnums";
import FolderIcon from "@heroicons/react/outline/FolderIcon";
import MailIcon from "@heroicons/react/outline/MailIcon";
import Email from "@mui/icons-material/Email";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import MarkEmailRead from "@mui/icons-material/MarkEmailRead";

interface NotificationItemProps {
  item: {
    image: string;
    name: string;
    message: string;
  };
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  return (
    <ListItem
      sx={{
        padding: "8px 20px",
      }}
      className="item-hover"
    >
      <ListItemAvatar
        sx={{
          minWidth: 0,
          mr: 4,
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
          }}
        //alt="Remy Sharp"
        //src={item.image}
        //src={'/assets/images/login-header.png'}
        ><Email sx={{ fontSize: 25 }} /></Avatar>
      </ListItemAvatar>
      <Box
        sx={{
          fontSize: 14,
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Typography>
          <Box
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: Fonts.MEDIUM,
              mb: 0.5,
              color: (theme) => theme.palette.text.primary,
              mr: 1,
              display: "inline-block",
            }}
          >
            {/* {item.name} */}
            {/* NOTIFICATION */}
          </Box>
          {item.message}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default NotificationItem;
