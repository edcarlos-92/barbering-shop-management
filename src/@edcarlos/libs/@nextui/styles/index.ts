import { createTheme } from "@nextui-org/react"
import defaultConfig,{ textLight,textDark } from '@edcarlos/utility/AppContextProvider/defaultConfig';

// 2. Call `createTheme` and pass your custom values
export const lightTheme = createTheme({
    type: 'light',
    //theme :{colors: {color:"#111827"}}
    // theme: {
    //   colors: {...textDark}, // optional
    // }
  })
  
export  const darkTheme = createTheme({
    type: 'dark',
    //theme :{colors: {color:"#fff"}}
    // theme: {
    //   colors: {...textLight}, // optional
    // }
  })