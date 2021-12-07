import React, { useState, useEffect } from "react";
import { alpha, Box, Button, Hidden, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AppGridContainer from "@edcarlos/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import IntlMessages from "@edcarlos/utility/IntlMessages";
import { useDropzone } from "react-dropzone";
import { Form } from "formik";
import AppTextField from "@edcarlos/core/AppFormComponents/AppTextField";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { Fonts } from "shared/constants/AppEnums";
import { appDirectories, initialUrl } from "shared/constants/AppConst";
//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { getFileUpload, getPersonalInfoData, silentAddOrEdit } from 'redux/actions';
import { AppState } from 'redux/store';
import { GET_PERSONAL_INFO } from 'types/actions/General.action';
//-------------------------Redux Store----------------------------------------
//import {useRouter,Router} from 'next/router';
import Router from "next/router";
import { useAuthUser } from "@edcarlos/utility/AuthHooks";
import { userInfo } from "os";
//import {BrowserRouter as Router,Route,Link,Switch,Redirect} from "react-router-dom";



const AvatarViewWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    "& .edit-icon": {
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: "50%",
      width: 26,
      height: 26,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.4s ease",
      cursor: "pointer",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
      },
    },
    "&.dropzone": {
      outline: 0,
      "&:hover .edit-icon, &:focus .edit-icon": {
        display: "flex",
      },
    },
  };
});



interface PersonalInfoFormProps {
  setFieldValue: (field: string, data: any) => void;
  values: any;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ values, setFieldValue, }) => {

  const { user, isAuthenticated, isLoading } = useAuthUser();
  const dispatch = useDispatch();


  useEffect(() => {
    getPersonalInfoData(dispatch);
  }, []);

  //---> const [avatarSrc, setavatarSrc] = useState(`${appDirectories.onlineAvatarAccessDir}${values.avatar}`)
  const { personalInfoData } = useSelector<AppState, AppState['usereducer']>(({ usereducer }) => usereducer,);
  personalInfoData ? values = personalInfoData : values
  const [avatarSrc, setavatarSrc] = useState(`${personalInfoData?.avatar || appDirectories.avatarDefault}`);

  useEffect(() => {
    setFieldValue("user_email", values.user_email);
    setFieldValue("display_name", values.display_name);
    setFieldValue(avatarSrc, `${personalInfoData?.avatar}`);
  }, []);


  //console.log(`personalInfoData Personal Info`, personalInfoData)

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFieldValue("avatar", URL.createObjectURL(acceptedFiles[0]));
      setavatarSrc(URL.createObjectURL(acceptedFiles[0]));
      const file = acceptedFiles[0];
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      bodyFormData.append('id', user?.id);
      console.log("getInputProps: ", acceptedFiles[0])
      dispatch(silentAddOrEdit('upload_cloudinary_file', bodyFormData, '', GET_PERSONAL_INFO));
      //-----------------------Use Axios to Upload Now
    },
  });


  return (
    <Form noValidate autoComplete="off">
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <IntlMessages id="common.personalInfo" />
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: 5, lg: 6 },
        }}
      >
        <AvatarViewWrapper {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />

          <label htmlFor="icon-button-file">
            <Avatar
              sx={{
                width: { xs: 50, lg: 64 },
                height: { xs: 50, lg: 64 },
                cursor: "pointer",
              }}

              src={personalInfoData?.avatar || user.avatar || avatarSrc}
            //src={personalInfoData?.avatar ? personalInfoData?.avatar : `/assets/images/placeholder.jpg`}
            //src={`/uploads/avatar/${values.avatar}`} //'/uploads/images/placeholder.jpg'    
            />

            <Box className="edit-icon">
              <EditIcon />
            </Box>
          </label>
        </AvatarViewWrapper>

        <Typography sx={{ display: 'none' }} >
          {values.id}
        </Typography>

        <Box
          sx={{
            ml: 4,
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}

          /* sx={{ fontWeight: Fonts.MEDIUM, }} */
          >
            {values.display_name}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}

          >
            {values.user_email}

          </Typography>


        </Box>
      </Box>
      <AppGridContainer spacing={4}>

        {/* {personalInfoData ?<> */}

        <Grid item xs={12} md={6}>
          <AppTextField
            name="display_name"
            fullWidth
            label={<IntlMessages id="common.fullName" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            disabled
            fullWidth
            name="user_login"
            label={<IntlMessages id="common.userName" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name="user_email"
            //value={`values.user_email`}
            fullWidth
            label={<IntlMessages id="common.user_email" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            disabled
            name="user_role"//user_section
            //value={personalInfoData.user_role}
            fullWidth
            label={<IntlMessages id="common.credentials" />}
          />
        </Grid>

        {/* </>: null} */}

        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                position: "relative",
                minWidth: 100,
              }}
              color="primary"
              variant="contained"
              type="submit"
            //onClick={()=>onGoBackToHome()}
            >
              <IntlMessages id="common.saveChanges" />
            </Button>
            <Button
              id="saveButtonId"
              sx={{
                position: "relative",
                minWidth: 100,
                ml: 2.5,
              }}
              color="primary"
              variant="outlined"
            //onClick={()=>onGoBackToHome()}
            >
              <IntlMessages id="common.cancel" />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

export default PersonalInfoForm;