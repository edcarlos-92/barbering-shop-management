import React from "react";
import Button from "@mui/material/Button";
import { Checkbox, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";

import AppInfoView from "@edcarlos/core/AppInfoView";
import Box from "@mui/material/Box";
import IntlMessages from "@edcarlos/utility/IntlMessages";
import { useIntl } from "react-intl";
import AppTextField from "@edcarlos/core/AppFormComponents/AppTextField";
import { useJWTAuthActions } from "@edcarlos/services/auth/jwt-auth/JWTAuthProvider";
import { Fonts } from "../../../shared/constants/AppEnums";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AutoRedirect } from '@edcarlos/libs/@edcartech/components/AutoRedirect'
import Link from "next/link";

import Card from "@mui/material/Card";
import AppAnimate from "../../../@edcarlos/core/AppAnimate";
import IconButton from "@mui/material/IconButton";
import Home from "@mui/icons-material/Home"
import HomeMaxOutlined from "@mui/icons-material/HomeMaxOutlined"
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { grey } from "@mui/material/colors";
import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { AccountCircle, Key, Password } from "@mui/icons-material";







/*
const validationSchema = yup.object({
    //email: yup.string().email('Invalid Email').required('Email required'),
    username: yup.string().required('Username required'),
    password: yup.string().required('Password required'),
  });
*/


const SigninJwtAuth = () => {
    const { messages } = useIntl();
    const router = useRouter();
    const { signInUser } = useJWTAuthActions();
    const onGoToForgetPassword = () => { router.push("/forget-password"); };

    const validationSchema = yup.object({
        // email: yup
        //     .string()
        //     .email(String(<IntlMessages id="validation.emailFormat"/>))
        //     .required(String(<IntlMessages id="validation.emailRequired"/>)),
        // validation.passwordRequired  validation.usernameRequired
        password: yup
            .string()
            .required(String(messages["validation.passwordRequired"])),

        username: yup
            .string()
            .required(String(messages["validation.usernameRequired"])),

    });






    return (

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
                <Formik
                    validateOnChange={true}
                    initialValues={{
                        username: "",//"",carlos
                        password: "",//"",123
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        //console.log(`On Submit`, data.username +' '+data.password)
                        setSubmitting(true);
                        signInUser({ username: data.username, password: data.password, });
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (

                        <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                            <Box sx={{ mb: { xs: 5, xl: 8 } }} >
                                <AppTextField
                                    //placeholder={messages["common.username"] as string}
                                    name="username"
                                    label={<IntlMessages id="common.username" />}
                                    variant="outlined"
                                    sx={{
                                        width: "100%",
                                        "& .MuiInputBase-input": {
                                            fontSize: 14,
                                        },
                                    }}

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <Key />
                                            </InputAdornment>
                                        ),
                                    }}


                                //className="border-none focus:ring-0"
                                // className="shadow border rounded py-2 px form-input mt-t block w-full  focus:ring outline-none text-black"
                                />
                            </Box>

                            <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                                <AppTextField
                                    type="password"
                                    //placeholder={messages["common.password"] as string}
                                    label={<IntlMessages id="common.password" />}
                                    name="password"
                                    variant="outlined"
                                    sx={{
                                        width: "100%",
                                        "& .MuiInputBase-input": {
                                            fontSize: 14,
                                        },
                                    }}

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <Password />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    mb: { xs: 3, xl: 4 },
                                }}
                            >


                                {/* <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Checkbox color="primary" sx={{ml: -3}}/>
                                    <Box
                                        component="span"
                                        sx={{
                                            color: "grey.500",
                                        }}
                                    >
                                        <IntlMessages id="common.rememberMe"/>
                                    </Box>
                                </Box> */}

                                <Box
                                    component="span"
                                    sx={{
                                        color: (theme) => theme.palette.primary.main,
                                        fontWeight: Fonts.MEDIUM,
                                        cursor: "pointer",
                                        display: "block",
                                        textAlign: "right",
                                    }}
                                    onClick={onGoToForgetPassword}
                                >
                                    <IntlMessages id="common.forgetPassword" />
                                </Box>



                            </Box>

                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                    sx={{
                                        minWidth: 260,
                                        fontWeight: Fonts.REGULAR,
                                        fontSize: 16,
                                        textTransform: "capitalize",
                                        padding: "4px 16px 8px",
                                    }}
                                >
                                    <IntlMessages id="common.login" />
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Box>

            <Box
                sx={{
                    color: "grey.500",
                }}
            >
                <span style={{ marginRight: 4 }}>
                    <IntlMessages id="common.dontHaveAccount" />
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
                    <a onClick={() => { router.push("/signup") }}>
                        <IntlMessages id="common.signup" />
                    </a>
                </Box>
            </Box>



            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <IconButton
                    sx={{
                        pt: 5,
                        "& svg": { fontSize: 20 },
                        color: (theme) => theme.palette.text.secondary,
                    }}
                    onClick={() => router.push("/")}
                >
                    <Home />
                    {/* <AiOutlineGoogle /> */}
                    {/* <Home fill="currentColor" /> */}
                </IconButton>
            </Box>

            <AppInfoView />
            <ToastContainer />
            {/* <AutoRedirect Seconds={10}  URL='/safety/displayscoreboard' Active={false} /> */}
        </Box>

    );
};

export default SigninJwtAuth;
