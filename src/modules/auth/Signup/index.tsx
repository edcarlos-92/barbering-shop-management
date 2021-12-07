import React from "react";
import Box from "@mui/material/Box";
import AuthWrapper from "../AuthWrapper";
import SignupFirebase from "./SignupFirebase";
import AppLogo, { SystemLogo } from "@edcarlos/core/AppLayout/components/AppLogo";
import SigninJwtAuth from "../Signin/SigninJwtAuth";
import SignupJwtAuth from "./SignupJwtAuth";
import { DashboardLogoSwitcher } from "@edcarlos/libs/@edcartech/components/LogoSwitcher";

const Signup = () => {
  return (
    <AuthWrapper>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <DashboardLogoSwitcher theWidth={250} />
          </Box>
        </Box>
        <SignupJwtAuth />
      </Box>
    </AuthWrapper>
  );
};

export default Signup;