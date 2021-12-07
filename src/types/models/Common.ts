export interface Common {
  error: string;
  loading: boolean;
  isAppDrawerOpen: boolean;
  updatingContent: boolean;
  message: string;
  //position:any,
  //alignment:any
}


export interface SystemUsersModel {
  id:string;
  user_login:string;
  user_pass:string;
  user_email:string,
  user_registered: Date;
  user_phone_number:string;
  display_name:string;
  user_role:string;
  updated_at: Date;
  avatar:string;
  }
  
  export interface PersonalInfoModel {
  id:string;
  user_login:string;
  user_pass:string;
  user_email:string,
  user_registered: Date;
  user_phone_number:string;
  display_name:string;
  user_role:string;
  updated_at: Date;
  avatar:string;
  }

  export interface FileUploadModel{
    fileData:any
  }

  export interface PolicyLogsActivityModel{
    id: number;
    description: string;
    date:string;
    staffid:string;
}
