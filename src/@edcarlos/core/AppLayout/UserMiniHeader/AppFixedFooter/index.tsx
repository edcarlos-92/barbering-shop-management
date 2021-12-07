import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useLayoutContext } from "../../../../utility/AppContextProvider/LayoutContextProvider";
import Typography from "@mui/material/Typography";
import FooterWrapper from "./FooterWrapper";
import { defaultTheme } from '../../../../utility/AppContextProvider/defaultConfig';
import { useRouter } from 'next/router'
import { frontEndSiteInfo } from "shared/constants/AppConst";


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
              <Button color="primary" onClick={() => router.push(siteHomeLink)} >
                {defaultTheme.theme.palette.footerText.rightText}
              </Button>
            </Box>
          </div>
        </FooterWrapper>
      ) : null}
    </>
  );
};

export default AppFixedFooter;
