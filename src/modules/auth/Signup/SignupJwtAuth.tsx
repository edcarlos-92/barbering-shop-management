import React from "react";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import AppInfoView from "@edcarlos/core/AppInfoView";
import Box from "@mui/material/Box";
import IntlMessages from "@edcarlos/utility/IntlMessages";
import AppTextField from "@edcarlos/core/AppFormComponents/AppTextField";
import { Fonts } from "../../../shared/constants/AppEnums";
import Link from "next/link";
import { useJWTAuthActions } from "@edcarlos/services/auth/jwt-auth/JWTAuthProvider";
import { useIntl } from "react-intl";





const SignupJwtAuth = () => {
  const { messages } = useIntl();

  const { signUpUser } = useJWTAuthActions();




  const validationSchema = yup.object({
    name: yup
      .string()
      //.required(String(<IntlMessages id="validation.nameRequired" />)),
      .required(String(messages["validation.nameRequired"])),
    email: yup
      .string()
      .email(String(<IntlMessages id="validation.emailFormat" />))
      //.required(String(<IntlMessages id="validation.emailRequired" />)),
      .required(String(messages["validation.emailFormat"])),
    password: yup
      .string()
      //.required(String(<IntlMessages id="validation.passwordRequired" />)),
      .required(String(messages["validation.passwordRequired"])),
  });


  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            signUpUser({
              user_email: data.email,
              password: data.password,
              name: data.name,
            });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
              <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                <AppTextField
                  label={<IntlMessages id="common.name" />}
                  name="name"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                <AppTextField
                  label={<IntlMessages id="common.email" />}
                  name="email"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                <AppTextField
                  label={<IntlMessages id="common.password" />}
                  name="password"
                  type="password"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    sx={{
                      ml: -3,
                    }}
                  />
                  <Box
                    component="span"
                    sx={{
                      mr: 2,
                      color: "grey.500",
                    }}
                  >
                    <IntlMessages id="common.iAgreeTo" />
                  </Box>
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    cursor: "pointer",
                  }}
                >
                  <IntlMessages id="common.termConditions" />
                </Box>
              </Box>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: "capitalize",
                    padding: "4px 16px 8px",
                  }}
                  type="submit"
                >
                  <IntlMessages id="common.signup" />
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
          <IntlMessages id="common.alreadyHaveAccount" />
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
          <a href="/signin">
            <IntlMessages id="common.signIn" />
          </a>

          {/* <NextLink href={`${siteHomeLink}/admin/users`} passHref>
              <Button size="small" color="primary">
                <IntlMessages id="ecom.viewusers"/>
              </Button>
          </NextLink> */}

        </Box>
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SignupJwtAuth;
