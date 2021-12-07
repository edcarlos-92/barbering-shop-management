import {
  Fonts,
  FooterType,
  HeaderType,
  LayoutDirection,
  LayoutType,
  MenuStyle,
  NavStyle,
  RouteTransition,
  ThemeMode,
  ThemeStyle,
  ThemeStyleRadius,
} from "shared/constants/AppEnums";
import { pageInformation } from "shared/constants/AppConst";
import Home from '@mui/icons-material/Home'
import Globe from '@heroicons/react/outline/GlobeIcon'

let currentTheme: any = ThemeMode.LIGHT;
if (typeof window !== "undefined") {
  // browser code
  //currentTheme = window.localStorage.getItem('data-theme');
  currentTheme = window.localStorage.getItem('theme');
}


export const textLight = {
  primary: "rgb(17, 24, 39)",
  //primary: "#fff",
  secondary: "rgb(107, 114, 128)",
  disabled: "rgb(149, 156, 169)",
};

export const textDark = {
  primary: "rgb(255,255,255)",
  secondary: "rgb(229, 231, 235)",
  disabled: "rgb(156, 163, 175)",
};

export const backgroundDark = {
  paper: "#2B3137",
  default: "#1F2527",
};

export const backgroundLight = {
  paper: "#FFFFFF",
  default: "#F4F7FE",
};

const cardRadius = ThemeStyleRadius.STANDARD;


export const defaultTheme: any = {
  theme: {
    spacing: 4,
    cardRadius: cardRadius,
    direction: LayoutDirection.LTR, //ltr, rtl
    palette: {
      mode: ThemeMode.LIGHT,
      background: {
        paper: "#FFFFFF",
        default: "#F4F7FE",
      },
      primary: {
        main: "#0A8FDC",
        contrastText: "#fff",
        mainLight: '#f7fbfc',
      },
      secondary: {
        main: '#f50057',//#f50057 #f50057
        annex: "#F04F47",
      },
      success: {
        main: "#11C15B",
        light: "#D9F5E5",
      },
      warning: {
        main: "#FF5252",
        light: "#FFECDC",
        semiLight: '#fff6dc',
        semiLightColor: '#f57d7d'
      },
      iconColors: {
        editBackground: '#dcfadc !important',
        editFontColor: '#026102 !important',
        deleteBackground: '#f5005725',
        deleteFontColor: '#f50057',
        viewBackground: '#d2eaf7',
        viewFontColor: '#036299'
      },
      text: textLight,
      gray: {
        50: "#fafafa",
        100: "#F5F6FA",
        200: "#edf2f7",
        300: "#E0E0E0",
        400: "#c5c6cb",
        500: "#A8A8A8",
        600: "#666666",
        700: "#4a5568",
        800: "#201e21",
        900: "#1a202c",
        A100: "#d5d5d5",
        A200: "#aaaaaa",
        A400: "#303030",
        A700: "#616161",
      },

      customBlue: {
        50: '#e3f2fd',
        100: '#bbdefb',
        200: '#90caf9',
        300: '#64b5f6',
        400: '#42a5f5',
        500: '#2196f3',
        600: '#1e88e5',
        700: '#1976d2',
        800: '#1565c0',
        900: '#0d47a1',
        A100: '#82b1ff',
        A200: '#448aff',
        A400: '#2979ff',
        A700: '#2962ff',
        contrastDefaultColor: 'light',
      },



      back: {
        primary: '#495057',
        secondary: '#74788d',
        disabled: '#909098',
        hint: '#aeafb8',
        white: '#fff',
        lightSecondary: '#f5005725',
        editBack: '#dcfadc'
      },

      footerText: {
        leftText: pageInformation.pageFooterLeftText,
        rightText: <Home /> || pageInformation.pageFooterRightText
        //defaultConfig.theme.palette.footerText.leftText  
        //{defaultTheme.theme.palette.footerText.leftText}
        //import {defaultTheme} from '../../../../utility/AppContextProvider/defaultConfig'
      },

    },



    status: {
      danger: "orange",
    },
    divider: "rgba(224, 224, 224, 1)",
    typography: {
      fontFamily: ["Trebuchet MS", "Helvetica Neue", "Helvetica", "Roboto", "Arial", 'sans-serif', 'Poppins'].join(','),//source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
      //fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 400,
      h1: {
        fontSize: 22,
        fontWeight: 600,
      },
      h2: {
        fontSize: 20,
        fontWeight: 500,
      },
      h3: {
        fontSize: 18,
        fontWeight: 500,
      },
      h4: {
        fontSize: 16,
        fontWeight: 500,
      },
      h5: {
        fontSize: 14,
        fontWeight: 500,
      },
      h6: {
        fontSize: 12,
        fontWeight: 500,
      },
      subtitle1: {
        fontSize: 14,
      },
      subtitle2: {
        fontSize: 16,
      },
      body1: {
        fontSize: 14,
      },
      body2: {
        fontSize: 12,
      },
    },
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius,
          },
        },
      },
      MuiCardLg: {
        styleOverrides: {
          root: {
            // apply theme's border-radius instead of component's default
            borderRadius:
              cardRadius === ThemeStyleRadius.STANDARD
                ? ThemeStyleRadius.STANDARD
                : ThemeStyleRadius.MODERN + 20,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius,
            boxShadow: "0px 10px 10px 4px rgba(0, 0, 0, 0.04)",
            "& .MuiCardContent-root:last-of-type": {
              paddingBottom: 16,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius / 2,
            // boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
            textTransform: "capitalize",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius / 2,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: cardRadius / 2,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 9,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontWeight: Fonts.REGULAR,
          },
        },
      },
    },
  },
};

export interface SidebarData {
  //paragraphTextColor:string;
  sidebarBgColor: string;
  sidebarTextColor: string;
  sidebarHeaderColor: string;
  sidebarMenuSelectedBgColor: string;
  sidebarMenuSelectedTextColor: string;
  mode: string;

}

export const DarkSidebar: SidebarData = {
  //paragraphTextColor:"#fff",
  sidebarBgColor: "#313541",
  sidebarTextColor: "#fff",
  sidebarHeaderColor: "#313541",
  sidebarMenuSelectedBgColor: "#F4F7FE",
  //sidebarMenuSelectedTextColor: "rgba(0, 0, 0, 0.87)",
  sidebarMenuSelectedTextColor: "#0a8fdc",
  //mode: ThemeMode.DARK,
  mode: currentTheme,
};
export const LightSidebar: SidebarData = {
  //paragraphTextColor:"#000",
  sidebarBgColor: "#fff",
  sidebarTextColor: "rgba(0, 0, 0, 0.87)",
  sidebarHeaderColor: "#fff",
  sidebarMenuSelectedBgColor: "#FFECDC",//"#FFECDC", fae8ef
  sidebarMenuSelectedTextColor: "#f50057",
  //mode: ThemeMode.LIGHT,
  mode: currentTheme,

};
const defaultConfig = {
  sidebar: {
    borderColor: "#757575",
    menuStyle: MenuStyle.DEFAULT,
    isSidebarBgImage: false,
    sidebarBgImage: 1,
    //colorSet: LightSidebar,
    colorSet: currentTheme === ThemeMode.LIGHT ? LightSidebar : DarkSidebar,
  },
  themeStyle: ThemeStyle.STANDARD,

  //themeMode: ThemeMode.LIGHT,
  themeMode: currentTheme,


  navStyle: NavStyle.HOR_HEADER_FIXED,
  // navStyle: NavStyle.DEFAULT,


  layoutType: LayoutType.FULL_WIDTH,
  footerType: FooterType.FLUID,
  headerType: HeaderType.FIXED,
  rtAnim: RouteTransition.NONE,
  footer: true,
  locale: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "us",
  },
  rtlLocale: ["ar"],
};
export default defaultConfig;
