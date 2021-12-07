import React from "react";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import clsx from "clsx";
import { CustomizerItemWrapper, StyledToggleButton } from "@edcarlos/core/AppThemeSetting/index.style";
import IntlMessages from "@edcarlos/utility/IntlMessages";
import { ThemeMode } from "shared/constants/AppEnums";
import {
  useThemeActionsContext,
  useThemeContext,
} from "@edcarlos/utility/AppContextProvider/ThemeContextProvider";
import { useSidebarActionsContext } from "@edcarlos/utility/AppContextProvider/SidebarContextProvider";
import {
  DarkSidebar,
  LightSidebar,
} from "@edcarlos/utility/AppContextProvider/defaultConfig";

import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';


const DashboardThemeSwitch = () => {

  const { updateThemeMode } = useThemeActionsContext();
  const { updateSidebarColorSet } = useSidebarActionsContext();
  const { themeMode } = useThemeContext();

  const { theme, setTheme } = useTheme()

  const onModeChange = (event: any, themeMode: string) => {
    if (themeMode) {
      updateThemeMode(themeMode);
      if (themeMode === ThemeMode.LIGHT) {
        console.log(`Toggle Current Theme Mode`, themeMode)
        setTheme(ThemeMode.LIGHT);//Comfirm app Theme State
        window.localStorage.setItem('data-theme', ThemeMode.LIGHT);
        window.localStorage.setItem('theme', ThemeMode.LIGHT);
        updateSidebarColorSet({
          //paragraphTextColor:"#000",
          sidebarBgColor: LightSidebar.sidebarBgColor,
          sidebarTextColor: LightSidebar.sidebarTextColor,
          sidebarMenuSelectedBgColor: LightSidebar.sidebarMenuSelectedBgColor,
          sidebarMenuSelectedTextColor:
            LightSidebar.sidebarMenuSelectedTextColor,
          sidebarHeaderColor: LightSidebar.sidebarHeaderColor,
          mode: "Light",
        });
      } else {
        setTheme(ThemeMode.DARK);//Comfirm app Theme State
        console.log(`Toggle Current Theme Mode`, themeMode)
        window.localStorage.setItem('data-theme', ThemeMode.DARK);
        window.localStorage.setItem('theme', ThemeMode.DARK);
        updateSidebarColorSet({
          //paragraphTextColor:"#fff",
          sidebarBgColor: DarkSidebar.sidebarBgColor,
          sidebarTextColor: DarkSidebar.sidebarTextColor,
          sidebarMenuSelectedBgColor: DarkSidebar.sidebarMenuSelectedBgColor,
          sidebarMenuSelectedTextColor:
            DarkSidebar.sidebarMenuSelectedTextColor,
          sidebarHeaderColor: DarkSidebar.sidebarHeaderColor,
          mode: "Dark",
        });
      }
    }
  };

  return (
    <>
      {/* <Box component="h4" sx={{ mb: 2 }}>
        <IntlMessages id="customizer.themeMode" />
      </Box> */}

      <ToggleButtonGroup
        value={themeMode}
        exclusive
        onChange={onModeChange}
        aria-label="text alignment"
        style={{ marginLeft: '1em', }}
      >
        <StyledToggleButton
          value={ThemeMode.LIGHT}
          className={clsx({
            active: themeMode === ThemeMode.LIGHT,
          })}
          aria-label="right aligned"
        >
          {/* <IntlMessages id="customizer.light" /> */}
          <SunIcon className="h-6 w-6" aria-hidden="true" />
        </StyledToggleButton>



        <StyledToggleButton
          value={ThemeMode.DARK}
          className={clsx({
            active:
              themeMode === ThemeMode.DARK
            //|| theme.palette.type === ThemeMode.DARK,
          })}
          aria-label="centered"
        >
          {/* <IntlMessages id="customizer.dark" /> */}
          <MoonIcon className="h-6 w-6" aria-hidden="true" />
        </StyledToggleButton>


      </ToggleButtonGroup>
    </>
  );
};

export default DashboardThemeSwitch;
