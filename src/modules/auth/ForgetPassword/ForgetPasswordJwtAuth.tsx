import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import AppInfoView from "@edcarlos/core/AppInfoView";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IntlMessages from "@edcarlos/utility/IntlMessages";
import AppTextField from "@edcarlos/core/AppFormComponents/AppTextField";
import { Fonts } from "../../../shared/constants/AppEnums";
import AuthWrapper from "../AuthWrapper";
import AppLogo, { SystemLogo } from "../../../@edcarlos/core/AppLayout/components/AppLogo";
import { DashboardLogoSwitcher } from "@edcarlos/libs/@edcartech/components/LogoSwitcher";
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import Controls from "@edcarlos/libs/@edcartech/components/Controls/Controls";
import { useForm, Forms } from '@edcarlos/libs/@edcartech/components/useForm';
import { Emailregex } from '@edcarlos/utility/Utils';
import FormControl from "@mui/material/FormControl";
import { FormPopup } from "@edcarlos/libs/@edcartech/components/Popups";
import ConfirmDialog from "@edcarlos/libs/@edcartech/components/ConfirmDialog";
//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import {
  //mapDeptToUsersInCharge,
  doInsert,
  doUpdate,
  doDelete,
  getSystemUsersData,
  getTokenFreeSystemUsersData
} from '../../../redux/actions';
import { AppState } from '../../../redux/store';
import ConfirmDialogPop from "@edcarlos/libs/@nextui/components/ConfirmDialogPop";
import { AccountCircle, EmailOutlined, Phone, SwitchAccount } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { toast, ToastContainer } from "react-toastify";
import { findAMatch } from "@edcarlos/libs/@edcartech/utils";
import InputAdornment from "@mui/material/InputAdornment";
//-------------------------Redux Store----------------------------------------



const initialFValues = {
  // id: 0,
  // user_login:'' ,
  user_email: '',
  // user_registered: new Date(),
  // user_phone_number:'',
  // display_name:'',
  // user_role:'Applicant',
  // user_pass:'', //randomNum(6), PASSWORD
  // updated_at: new Date(),
  // aplicant_pincode:'',//generateUniqueID(6), PIN_NUMBER
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email(String(<IntlMessages id="validation.emailFormat" />))
    .required(String(<IntlMessages id="validation.emailRequired" />)),
});

const ForgetPasswordJwtAuth = () => {

  const router = useRouter();




  //resetAll();
  useEffect(() => { getTokenFreeSystemUsersData(dispatch) }, []);

  // const {systemUsersData} = useSelector<AppState, AppState['safety']>(({safety}) => safety,);
  const { systemUsersData } = useSelector<AppState, AppState['general']>(({ general }) => general,);

  console.log('Canditates compare', systemUsersData)


  const dispatch = useDispatch();
  const { messages } = useIntl();
  //const [termConditionsCheck,setTermConditionsCheck] = useState(false);
  const [openPopup, setOpenPopup] = useState(true);
  //const [openPopup, setOpenPopup] = useState(false);

  const [openDialogSlide, setOpenDialogSlide] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })


  //const { sendPassword, recordForEdit } = props

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors }
    if ('user_email' in fieldValues) temp.user_email = fieldValues.user_email.length != 0 && Emailregex.test(fieldValues.user_email) === true ? "" : <IntlMessages id='common.invalidmail.label' />;
    setErrors({ ...temp })

    if (fieldValues == values) return Object.values(temp).every(x => x == "")
  }


  const sendPassMmsgconfirmsub = String(messages["applicant.sendPassMmsgconfirmsub"])
  const sendPassMsgconfirm = String(messages["applicant.sendPassMsgconfirm"])
  const ApplicantResetLog = String(messages["logactivity.Applicantresetmsg"])
  const ApplicantResetSuccessMsg = String(messages["applicant.ApplicantResetSuccessMsg"]);
  const ApplicantResetErrorMsg = String(messages["applicant.ApplicantResetErrorMsg"])

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);


  const handleSubmit = (e: any) => {
    //console.log(`Preventing Values`,values)
    e.preventDefault()

    if (validate()) {

      //systemUsersData
      //objectValueWithReference

      let findMail = findAMatch(systemUsersData, 'user_email', values.user_email);
      //let findPhone=findAMatch(systemUsersData,'user_phone_number',values.user_phone_number);

      // console.log(`findMail`,findAMatch(systemUsersData,'user_email',values.user_email));
      // console.log(`findPhone`,findAMatch(systemUsersData,'user_phone_number',values.user_phone_number));

      //toast.success((`Hello`),{ theme: "colored" });
      //if(values.user_email === String('edcartech@gmail.com')){
      if (!findMail) {
        //console.log(`Email Exist Already`,values.user_email)
        toast.error(String(messages["message.notExist"]), { theme: 'colored', position: 'top-center' });
        //toast.error( String(values.user_email) + ` ` +String(messages["message.notExist"]),{ theme:'colored',position:'top-center' });
      }
      // else if(findPhone){
      //   //console.log(`Phone Number Exist Already`,values.user_phone_number)
      //   toast.error(String(values.user_phone_number) + ` ` + String(messages["message.alreadyExist"]),{ theme: "colored",position:'top-center' });
      // }
      // else if(!termConditionsCheck){

      //   //console.log(`Phone Number Exist Already`,values.user_phone_number)
      //   toast.warning(String(messages["message.readTermsAndConditions"]),{ theme: "dark",position:'top-center' });
      // }

      else {

        setConfirmDialog({
          isOpen: true,
          title: sendPassMsgconfirm,
          subTitle: sendPassMmsgconfirmsub,
          onConfirm: () => { sendPassword(values, resetForm) }
        })
      }

    }
  }


  // const resetAll = ()=>{
  // setTermConditionsCheck(false);
  // }


  const sendPassword = (formData: any, resetForm: any) => {

    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })

    dispatch(doInsert('mactechrecruit/reset_applicant_password', formData, 'applicants', `${ApplicantResetLog}${formData.user_email}`, ApplicantResetSuccessMsg, ApplicantResetErrorMsg));

    resetForm();
    router.push("/signin");
    //resetAll();  
  }


  return (
    <AuthWrapper>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: { xs: 8, xl: 10 } }}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <AppLogo /> */}
            {/* <SystemLogo/> */}
            <DashboardLogoSwitcher theWidth={250} />
          </Box>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 1.5,
              color: (theme) => theme.palette.text.primary,
              fontWeight: Fonts.SEMI_BOLD,
              fontSize: { xs: 14, xl: 16 },
            }}
          >
            <IntlMessages id="common.forgetPassword" />
          </Typography>

          <Typography
            sx={{
              pt: 3,
              fontSize: 15,
              color: "grey.500",
            }}
          >
            <span style={{ marginRight: 4 }}>
              <IntlMessages id="common.alreadyHavePassword" />
            </span>
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.MEDIUM,
                "& a": {
                  color: (theme) => theme.palette.primary.main,
                  textDecoration: "none",
                },
              }}
            >
              {/* <a href="/signin">
                <IntlMessages id="common.signIn" />
              </a> */}

              <a onClick={() => { router.push("/signin") }}>
                <IntlMessages id="common.signIn" />
              </a>

            </Box>
          </Typography>
        </Box>

        {/* <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}> */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>

          <Forms onSubmit={handleSubmit} >

            <Grid item md={12} sm={12} xs={12} >
              <FormControl sx={{ width: "92%" }}>
                <Controls.TextInput
                  placeholder={messages["common.user_email"] as string}
                  type="email"
                  name="user_email"
                  //label={<IntlMessages id='common.user_email'/>}
                  value={values.user_email}
                  onChange={handleInputChange}
                  error={errors.user_email}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  }}


                />
              </FormControl>
            </Grid>


            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >

                <Controls.Button
                  sx={{
                    position: "relative",
                    minWidth: 150,
                  }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  //onClick={(e)=>{handleSubmit(e.target.value)}}
                  //text={<IntlMessages id='common.sendNewPassword'/>}
                  text={<IntlMessages id='common.resetPassword' />}
                />

                <Controls.Button
                  sx={{
                    position: "relative",
                    minWidth: 100,
                    ml: 2.5,
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={resetForm}
                  text={<IntlMessages id='reset.label' />}
                />

              </Box>
            </Grid>
            {/* <Signin /> */}

            {/* <ToastNotification /> */}
          </Forms>
        </Box>


        <ConfirmDialog
          maxWidth="xs" //'xs' | 'sm' | 'md' | 'lg' | 'xl'
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          confirmYes="Okay Send"
          confirmNo="Cancel"
        ></ConfirmDialog>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <AppInfoView />
        {/* </Box> */}
      </Box>
    </AuthWrapper>
  );
};

export default ForgetPasswordJwtAuth;
