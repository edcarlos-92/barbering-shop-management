import React from "react";
import orange from "@mui/material/colors/orange";
import { useAuthMethod, useAuthUser } from "../../../../../utility/AuthHooks";
import { alpha, Box, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Fonts } from "../../../../../../shared/constants/AppEnums";

const UserInfo = () => {
  const { logout } = useAuthMethod();
  const { user } = useAuthUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (user.display_name) {
      return user.display_name.charAt(0).toUpperCase();
    }
    if (user.user_email) {
      return user.user_email.charAt(0).toUpperCase();
    }
  };

  return (
    <Box
      sx={{
        py: 3,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Box onClick={handleClick}>
        {user.avatar ? (
          <Avatar
            sx={{
              height: 30,
              width: 30,
              backgroundColor: orange[500],
            }}
            src={user.avatar}
          />
        ) : (
          <Avatar
            sx={{
              height: 30,
              width: 30,
              fontSize: 20,
              backgroundColor: orange[500],
            }}
          >
            {getUserAvatar()}
          </Avatar>
        )}
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          py: 4,
        }}
      >
        <MenuItem
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.common.black, 0.08),
            px: 6,
            py: 3,
          }}
        >
          <Box
            sx={{
              mr: 3.5,
            }}
          >
            {user.avatar ? (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                }}
                src={user.avatar}
              />
            ) : (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  fontSize: 20,
                  backgroundColor: orange[500],
                }}
              >
                {getUserAvatar()}
              </Avatar>
            )}
          </Box>

          <Box>
            <Box
              sx={{
                mb: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 14,
                fontWeight: Fonts.MEDIUM,
              }}
              component="span"
            >
              {user.display_name ? user.display_name : "Admin User "}
            </Box>
            <Box
              sx={{
                mt: -0.5,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 12,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              {user.user_email ? user.user_email : "email@aeci.com "}
              {/* {user.display_name ? user.display_name : "Admin User "} */}
            </Box>
          </Box>
        </MenuItem>
        <MenuItem
          component={Link}
          href="/my-account"
          sx={{
            px: 6,
            py: 1.5,
          }}
        >
          My account
        </MenuItem>
        <MenuItem
          sx={{
            px: 6,
            py: 1.5,
          }}
          onClick={logout}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserInfo;
