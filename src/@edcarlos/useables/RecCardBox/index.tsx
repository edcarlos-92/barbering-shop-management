import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import AppCard from '@edcarlos/core/AppCard';
import { Fonts } from 'shared/constants/AppEnums';


export default function RecCardBox(props) {
  //const SalesState: React.FC<SalesStateProps> = (props) => {
  const { bgColor, icon, title, value, textColor, fontWeight } = props;

  return (
    <AppCard
      sxStyle={{
        backgroundColor: bgColor,
        height: 1,
      }}
      className='card-hover'
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {icon &&

          <Box
            sx={{
              mr: 4,
              alignSelf: 'flex-start',
              '& img': {
                display: 'block',
                //width: {xs: 'auto', lg: 50, xl: 'auto'},
                width: { xs: 50, lg: 50, xl: 50 },
              },
            }}
          >
            <img src={`/assets/images/dashboard/${icon}.svg`} alt='icon' />
          </Box>
        }
        <Box
          sx={{
            flex: 1,
            color: 'white',
          }}
        >
          <Typography
            component='h3'
            variant='inherit'
            sx={{
              fontSize: 20,
              color: textColor,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {value}
          </Typography>
          <Box
            sx={{
              mt: 0.5,
              color: textColor,
              fontWeight: fontWeight,
            }}
            component='p'
          >
            {title}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

//export default SalesState;


export function RecCardBoxAlt(props) {
  //const SalesState: React.FC<SalesStateProps> = (props) => {
  const { bgColor, icon, title, value, textColor, fontWeight, alignment } = props;

  return (
    <AppCard
      sxStyle={{
        backgroundColor: bgColor,
        height: 1,
        alignItems: alignment || 'center',
      }}
    >
      {/* <Box> */}
      {icon &&
        <Box
          sx={{
            mr: 4,
            alignSelf: 'flex-start',
            '& img': {
              display: 'block',
              //width: {xs: 'auto', lg: 50, xl: 'auto'},
              width: { xs: 50, lg: 50, xl: 50 },
            },
          }}
        >
          <img src={`/assets/images/dashboard/${icon}.svg`} alt='icon' />
        </Box>
      }



      {/* <Box
        sx={{
          flex: 1,
          color: 'white',
        }}
      > */}
      <span
        style={{
          //mt: 0.5,
          color: textColor,
          fontWeight: fontWeight,
        }}
      >
        {title}
      </span>
      <br></br>
      <span
        //component='h3'
        //variant='inherit'
        style={{
          fontSize: 20,
          color: textColor,
          fontWeight: Fonts.SEMI_BOLD,
        }}
      >
        {value}
      </span>
      {/* </Box> */}
      {/* </Box> */}
    </AppCard>
  );
};



export function RecCardBoxTW(props) {

  const { bgColor, title, value, titleSize, valueSize, alignment, titleColor, valueColor, titleFontWeight, valueFontWeight, titleAlign, valueAlign, } = props;

  return (
    <AppCard
      sxStyle={{
        backgroundColor: bgColor,
        height: 1,
        alignItems: alignment || 'center',
      }}
    >
      <div className={`card-section`}>
        {/* text-lg font-extrabold text-center text-md font-medium    text-center mt-1 leading-6 text-gray-500*/}
        {title && <dt className={`text-${titleSize || 'md'} font-${titleFontWeight || 'medium'}    text-center  text-${titleColor}  mt-1 leading-6`}>{title}</dt>}
        {value && <dt className={`text-${valueSize || 'lg'} font-${valueFontWeight || 'extrabold'}  text-center text-${valueColor}`}>{value}</dt>}
      </div>

    </AppCard>
  );
};



// export function RecCardBoxTW(props) {
//   const { bgColor, icon, title, value, textColor, fontWeight, alignment } = props;
//   return (
//     <div className="card-section">
//       <dt className="order-1 text-lg font-extrabold text-center ">{title}</dt>
//       <dt className="order-2 mt-1 text-md leading-6 font-medium text-gray-500 text-center">{value}</dt>
//     </div>
//   )
// }
