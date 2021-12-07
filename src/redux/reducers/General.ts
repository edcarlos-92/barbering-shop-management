import { 
    FileUploadModel,
    SystemUsersModel,
    PersonalInfoModel,
    SystemLogsActivityModel,
    SystemNotificationsModel,
    NotificationDataModel
  } from "../../types/models/General";

  import {
    GeneralActionTypes,
    GET_SYSTEM_USERS,
    GET_PERSONAL_INFO,
    GET_FILE_UPLOAD,
    GET_SYSTEM_NOTIFICATIONS,
    GET_NOTIFICATION_DATA,
  } from "../../types/actions/General.action";

  const usersInitialState: {
    fileUploadData: FileUploadModel | null;
    systemUsersData: SystemUsersModel | null;
    personalInfoData: PersonalInfoModel | null;
    logActivityData: SystemLogsActivityModel | null;

    systemNotificationsData: SystemNotificationsModel | null;
    notificationDataData: NotificationDataModel | null;
    
  } = {
      fileUploadData: null,
      systemUsersData:null,
      personalInfoData:null,
      logActivityData:null,
      systemNotificationsData:null,
      notificationDataData:null,
  };
    
const General = (state = usersInitialState, action:GeneralActionTypes)=>{

    switch (action.type ) {

          case GET_FILE_UPLOAD:
          return {
            ...state,
            fileUploadData: action.payload, 
          };

          case GET_SYSTEM_USERS:
          return {
            ...state,
            systemUsersData: action.payload,
          };

          case GET_PERSONAL_INFO:
          return {
            ...state,
            personalInfoData: action.payload,
          };

          case GET_SYSTEM_NOTIFICATIONS:
          return {
            ...state,
            systemNotificationsData: action.payload,
          };

          case GET_NOTIFICATION_DATA:
          return {
            ...state,
            notificationDataData: action.payload,
          };

          
        default:
          return state;
      }
    }
export default  General;