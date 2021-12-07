import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { SunIcon as SunIconS } from '@heroicons/react/solid'
import { useTheme as useNextTheme } from 'next-themes'
import { changeTheme, getDocumentTheme, Switch, useTheme as useNextUITheme } from '@nextui-org/react'
// 4. Use `changeTheme` method to control theme changing
import defaultConfig, { backgroundDark, backgroundLight, defaultTheme, textDark, textLight, } from "@edcarlos/utility/AppContextProvider/defaultConfig";
//Dashboard Theme Switcher
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import clsx from "clsx";
//import { CustomizerItemWrapper, StyledToggleButton } from "../index.style";
import IntlMessages from "@edcarlos/utility/IntlMessages";
import { ThemeMode } from "shared/constants/AppEnums";
import { useThemeActionsContext, useThemeContext, } from "@edcarlos/utility/AppContextProvider/ThemeContextProvider";
import { useSidebarActionsContext } from "@edcarlos/utility/AppContextProvider/SidebarContextProvider";
import { DarkSidebar, LightSidebar, } from "@edcarlos/utility/AppContextProvider/defaultConfig";
//Dashboard Theme Switcher







export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const handleSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');

    //const currentTheme:any = theme === 'light' ?'dark'  : 'light' ;
    //let contexTheme = window.localStorage.getItem('theme');
    //window.localStorage.setItem('data-theme',currentTheme );
    //window.localStorage.setItem('theme',currentTheme );
    //window.localStorage.setItem('dash-theme',currentTheme );
  }
  return (
    <div className="flex-shrink-0 pl-3 ">
      <a
        onClick={handleSwitch}
        type="button"
        className=" p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
        <span className="sr-only">Switch Themes</span>
        {theme === 'dark' ? <SunIcon className="h-6 w-6" aria-hidden="true" /> : <MoonIcon className="h-6 w-6" aria-hidden="true" />}
      </a>
    </div>
  )
}

export function DashboardThemeSwitcher() {

  const { theme, setTheme } = useTheme()
  //let contexTheme = window.localStorage.getItem('theme');
  const { updateThemeMode } = useThemeActionsContext();
  const { updateSidebarColorSet } = useSidebarActionsContext();

  useEffect(() => {
    handleSwitch();
  })

  const handleSwitch = () => {

    if (theme) {

      updateThemeMode(theme);
      if (theme === ThemeMode.LIGHT) {

        setTheme(ThemeMode.DARK);
        window.localStorage.setItem('data-theme', ThemeMode.DARK);
        //window.localStorage.setItem('theme', ThemeMode.DARK);

        updateSidebarColorSet({
          //paragraphTextColor:"#000",
          sidebarBgColor: LightSidebar.sidebarBgColor,
          sidebarTextColor: LightSidebar.sidebarTextColor,
          sidebarMenuSelectedBgColor: LightSidebar.sidebarMenuSelectedBgColor,
          sidebarMenuSelectedTextColor: LightSidebar.sidebarMenuSelectedTextColor,
          sidebarHeaderColor: LightSidebar.sidebarHeaderColor,
          mode: "Light",
        });
      } else {

        setTheme(ThemeMode.LIGHT);
        window.localStorage.setItem('data-theme', ThemeMode.LIGHT);
        //window.localStorage.setItem('theme', ThemeMode.LIGHT);

        updateSidebarColorSet({
          //paragraphTextColor:"#fff",
          sidebarBgColor: DarkSidebar.sidebarBgColor,
          sidebarTextColor: DarkSidebar.sidebarTextColor,
          sidebarMenuSelectedBgColor: DarkSidebar.sidebarMenuSelectedBgColor,
          sidebarMenuSelectedTextColor: DarkSidebar.sidebarMenuSelectedTextColor,
          sidebarHeaderColor: DarkSidebar.sidebarHeaderColor,
          mode: "Dark",
        });
      }

      //console.log(`....themeMode....`,theme);

    }
  }

  return (
    <div className="flex-shrink-0 pl-3 ">
      <a
        onClick={handleSwitch}
        type="button"
        className=" p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
        <span className="sr-only">Switch Themes</span>
        {theme === 'dark' ? <SunIconS className="h-6 w-6" aria-hidden="true" /> : <SunIconS className="h-6 w-6" aria-hidden="true" />}
        {/* {theme === 'dark' ? <SunIcon className="h-6 w-6" aria-hidden="true" /> : <MoonIcon className="h-6 w-6" aria-hidden="true" />} */}
      </a>
    </div>
  )
}


export function ThemeSwitcherNextUI() {
  const { type, isDark } = useNextUITheme();
  const handleChange = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    window.localStorage.setItem('data-theme', nextTheme); // you can use any storage
    changeTheme(nextTheme);
  }
  return (
    <div>
      {/* The current theme is: {type} */}

      <Switch
        checked={isDark}
        onChange={handleChange}
      />
    </div>
  )
}
