import React from "react";
//import notification from "@edcarlos/services/db/notifications";
import { IconButton, Theme } from "@mui/material";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import AppScrollbar from "@edcarlos/core/AppScrollbar";
import IntlMessages from "@edcarlos/utility/IntlMessages";
import NotificationItem from "./NotificationItem";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/system";
import { useAuthUser } from "@edcarlos/utility/AuthHooks";

//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { silentInsert, silentDelete, getCustomersData, doSelect, uploadFileHandler, getFileUpload } from 'redux/actions';
import { AppState } from 'redux/store';
import { EXPENSES_TYPES, SHOP_ITEMS, TOTAL_EXPENSES } from 'types/actions/Barber.actions';
import jwtAxios from "@edcarlos/services/auth/jwt-auth";
import { useIsMounted } from "@edcarlos/libs/@edcartech/Hooks/useIsMounted";
//-------------------------Redux Store----------------------------------------




interface NotificationData {
  id: string;
  name: string;
  image: string;
  message: string;
}

interface AppNotificationContentProps {
  onClose: () => void;
  sxStyle: SxProps<Theme>;
}


// let singleMsgData: NotificationData[] = [];
// let groupMsgData: NotificationData[] = [];
// const notification = [
//   {
//     id: 1,
//     name: 'Message Name2',
//     image: 'No Image2',
//     message: 'Full Message Description2'
//   },
//   {
//     id: 2,
//     name: 'Message Name3',
//     image: 'No Image3',
//     message: 'Full Message Description3'
//   },
//   {
//     id: 3,
//     name: 'Message Name3',
//     image: 'No Image3',
//     message: 'Full Message Description3'
//   },
//   {
//     id: 4,
//     name: 'Message Name3',
//     image: 'No Image3',
//     message: 'Full Message Description3'
//   }

// ]




const AppNotificationContent: React.FC<AppNotificationContentProps> = ({ onClose, sxStyle, }) => {


  const { user } = useAuthUser();
  const isMountedRef = useIsMounted();

  //let notification = [{}];

  const [singleMsgData, setSingleMsgData] = React.useState([]);
  const [groupMsgData, setGroupMsgData] = React.useState([]);

  async function getSingleNotification() {
    // let API_Link = `single_notifications?id=${1}`
    // await jwtAxios({
    //   method: 'GET',
    //   url: API_Link,
    // })
    await jwtAxios.get(`single_notifications?id=${user.id}`)
      .then(response => {
        console.log(`getSingleNotification response`, response.data.document);

        //singleMsgData = response.data.document;
        //notification = response.data.document;
        setSingleMsgData(response.data.document)
      })
      .catch(err => console.log(`err`, err));
  }

  async function getGoupNotification() {
    // const res = await axios.get(`/api/mactechrecruit/applications/educationalinfo/get_overall_computing`, { params: { candidate_id: user.id } })
    //let API_Link = `group_notifications?id=${id}`
    //let API_Link = `group_notifications`
    // await jwtAxios({
    //   method: 'GET',
    //   url: API_Link,
    //   params: { id: 180, user_role: "Bank Manager" }
    // })
    await jwtAxios.get(`group_notifications`, { params: { id: user.id, user_role: user.user_role } })
      .then(response => {
        console.log(`getGoupNotification response`, response.data.document);
        //groupMsgData = response.data.document;
        //const groupRec = response.data.document;
        //notification = [groupRec].map((item, i) => Object.assign({}, item, notification[i]));
        //console.log(`notification`, notification);
        setGroupMsgData(response.data.document)
      })
      .catch(err => console.log(`err`, err));
  }


  React.useEffect(() => {
    if (isMountedRef.current) {
      getGoupNotification();
      getSingleNotification();

      // if (singleMsgData.length && groupMsgData.length) {
      //   notification = singleMsgData.map((item, i) => Object.assign({}, item, groupMsgData[i]));
      //   console.log(`notification`, notification);
      // }
    }
  }, []);




  // console.log(`singleMsgData.length`, singleMsgData.length);
  // console.log(`groupMsgData.length`, groupMsgData.length);

  //const notification = [...singleMsgData, ...groupMsgData]

  // const mergedArray = [singleMsgData, groupMsgData];
  // // mergedArray have duplicates, lets remove the duplicates using Set
  // let set = new Set();
  // const notification = mergedArray?.filter((item: any) => {
  //   if (!set.has(item?.id)) {
  //     set.add(item?.id);
  //     return true;
  //   }
  //   return false;
  // }, set);
  // console.log(`notification`, notification);



  async function markAsRead() {
    await jwtAxios.put(`mark_notification_as_read?id=${user.id}`)
      .then(response => {
        console.log(`response`, response.data.document);
      })
      .catch(err => console.log(`err`, err));
  }



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 280,
        height: "100%",
        ...sxStyle,
      }}
    >
      <Box
        sx={{
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderBottomColor: (theme) => theme.palette.divider,
          minHeight: { xs: 56, sm: 70 },
        }}
      >
        <Typography component="h3">
          {/* <IntlMessages id="common.notifications" />({notification.length}) */}
          <IntlMessages id="common.notifications" />

        </Typography>
        <IconButton
          sx={{
            height: 40,
            width: 40,
            marginLeft: "auto",
            color: "text.secondary",
          }}
          onClick={onClose}
          size="large"
        >
          <CancelOutlinedIcon />
        </IconButton>
      </Box>
      <AppScrollbar
        sx={{
          height: { xs: "calc(100% - 96px)", sm: "calc(100% - 110px)" },
        }}
      >

        {/* <List sx={{ py: 0 }}>
          {notification.map((item: any) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </List> */}


        {/* {notification != undefined && notification.length != 0 ?
          <List sx={{ py: 0 }}>
            {notification?.map((item: any, index) => (
              <NotificationItem key={index} item={item} />
            ))}
          </List>
          : ''
        } */}


        {singleMsgData != undefined && singleMsgData != [] && singleMsgData.length != 0 ?
          <List sx={{ py: 0 }}>
            {[singleMsgData]?.map((item: any, index) => (
              <NotificationItem key={index} item={item} />
            ))}
          </List>
          : null
        }

        {groupMsgData != undefined && groupMsgData != [] && groupMsgData.length != 0 ?
          <List sx={{ py: 0 }}>
            {[groupMsgData]?.map((item: any, index) => (
              <NotificationItem key={index} item={item} />
            ))}
          </List>
          : null
        }


      </AppScrollbar>
      <Button
        sx={{
          borderRadius: 0,
          width: "100%",
          textTransform: "capitalize",
          marginTop: "auto",
          height: 40,
        }}
        variant="contained"
        color="primary"
      //onClick={() => markAsRead()}
      >
        <IntlMessages id="common.clearAll" />
        {/* <IntlMessages id="common.viewAll" /> */}
      </Button>
    </Box>
  );
};

export default AppNotificationContent;

