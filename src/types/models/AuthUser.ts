export interface AuthUser {
  
  // Other Ones
 id?: number;
 user_login?:any;
 display_name?:string;
 user_role?: string[] | string;
 avatar?:string;
 user_section?:string;
 user_email?:string;
 user_activation_key?:string;
 token?: string;
 user_pass?:string;
 // Other Ones
//  user_registered?: Date;
user_phone_number?:string; 
//  aplicant_firstname?:string;
//  aplicant_lastname?:string;
//  aplicant_othername?:string;
 aplicant_serialnumber?:string;//ie. AG-X000ID `AG-X000${ID}`
 aplicant_pincode?:string;
 aplicant_gender?:string;
//  aplicant_maritalstatus?:string;
//  aplicant_dob?:string;
//  aplicant_pob?:string;
//  aplicant_hometown?:string;
//  aplicant_homedistrict?:string;
//  aplicant_homeregion?:string;
//  aplicant_residential?:string;
//  aplicant_gps:string?;
//  aplicant_height?:string;
//  aplicant_weight?:string;
//  aplicant_birthcet?:string;
//  aplicant_nattionality?:string;
//  aplicant_currentjob?:string;
//  aplicant_emergency?:string;
//  aplicant_emgrelation?:string;
//  aplicant_emgphone?:string;
aplicant_level_id?:string;
aplicant_subcategory_id?:string;
applicant_centre_id?:string;
application_number?:string;//APNC/TIMESECONDS/EN/YEAR
application_ref_number?:string;//APNC/TIMESECONDS/EN/YEAR
aplicant_sts?:string;
aplicant_payment?:string;
user_bank?:string;
user_notification?:string;
download_region?:string;
download_institution?:string;
download_category?:string;















 ///*
 //user_login?: string;
 //display_name?: string;
 //user_email?: string;
 //avatar?: string;

 //user_role?: string[] | string;
 //*/

 
}
