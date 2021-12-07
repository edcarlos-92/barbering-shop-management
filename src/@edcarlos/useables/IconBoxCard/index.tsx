import React from 'react';
//import Avatar from '@material-ui/core/Avatar';
import Box from '@mui/material/Box';//'@material-ui/core/Box';
//'@material-ui/core/styles';
import { Fonts } from '../../../shared/constants/AppEnums';//shared/constants/AppEnums
import AppCard from '../../../@edcarlos/core/AppCard';//@edcarlos/core/AppCard
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { FontAwesomeIconSvgIcons } from '@fortawesome/free-solid-svg-icons'
//import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core'
//import { FaBeer } from 'react-icons/fa';
//import iconPath from  "../../../../public/images/customSvgIcons/"; //faBeer.svg

//var iconPath = '/images/customSvgIcons/';
//import iconPath from "./iconsLib";
import Link from 'next/link';
import { useThemeContext } from '../../../@edcarlos/utility/AppContextProvider/ThemeContextProvider';
import { defaultTheme } from '../../../@edcarlos/utility/AppContextProvider/defaultConfig';//'../../../../@edcarlos/utility/ContextProvider/defaultConfig';


interface IconBoxCardProps {
  icon: any;
  iconHoverDesc: any;
  iconColor: any;
  textLabel: any;
  //iconStyle:any;
  hrefLink: any;
  iconTranslate: any;
  iconviewBox: any;
  iconHeight: any;
  iconWidth: any;
  iconId: any;
}

const IconBoxCard: React.FC<IconBoxCardProps> = ({ icon, iconHoverDesc, iconColor, textLabel, iconHeight, iconWidth, hrefLink, iconTranslate, iconviewBox, iconId }) => {

  const { theme } = useThemeContext();

  const classes: any = {

    root: {
      height: 50,
      width: 50,
    },

    iconStyle: {
      '& path:hover': {
        fill: defaultTheme.secondary.main,
        cursor: "pointer"
      },

      [theme.breakpoints.up('md')]: {
        height: '80%',
        width: '80%',
      },
      [theme.breakpoints.up('lg')]: {
        height: '90%',
        width: '90%',
      },
      [theme.breakpoints.up('xl')]: {
        height: '100%',
        width: '100%',
      },


    },

    textLabelResponsive: {
      '@media (max-width: 499px)': {
        fontSize: '25px'
      }
    },


  }

  return (

    <AppCard height={1} textAlign='center'>

      <Box
        display='flex'
        p={{ xs: 3, xl: 4 }}
        mb={{ xs: 4, md: 5 }}
        mx='auto'
      //clone
      >

        <Link href={hrefLink} >
          <svg
            id={iconId}
            className={classes.iconStyle}
            xmlns="http://www.w3.org/2000/svg"
            width={iconWidth}  //{iconSize}
            height={iconHeight} //{`${iconSize}`}
            viewBox={iconviewBox}   //   "0 0 32 32" //
            aria-labelledby="title"
          ><title id="title">{iconHoverDesc}</title>
            <path transform={`translate(${iconTranslate})`} //4, 5
              fill={iconColor}
              d={icon}   //"M27 14h5c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2v0zM27 14c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2v0 14c0 1.112-0.895 2-2 2-1.112 0-2-0.896-2-2.001v-1.494c0-0.291 0.224-0.505 0.5-0.505 0.268 0 0.5 0.226 0.5 0.505v1.505c0 0.547 0.444 0.991 1 0.991 0.552 0 1-0.451 1-0.991v-14.009c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-5.415 6.671-9.825 15-9.995v-1.506c0-0.283 0.224-0.499 0.5-0.499 0.268 0 0.5 0.224 0.5 0.499v1.506c8.329 0.17 15 4.58 15 9.995h-5z"
            />
          </svg>

        </Link>

      </Box>

      <Box component='h3' fontWeight={Fonts.MEDIUM} fontSize={20} className={classes.textLabelResponsive}>
        {textLabel}
      </Box>
    </AppCard>
  );
};

export default IconBoxCard;



//=======================  Usage in the front end ==============
/*
import iconPath from "../IconLibrary";
let sectionIcon = iconPath[`section`];
import IconBoxCard from './IconBoxCard';

<Grid item xs={12} sm={6} md={3}>
    <IconBoxCard 
      textLabel={<IntlMessages id='arms.administration.sections.label' />}
      hrefLink= '/arms/administration/sections'
      iconColor={defaultConfig.theme.palette.primary.main}    
      //iconSize='80%'
      iconHeight='80%'
      iconWidth='80%'
      iconTranslate='4,5'      //4,5
      iconviewBox='0 0 32 32'
      //iconStyle=''
      iconId='ad-sections'   
      iconHoverDesc='Administration' 
      icon={sectionIcon}            
    />             
</Grid>

*/