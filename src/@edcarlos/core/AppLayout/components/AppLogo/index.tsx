import React from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../../../../utility/AppContextProvider/ThemeContextProvider';
import { alpha } from '@mui/material/styles';
// @ts-ignore
import Logo from '../../../../../assets/icon/logo.svg';
// @ts-ignore
import LogoText from '../../../../../assets/icon/logo_text.svg';

import { Fonts } from 'shared/constants/AppEnums';
import { loginWelcome } from "shared/constants/AppConst";
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';
import { Button, Container } from '@nextui-org/react';
//import { UserIcon,HomeIcon } from '@heroicons/react/solid';
import { Home } from '../../../../libs/@nextui/icons'
import { useRouter } from 'next/router';
import GoHomeBar from '@edcarlos/libs/@edcartech/components/GoHomeBar';
import IntlMessages from '@edcarlos/utility/IntlMessages';


interface AppLogoProps {
  color?: string;
}

const AppLogo: React.FC<AppLogoProps> = () => {
  const { theme } = useThemeContext();

  return (
    <Box
      sx={{
        height: { xs: 56, sm: 70 },
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: { xs: 40, sm: 45 },
        },
      }}
      className='app-logo'
    >
      <Logo />
      <Box
        sx={{
          mt: 1,
          '& svg': {
            height: { xs: 25, sm: 30 },
          },
        }}
      >
        {/* fill={alpha(theme.palette.text.primary, 0.8)} */}
        <LogoText />
      </Box>
    </Box>
  );
};

export default AppLogo;


export function SystemLogo() {

  const imgStyle = {
    imgRoot: {
      cursor: 'pointer',
      display: 'inline-block',
      width: 300,//140
      height: 62,
    },
  };

  return (
    <Box mb={{ xs: 6, md: 8, xl: 18, alignItems: 'center', justifyContent: 'center', }} textAlign='center'>
      <img
        style={imgStyle.imgRoot}
        src={'/assets/images/login-header.png'}
        alt='aeic-logo'
      />
    </Box>
  )
}

export function DashLogo() {

  const imgStyle = {
    imgRoot: {
      cursor: 'pointer',
      //display: 'inline-block',
      width: 250,//140
      //height:50,
    },
  };




  return (
    // <Box>
    <img
      style={imgStyle.imgRoot}
      src={'/assets/images/login-header.png'}
      alt='aeic-logo'
      className=""
    />
    // </Box>
  )
}

export function LoginImage() {

  const imgStyle = {
    imgRoot: {
      cursor: 'pointer',
      //display: 'inline-block',
      width: 450,//140
      //height:50,
    },
  };

  return (
    // <Box>
    <img
      style={imgStyle.imgRoot}
      src={'/assets/images/login-img.svg'}
      alt='login-img'
    />
    // </Box>
  )

}


export function LoginSideText(props) {

  const { loginWelcomeTitle, loginWelcomeDescription } = loginWelcome;
  const router = useRouter();

  return (

    <>
      <Typography
        align='center'
        component="h2"
        sx={{
          fontWeight: Fonts.BOLD,
          fontSize: 20,
          mb: 4,
          //color:'black'
          color: defaultTheme.theme.palette.warning.semiLightColor
          //backgroundColor: defaultTheme.theme.palette.warning.semiLightColor
        }}

      >
        {loginWelcomeTitle}
      </Typography>
      <Typography align='center' color='black' >
        <span style={{ fontWeight: 'bold' }}><IntlMessages id='login.note' />: </span><IntlMessages id='login.loginWelcomeDescription' />


      </Typography>

      {/* <Container gap={0} justify='center' alignItems='center' alignContent='center' >
            <Button 
              icon={<Home fill="currentColor" />} 
              color="error" 
              flat
              onClick={()=>{router.push('/')}}
            >
              Go Home
            </Button>
          </Container> */}

      {/* <GoHomeBar/> */}
    </>

  )
}