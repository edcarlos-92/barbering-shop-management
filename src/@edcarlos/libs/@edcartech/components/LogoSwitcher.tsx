import React from 'react'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, MoonIcon, SunIcon, XIcon } from '@heroicons/react/outline'
import { LoginIcon } from '@heroicons/react/solid'
import { AnnotationIcon, LockClosedIcon, EyeIcon } from '@heroicons/react/outline'
import { navigation } from 'shared/constants/AppConst'
import ThemeSwitcher, { ThemeSwitcherNextUI } from './ThemeSwitcher'
import { Button, Grid, Image, Link } from "@nextui-org/react";
import { useEventListener } from '@edcarlos/utility/hooks'
import { useRouter } from 'next/router'
import { useThemeActionsContext, useThemeContext, } from "@edcarlos/utility/AppContextProvider/ThemeContextProvider";
import { useSidebarActionsContext } from "@edcarlos/utility/AppContextProvider/SidebarContextProvider";
import { DarkSidebar, LightSidebar, } from "@edcarlos/utility/AppContextProvider/defaultConfig";
import { ThemeMode } from "shared/constants/AppEnums";



export function DashboardLogoSwitcher(props) {
  const { theWidth } = props

  const { updateThemeMode } = useThemeActionsContext();
  const { updateSidebarColorSet } = useSidebarActionsContext();
  const { themeMode, theme } = useThemeContext();
  //-----------------------------------------------------------------
  let contexTheme = window.localStorage.getItem('theme');
  //let contexTheme = window.localStorage.getItem('data-theme');
  const [getTheme, setTheme] = useState(contexTheme);
  const router = useRouter()


  const handler = useCallback(({ anything }) => {
    let dataContexTheme = window.localStorage.getItem('theme');
    //let dataContexTheme = window.localStorage.getItem('data-theme');

    setTheme(dataContexTheme);
    //setTheme(dataContexTheme = 'dark' ? 'light' : 'dark' );
    console.log(`handler contexTheme`, getTheme);
  },
    [getTheme]
  );
  // Add event listener using the hook
  //useEventListener('load', handler);
  useEventListener('click', handler);
  //onModeChange(getTheme);

  // useEffect(()=>{
  //   console.log(`Load getTheme`,getTheme);
  //   console.log(`Load contexTheme`,contexTheme);
  //   console.log(`Load dataContexTheme`,dataContexTheme);        
  //     getTheme === 'light' 
  //     ?   
  //     <Image width={theWidth}  /*height={65}*/  src="/logo-long-dark.png"  alt="MAC-TECH Image"  objectFit="scale-down" />
  //     :         
  //     <Image   width={theWidth}   /*height={65}*/  src="/logo-long-dark.png"  alt="MAC-TECH Image" objectFit="scale-down" />

  //   })




  return (

    <span onClick={() => { router.push('/') }} >
      {
        getTheme === 'light'
          ?
          <Image width={theWidth}  /*height={65}*/ src="/logo-long-dark.png" alt="MAC-TECH Image" objectFit="scale-down" />
          :
          <Image width={theWidth}   /*height={65}*/ src="/logo-long-light.png" alt="MAC-TECH Image" objectFit="scale-down" />
      }
    </span>

  )
}
