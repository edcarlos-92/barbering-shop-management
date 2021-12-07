import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useLayoutContext } from "@edcarlos/utility/AppContextProvider/LayoutContextProvider";
import Typography from "@mui/material/Typography";
import FooterWrapper from "./FooterWrapper";
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig'
import { useRouter } from 'next/router'
import { frontEndSiteInfo } from "shared/constants/AppConst";


const AppFooter = () => {
  const { footer, footerType, navStyle } = useLayoutContext();
  const router = useRouter();
  const { siteHomeLink } = frontEndSiteInfo;

  return (
    <>
      {footer &&
        footerType === "fluid" &&
        navStyle !== "h-default" &&
        navStyle !== "hor-light-nav" &&
        navStyle !== "hor-dark-layout" ? (
        <FooterWrapper className="footer">
          <div className="footerContainer">
            <Typography>
              {defaultTheme.theme.palette.footerText.leftText}
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <Button sx={{ px: 5, }} color="primary" onClick={() => router.push(siteHomeLink)}>
                {defaultTheme.theme.palette.footerText.rightText}
              </Button>
            </Box>
          </div>
        </FooterWrapper>
      ) : null}
    </>
  );
};

export default AppFooter;
