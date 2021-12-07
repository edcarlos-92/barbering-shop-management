import { 
  FileUploadModel,
  SystemUsersModel,
  PersonalInfoModel,
  } from '../models/Common';




// action strings
export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const TOGGLE_APP_DRAWER = "TOGGLE_APP_DRAWER";
export const HIDE_MESSAGE = "HIDE_MESSAGE";


export const GET_SYSTEM_USERS = 'GET_SYSTEM_USERS';
export const GET_PERSONAL_INFO = 'GET_PERSONAL_INFO';
export const GET_FILE_UPLOAD = 'GET_FILE_UPLOAD';


export interface FetchStartAction {
  type: typeof FETCH_START;
}

export interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS;
}

export interface FetchErrorAction {
  type: typeof FETCH_ERROR;
  error: string;
  
}

export interface ShowMessageAction {
  type: typeof SHOW_MESSAGE;
  message: string;
}

export interface ToggleDrawerAction {
  type: typeof TOGGLE_APP_DRAWER;
}

export interface HideMessageAction {
  type: typeof HIDE_MESSAGE;
}


export interface SystemUsersAction {
  type: typeof GET_SYSTEM_USERS;
  payload: SystemUsersModel;
}
export interface PersonalInfoAction {
  type: typeof GET_PERSONAL_INFO;
  payload: PersonalInfoModel;
}
export interface AvatarUploadAction {
  type: typeof GET_FILE_UPLOAD;
  payload: FileUploadModel;
}



export type CommonActionTypes =
  | FetchStartAction
  | FetchSuccessAction
  | FetchErrorAction
  | ShowMessageAction
  | ToggleDrawerAction
  | HideMessageAction
  | SystemUsersAction
  | PersonalInfoAction
  | AvatarUploadAction
  ;
