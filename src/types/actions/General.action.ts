import {
  SystemUsersModel,
  PersonalInfoModel,
  FileUploadModel,
  SystemLogsActivityModel,
  SystemNotificationsModel,
  NotificationDataModel,
} from 'types/models/General';

export const GET_SYSTEM_USERS = 'GET_SYSTEM_USERS';
export const GET_PERSONAL_INFO = 'GET_PERSONAL_INFO';
export const GET_FILE_UPLOAD = 'GET_FILE_UPLOAD';
export const GET_LOGS_ACTIVITIES = 'GET_LOGS_ACTIVITIES';

export const GET_SYSTEM_NOTIFICATIONS = 'GET_SYSTEM_NOTIFICATIONS';
export const GET_NOTIFICATION_DATA = 'GET_NOTIFICATION_DATA';

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
export interface SystemLogsActivityAction {
  type: typeof GET_LOGS_ACTIVITIES;
  payload: SystemLogsActivityModel;
}

export interface SystemNotificationsAction {
  type: typeof GET_SYSTEM_NOTIFICATIONS;
  payload: SystemNotificationsModel;
}

export interface NotificationDataAction {
  type: typeof GET_NOTIFICATION_DATA;
  payload: NotificationDataModel;
}

export type GeneralActionTypes =
  | SystemUsersAction
  | PersonalInfoAction
  | AvatarUploadAction
  | SystemLogsActivityAction
  | SystemNotificationsAction
  | NotificationDataAction;
