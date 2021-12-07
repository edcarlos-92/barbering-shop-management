import React, { useEffect } from "react";
import orange from "@mui/material/colors/orange";
import { useAuthMethod, useAuthUser } from "../../../../utility/AuthHooks";
import { Box, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import { appDirectories } from "../../../../../shared/constants/AppConst";
import IntlMessages from "@edcarlos/utility/IntlMessages";
import Axios, { setAuthToken } from '@edcarlos/services/auth/jwt-auth';
import axios from 'axios'
//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { getFileUpload, getPersonalInfoData } from '../../../../../redux/actions';
import { AppState } from '../../../../../redux/store';
//-------------------------Redux Store----------------------------------------
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
//import {srcWatcher} from '../../../../../modules/userAccount/PersonalInfo'


interface UserInfoProps {
  color?: string;
}


const UserInfo: React.FC<UserInfoProps> = ({ color = "text.secondary" }) => {


  const dispatch = useDispatch();
  const { logout } = useAuthMethod();
  let { user } = useAuthUser();


  useEffect(() => {
    getPersonalInfoData(dispatch);
  }, []);

  const { personalInfoData } = useSelector<AppState, AppState['usereducer']>(({ usereducer }) => usereducer,);
  personalInfoData ? user = personalInfoData : user
  personalInfoData ? user.avatar = personalInfoData.avatar : user.avatar;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //const [avatarSrc, setavatarSrc] = React.useState(`${appDirectories.avatarAccessDir}${user.avatar}`) 
  console.log(`onlineAvatarAccessDir`, appDirectories.onlineAvatarAccessDir);
  //const [avatarSrc, setavatarSrc] = React.useState(`${appDirectories.onlineAvatarAccessDir}${user.avatar}`) 
  const [avatarSrc, setavatarSrc] = React.useState(`${personalInfoData?.avatar || appDirectories.avatarDefault}`);

  const handleClick = (event: any) => {
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
    if (user.avatar) {
      return user.avatar = personalInfoData?.avatar;
    }
  };


  useEffect(() => {
    setavatarSrc(`${appDirectories.onlineAvatarAccessDir}${user.avatar}`)
  }, [`${appDirectories.onlineAvatarAccessDir}${user.avatar}`]);




  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          py: 3,
          px: 3,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        className="user-info-view"
      >
        <Box sx={{ py: 0.5 }}>
          {user.avatar ? (
            <Avatar
              sx={{
                height: 40,
                width: 40,
                fontSize: 24,
                fontWeight: Fonts.BOLD,
                //backgroundColor: orange[500],
                //backgroundColor:'#fff'
                backgroundColor: "text.secondary"
              }}
              src={personalInfoData?.avatar || user.avatar || avatarSrc}
            >
              {/* {getUserAvatar()} */}
            </Avatar>
          ) : (
            <Avatar
              sx={{
                height: 40,
                width: 40,
                fontSize: 24,
                backgroundColor: "text.secondary"
                //backgroundColor: orange[500],
              }}
            >
              {getUserAvatar()}
            </Avatar>
          )}
        </Box>
        <Box
          sx={{
            width: { xs: "calc(100% - 62px)", xl: "calc(100% - 72px)" },
            ml: 4,
            color: color,//"text.secondary", //
          }}
          className="user-info"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                mb: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 16,
                fontWeight: Fonts.MEDIUM,
                color: "inherit",
              }}
              component="span"
            >
              {user.display_name ? user.display_name : "Admin User "}
            </Box>
            <Box
              sx={{
                ml: 3,
                color: "inherit",
                display: "flex",
              }}
            >
              <ExpandMoreIcon />
            </Box>
          </Box>
          <Box
            sx={{
              mt: -0.5,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "inherit",
            }}
          >
            {user.user_email ? user.user_email : "email@aeci.com "}
            {/* {user.user_role ? user.user_role : "System Developer "} */}
          </Box>
        </Box>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          component={Link}
          href="/my-account"
          onClick={() => {
            handleClose();
          }}
        >
          <IntlMessages id="common.myaccount" />
        </MenuItem>
        <MenuItem onClick={logout}><IntlMessages id="common.logout" /></MenuItem>
      </Menu>
    </>
  );
};

export default UserInfo;






