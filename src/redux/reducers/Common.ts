import { 
  Common,
  FileUploadModel,
  SystemUsersModel,
  PersonalInfoModel,
  PolicyLogsActivityModel,
} from "../../types/models/Common";
import {
  CommonActionTypes,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
  GET_SYSTEM_USERS,
  GET_PERSONAL_INFO,
  GET_FILE_UPLOAD,
} from "../../types/actions/Common.action";

const INIT_STATE: Common = {
  error: "",
  loading: false,
  isAppDrawerOpen: false,
  updatingContent: false,
  message: "",
  //position:"",
  //alignment:""
};

const CommonReducer = (
  state = INIT_STATE,
  action: CommonActionTypes
): Common => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: "", message: "", loading: true };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        error: "",
        message: "",
        loading: false,
        updatingContent: false,

        //position:"",
        //alignment:""
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        error: "",
        message: action.message,
        loading: false,
        updatingContent: false,

        //position:"",
        //alignment:""
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        message: "",
        updatingContent: false,

        //position:"",
        //alignment:""
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        loading: false,
        error: "",
        message: "",
        updatingContent: false,

        //position:"",
        //alignment:""
      };
    }
    case TOGGLE_APP_DRAWER: {
      return {
        ...state,
        isAppDrawerOpen: !state.isAppDrawerOpen,
      };
    }
    default:
      return state;
  }
};
export default CommonReducer;

    const usersInitialState: {
      fileUploadData: FileUploadModel | null;
      systemUsersData: SystemUsersModel | null;
      personalInfoData: PersonalInfoModel | null;
      logActivityData: PolicyLogsActivityModel | null;
           
    } = {
        fileUploadData: null,
        systemUsersData:null,
        personalInfoData:null,
        logActivityData:null,
    };
  
export const UsersReducer = (state = usersInitialState, action:CommonActionTypes)=>{

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

        default:
          return state;
      }
    }