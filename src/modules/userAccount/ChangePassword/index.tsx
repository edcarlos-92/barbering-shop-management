import React from "react";
import { Box, Typography } from "@mui/material";
import IntlMessages from "@edcarlos/utility/IntlMessages";
import { Fonts } from "shared/constants/AppEnums";
import ChangePasswordForm from "./ChangePasswordForm";
import { Formik } from "formik";
import * as yup from "yup";
import { appIntl } from "@edcarlos/utility/helper/Utils";
import { useDispatch, useSelector } from 'react-redux';
import { doInsert, doUpdate, doDelete } from '../../../redux/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthUser } from "@edcarlos/utility/AuthHooks";

import AppInfoView from '@edcarlos/core/AppInfoView'


const ChangePassword = () => {

  const { messages } = appIntl();
  const { user } = useAuthUser()
  const dispatch = useDispatch()

  const validationSchema = yup.object({
    user_pass: yup
      .string()
      .required(String(messages["password.required"])),//String(<IntlMessages id="password.required"/>)  String(messages["password.required"])
    //.oneOf([yup.ref("oldPassword"), null],  String(messages["oldpassword.oneOf"])  ),
    //.min(8, String(messages["password.min"])  )//String(<IntlMessages id="password.min"/>)
    //.matches(/[a-zA-Z]/,String(messages["password.match"]) ),//String(<IntlMessages id="password.match"/>)
    newPassword: yup
      .string()
      .required(String(messages["password.required"]))
      .min(3, String(messages["password.min"]))
    //.matches(/[a-zA-Z]/,  String(messages["password.match"])  ),//String(<IntlMessages id="password.match"/>)  String(messages["password.match"])
    ,
    retypeNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], String(messages["password.oneOf"])),//String(<IntlMessages id="password.oneOf"/>)  String(messages["password.oneOf"])

    /*
    oldPassword: yup
    .string()
    .required(  String(messages["password.required"])  )//String(<IntlMessages id="password.required"/>)  String(messages["password.required"])
    .oneOf([yup.ref("user_pass"), null],  String(messages["password.oneOf"])  ),//String(<IntlMessages id="password.oneOf"/>)  String(messages["password.oneOf"])
      */
  });


  const UserRecordChangeLog = String(messages["logactivity.Userreocrdchangemsg"])
  //const PolicyupdateLog =String(messages["logactivity.Policyupdatemsg"])
  //const PolicydeleteLog =String(messages["logactivity.Policydeletemsg"])


  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 550,
      }}
    >
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 5 },
        }}
      >
        <IntlMessages id="common.changePassword" />
      </Typography>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        initialValues={{
          user_pass: "",
          newPassword: "",//null
          retypeNewPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);

          //change Password
          const cgPasswordData = {
            id: user.id,
            password: data.retypeNewPassword,
            oldpassword: data.user_pass
          }

          dispatch(doUpdate('pass_change', cgPasswordData, 'personalinfo', UserRecordChangeLog));
          console.log("Change Password data: ", cgPasswordData);
          //console.log("Change Password data: ",data)
          setSubmitting(false);
        }}
      >
        {() => <ChangePasswordForm />}

      </Formik>
      <AppInfoView />
      <ToastContainer />
    </Box>

  );
};

export default ChangePassword;
