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
    
    aplicant_firstname:string;
    aplicant_lastname:string;
    aplicant_othername:string;
    aplicant_serialnumber:string;//ie. AG-X000ID `AG-X${SERIALS}${ID}`
    aplicant_pincode:string;
    aplicant_gender:string;
    aplicant_maritalstatus:string;
    aplicant_dob:string;
    aplicant_pob:string;
    aplicant_hometown:string;
    aplicant_homedistrict:string;
    aplicant_homeregion:string;
    aplicant_residential:string;
    aplicant_gps:string;
    aplicant_height:string;
    aplicant_weight:string;
    aplicant_birthcet:string;
    aplicant_nattionality:string;
    aplicant_currentjob:string;
    aplicant_emergency:string;
    aplicant_emgrelation:string;
    aplicant_emgphone:string;
    aplicant_level_id:string;
    aplicant_subcategory_id:string;
    applicant_centre_id:string;
    application_number:string;//APNC/TIMESECONDS/EN/YEAR
    application_ref_number:string;
    aplicant_sts:string;
    aplicant_payment:string;
    user_bank:string;
    download_region:string;
    download_institution:string;
    download_category:string;
    }
    
    export interface PersonalInfoModel {
    // id:string;
    // user_login:string;
    // user_pass:string;
    // user_email:string,
    // user_registered: Date;
    // user_phone_number:string;
    // display_name:string;
    // user_role:string;
    // updated_at: Date;
    // avatar:string;

    // aplicant_gender:string;
    // aplicant_level_id:string;
    // aplicant_subcategory_id:string;
    // applicant_centre_id:string;
    // aplicant_pincode:string;
    // aplicant_sts:string;
    // aplicant_serialnumber:string;
    // aplicant_payment:string;

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
    
    aplicant_firstname:string;
    aplicant_lastname:string;
    aplicant_othername:string;
    aplicant_serialnumber:string;
    aplicant_pincode:string;
    aplicant_gender:string;
    aplicant_maritalstatus:string;
    aplicant_dob:string;
    aplicant_pob:string;
    aplicant_hometown:string;
    aplicant_homedistrict:string;
    aplicant_homeregion:string;
    aplicant_residential:string;
    aplicant_gps:string;
    aplicant_height:string;
    aplicant_weight:string;
    aplicant_birthcet:string;
    aplicant_nattionality:string;
    aplicant_currentjob:string;
    aplicant_emergency:string;
    aplicant_emgrelation:string;
    aplicant_emgphone:string;
    aplicant_level_id:string;
    aplicant_subcategory_id:string;
    applicant_centre_id:string;
    application_number:string;//APNC/TIMESECONDS/EN/YEAR
    application_ref_number:string;//ie. AG-X000ID `AG-X${SERIALS}${ID}`
    aplicant_sts:string;
    aplicant_payment:string;
    user_bank:string;
    download_region:string;
    download_institution:string;
    download_category:string;
    }
  
    export interface FileUploadModel{
      fileData:any
    }

    export interface SystemLogsActivityModel{
        id: number;
        description: string;
        date:string;
        staffid:string;
    }

    export interface SystemNotificationsModel {
      id: string;
      customer_id: string;
      sms_notification: string;
      email_notification: string;
      push_notification: string;
      text_message: string;
      sender: string;
      notification_type: string;
      role_or_user_id: string;
    }

    
export interface NotificationDataModel {
  id: string;
  name: string;
  image: string;
  message: string;
}