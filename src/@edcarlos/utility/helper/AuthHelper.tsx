import { authRole } from "../../../shared/constants/AppConst";

export const getUserFromAuth0 = (user: any) => {
  if (user)
    return {
      id: 1,
      user_login: user.sub,
      display_name: user.name,
      user_email: user.user_email,
      avatar: user.picture,
      user_role: user.user_role,// user.user_role authRole.user
    };
  return user;
};

export const getUserFromFirebase = (user: any) => {
  if (user)
    return {
      id: 1,
      user_login: user.user_login,
      display_name: user.display_name ? user.display_name : "AECI Safety",
      user_email: user.user_email,
      avatar: user.avatar ? user.avatar : "/assets/images/avatar/A11.jpg",
      user_role: user.user_role,// user.user_role authRole.user
    };
  return user;
};
export const getUserFromAWS = (user: any) => {
  if (user)
    return {
      id: 1,
      user_login: user.username,
      display_name: user.attributes.name ? user.attributes.name : "AECI Safety",
      user_email: user.attributes.user_email,
      avatar: user.avatar,
      user_role: user.user_role,// user.user_role authRole.user
    };
  return user;
};

export const getUserFromJwtAuth = (user: any) => {
  if (user)
    return {
      id: user.id ? user.id : 1,
      user_login: user.user_login,
      display_name: user.display_name,
      user_email: user.user_email,
      avatar: user.avatar,
      user_role: user.user_role,// user.user_role authRole.user
      user_section: user.user_section,
      user_pass: user.user_pass,
      aplicant_pincode: user.aplicant_pincode,
      user_phone_number: user.user_phone_number,
      aplicant_level_id: user.aplicant_level_id,
      aplicant_subcategory_id: user.aplicant_subcategory_id,
      aplicant_gender: user.aplicant_gender,
      aplicant_sts: user.aplicant_sts,
      aplicant_serialnumber: user.aplicant_serialnumber,
      aplicant_payment: user.aplicant_payment,
      applicant_centre_id: user.applicant_centre_id,
      application_ref_number: user.application_ref_number,
      user_bank: user.user_bank,
      user_notification: user.user_notification,
      download_region: user.download_region,
      download_institution: user.download_institution,
      download_category: user.download_category
    };
  return user;
};
