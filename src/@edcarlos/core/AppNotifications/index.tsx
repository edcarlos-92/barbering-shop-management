import React, { useState } from "react";
import { Avatar, IconButton, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppNotificationContent from "./AppNotificationContent";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";


import { styled } from '@mui/material/styles';
// import NotificationsActive from "@mui/icons-material/NotificationImportant";
import Badge from '@mui/material/Badge';
import AppTooltip from "../AppTooltip";
import { alpha } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import jwtAxios from "@edcarlos/services/auth/jwt-auth";
import { useAuthUser } from "@edcarlos/utility/AuthHooks";

interface AppNotificationsProps {
  drawerPosition?: "left" | "top" | "right" | "bottom";
  tooltipPosition?:
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";
  isMenu?: boolean;
  sideText?: string;
  sxNotificationContentStyle?: SxProps<Theme>;
  isActive?: boolean;
  iconSize?: number;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
// const iconSize = {
//   fontSize: 12,
// }


const AppNotifications: React.FC<AppNotificationsProps> = ({
  drawerPosition = "right",
  tooltipPosition = "bottom",
  isMenu = false,
  sideText = '',
  sxNotificationContentStyle = {},
  isActive = false,
  iconSize = 22
}) => {
  const [showNotification, setShowNotification] = useState(false);

  const { user } = useAuthUser();


  const handleshowNotification = (state) => {
    setShowNotification(state);
    //markAsRead();

  }


  async function markAsRead() {
    await jwtAxios.put(`mark_notification_as_read?id=${user.id}`)
      .then(response => {
        console.log(`response`, response.data.document);
      })
      .catch(err => console.log(`err`, err));
  }


  return (
    <>
      {isMenu ? (
        <Box component="span" onClick={() => handleshowNotification(true)}>
          Message
        </Box>
      ) : (
        <>

          <AppTooltip title="Notification" placement={tooltipPosition}>
            <IconButton
              className="icon-btn"
              sx={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                color: (theme) => theme.palette.text.secondary,
                backgroundColor: (theme) => theme.palette.background.default,
                border: 1,
                borderColor: "transparent",
                "&:hover, &:focus": {
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.background.default, 0.9),
                  borderColor: (theme) =>
                    alpha(theme.palette.text.secondary, 0.25),
                },
              }}
              onClick={() => handleshowNotification(true)}
              size="large"
            >

              {isActive == true ?
                // <Badge badgeContent={`!`} color="success">
                //   <NotificationsNoneIcon sx={{ fontSize: iconSize }} color="action" />
                // </Badge>
                <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} variant="dot">
                  <Avatar sx={{ bgcolor: '#f6f6f6' }}>
                    <NotificationsNoneIcon sx={{ fontSize: iconSize }} color="action" />
                  </Avatar>
                </StyledBadge>
                :
                <NotificationsNoneIcon sx={{ fontSize: iconSize }} />
              }





              {/* <NotificationsNoneIcon /> */}
              {/* <NotificationsActive /> */}
            </IconButton>
          </AppTooltip>
          <span style={{ marginLeft: '1em' }} onClick={() => handleshowNotification(true)}>{sideText}</span>

        </>
      )}

      <Drawer
        anchor={drawerPosition}
        open={showNotification}
        onClose={() => handleshowNotification(false)}
      >
        <AppNotificationContent
          sxStyle={sxNotificationContentStyle}
          onClose={() => handleshowNotification(false)}
        />
      </Drawer>
    </>
  );
};

export default AppNotifications;
