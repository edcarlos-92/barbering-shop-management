import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useLayoutContext } from "@edcarlos/utility/AppContextProvider/LayoutContextProvider";
import Typography from "@mui/material/Typography";
import FooterWrapper from "./FooterWrapper";
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';
import { useRouter } from 'next/router'
import { frontEndSiteInfo, homeUrl, pageInformation } from "shared/constants/AppConst";
import Home from '@mui/icons-material/Home'

const AppFixedFooter = () => {
  const { footer, footerType } = useLayoutContext();
  const router = useRouter();

  const { siteHomeLink } = frontEndSiteInfo;

  return (
    <>
      {footer && footerType === "fixed" ? (
        <FooterWrapper className="footer fixed-footer">
          <div className="footerContainer">
            <Typography>
              {defaultTheme.theme.palette.footerText.leftText}
            </Typography>
            <Box sx={{ ml: "auto" }}>
              {/* <Button color="primary" onClick={() => router.push(siteHomeLink)}>
                {defaultTheme.theme.palette.footerText.rightText}
              </Button> */}
              <span onClick={() => { router.push('/') }}>
                <Button color="primary" >
                  {defaultTheme.theme.palette.footerText.rightText}
                </Button>
                {/* {` `} {pageInformation.pageFooterRightText} */}
              </span>

            </Box>
          </div>
        </FooterWrapper>
      ) : null}
    </>
  );
};

export default AppFixedFooter;
