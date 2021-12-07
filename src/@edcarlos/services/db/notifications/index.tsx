
import React from 'react';
import { useIsMounted } from '@edcarlos/libs/@edcartech/Hooks/useIsMounted';
import jwtAxios, { setAuthToken } from '@edcarlos/services/auth/jwt-auth';
import { useAuthUser } from '@edcarlos/utility/AuthHooks';

export interface NotificationData {
  id: string;
  name: string;
  image: string;
  message: string;
}


let singleMsgData: NotificationData[] = [];
let groupMsgData: NotificationData[] = [];
// const notificationData: NotificationData[] = [];
// export default notificationData;
// export function groupSingleNotificationData() {
//   //const { user, isAuthenticated, isLoading } = useAuthUser();
//   const isMountedRef = useIsMounted();
//   // React.useEffect(() => {
//   //   if (isMountedRef.current) {
//   //     getGoupNotification();
//   //     getSingleNotification();
//   //   }
//   // }, []);
//   console.log(`singleMsgData`, singleMsgData);
//   console.log(`groupMsgData`, groupMsgData);
//   return [...singleMsgData, groupMsgData]
// }


async function getSingleNotification() {
  let API_Link = `single_notifications?id=${1}`
  await jwtAxios({
    method: 'GET',
    url: API_Link,
  })
    .then(response => {
      console.log(`getSingleNotification response`, response.data.document);
      singleMsgData = response.data.document;
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
  await jwtAxios.get(`group_notifications`, { params: { id: 180, user_role: "Bank Manager" } })
    .then(response => {
      console.log(`getGoupNotification response`, response.data.document);
      groupMsgData = response.data.document;
    })
    .catch(err => console.log(`err`, err));
}

console.log(`singleMsgData`, singleMsgData);
console.log(`groupMsgData`, groupMsgData);

getGoupNotification();
getSingleNotification();


//groupSingleNotificationData();

const notificationData: NotificationData[] = [...singleMsgData, ...groupMsgData];
export default notificationData;










//export default notificationData;

// async function getBankManager() {
//   let API_Link = `/mactechrecruit/admin/settings/banking/bankusers/get_bank_user?id=${user?.id}`
//     await jwtAxios({
//     method: 'GET',
//     url: API_Link,
//   })
//     .then(response => {
//       if (isMountedRef.current) {
//         setBankManager(response.data.document[0].user_bank);
//       }
//     })
//     .catch(err => console.log(err));
// }

// useEffect(() => {
//   if (isMountedRef.current) {
//     getBankManager();
//   }
// }, []);

