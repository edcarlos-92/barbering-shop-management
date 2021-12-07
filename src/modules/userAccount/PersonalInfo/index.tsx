import React from 'react'
import { useAuthUser } from "@edcarlos/utility/AuthHooks";
import { Formik } from "formik";
import * as yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { doUpdate } from "../../../redux/actions";//@edcarlos/utility/Utils   //../../../../lib/swr-hooks
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useIntl } from 'react-intl';
import AppInfoView from '@edcarlos/core/AppInfoView'

const PersonalInfo = (props) => {

  const { messages } = useIntl();
  const dispatch = useDispatch();
  const { user } = useAuthUser();

  const validationSchema = yup.object({
    user_email: yup.string().email(String(messages["validation.emailFormat"])).required("Required"),
  });

  const msgsuccess = String(messages["common.submitsuccess"]);
  const PersonalupdateLog = String(messages["logactivity.PersonalInfomsg"])

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 550,
      }}
    >
      <Formik
        validateOnBlur={true}
        initialValues={{
          ...user,
          avatar: user.avatar
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(doUpdate('personal_info', data, 'personalinfo', PersonalupdateLog))
          // if (fileUploadData){
          //    uploadFileHandler(fileUploadData,`upload_user_avatar`);
          // }
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <>
              <PersonalInfoForm values={values} setFieldValue={setFieldValue} />
              {/* <Alerts message={``}  notify={notify}  setNotify={setNotify} /> */}
            </>

          );
        }}
      </Formik>
      <AppInfoView />
      <ToastContainer />
    </Box>
  );
};


export default PersonalInfo;
PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};

