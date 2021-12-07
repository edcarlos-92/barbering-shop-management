import React from "react";
import Box from "@mui/material/Box";
import AuthWrapper from "../AuthWrapper";
//import SigninFirebase from "./SigninFirebase";
import SigninJwtAuth from "./SigninJwtAuth"
import AppLogo, { SystemLogo, LoginImage } from "@edcarlos/core/AppLayout/components/AppLogo";
import { DashboardLogoSwitcher } from "@edcarlos/libs/@edcartech/components/LogoSwitcher";
//import apis from '../../../pages/api/'


const Signin = () => {
  return (
    <AuthWrapper>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          {/* <SystemLogo/> */}
          <DashboardLogoSwitcher theWidth={250} />
        </Box>
        <SigninJwtAuth />
        {/* <SigninFirebase /> */}
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
