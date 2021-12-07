
export const useStyles = {
    fontFamily: ["Trebuchet MS","Helvetica Neue","Helvetica","Roboto", "Arial",'sans-serif','Poppins'].join(','),
    navbar:{
        backgroundColor: '#203040',
        marginBottom:8,
        '& a':{
            color:'#fff',
            marginLeft:10,
        }
       
    },

    brand:{
        fontWeight:'bold',
        fontSize:'1.5rem'
    },

    grow:{
        flexGrow:1 as const,
    },

    navbarLogo:{
        //width: '11rem' as const,/* 176px */
        objectFit: 'contain' as const,
        cursor: 'pointer' as const,
    },
    main:{
        minHeight:'80vh'
    },
    footer:{
        //textAlign:'center'  as const
        marginTop:10,
        textAlign: "center" as "center"
    },
    section:{
        marginTop:10,
        marginBottom:10,
    },

    buttons:{
        type:'light',
        buttonPrimary:{
          backgroundColor:'#f0cc00',
          color:'#000',
          fontWeight:'bold',
          "&:hover": {// &:focus
            backgroundColor:'#db9004',
          },
        },
        buttonSecondary:{
          backgroundColor:'#208080',
          color:'#fff',
          fontWeight:'bold',
          "&:hover": {// &:focus
            backgroundColor:'#203040',
          },
        },
        buttonMain:{
          backgroundColor:'#203040',
          color:'#fff',
          fontWeight:'bold',
          "&:hover": {// &:focus
            backgroundColor:'#208080',
          },
        },
        buttonSucess:{
          backgroundColor:'#11C15B',
          color:'#fff',
          //fontWeight:'bold',
          "&:hover": {
            backgroundColor:'#026102',
          },
        },
        buttonError:{
          backgroundColor:'#f04040',
          color:'#fff',
          fontWeight:'bold',
          "&:hover": {
            backgroundColor:'#f04040',//f50057
          },
        }
    },

    
    alignRight:{
      align:'right' as const
    },

    tableTitle:{
      fontWeight:'bold',
      //textAlign:'center'  as const,
      fontSize:15
    },


    tableTitleCenter:{
      fontWeight:'bold',
      textAlign:'center'  as const,
      fontSize:15
    },

    form:{
        width:'100%',
        maxWidth:450,
        margin:'0 auto'
    },

    navbarButton:{
        color:'#ffffff',
        textTranform:'initial',
       
    },

    activeSteps:{
        backgroundColor:'#203040',
    },

    toTransparentBackground:{
       
    },

    stepIcon: {
        color: "pink" as const
      },

    multiSteperStyle:{
         backgroundColor:'transparent',

         '& MuiStepIcon':{
            backgroundColor: '#000',
         },

         '&$completed': {
            color: '#000',
        },
        '&$active': {
            color: '#000',
        },

    },

    error: {
        color: '#f04040',
      },

      fullWidth: {
        width: '100%',
      },


      reviewForm: {
        maxWidth: 800,
        width: '100%',
      },
      reviewItem: {
        marginRight: '1rem',
        borderRight: '1px #808080 solid',
        paddingRight: '1rem',
      },
      toolbar: {
        justifyContent: 'space-between',
      },
      menuButton: { padding: 2},
      menuFlex:{dispaly:'flex' as const},
      mt1: { marginTop: '1rem' },
      // search
      searchSection: {
        display: 'none',
        // [theme.breakpoints.up('md')]: {
        //   display: 'flex',
        // },
      },
      searchForm: {
        border: '1px solid #ffffff',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        //'& form':{
          //height: '100vh' 
        //}
        
      },
      searchInput: {
        paddingLeft: 5,
        color: '#000000',
        '& ::placeholder': {
          color: '#606060',
        },
      },
      iconButton: {
        backgroundColor: '#208080',//#f8c040  #db9004
        padding: 5,
        height:5,
        borderRadius: '0 5px 5px 0',
        '& span': {
          color: '#000000',
        },
        "&:hover": {
          backgroundColor:'#208080',//208080    db9004
        },
        
      },
      sort: {
        marginRight: 5,
      },
    
      fullContainer: { height: '100vh' },
      mapInputBox: {
        position: 'absolute' as const,
        display: 'flex',
        left: 0,
        right: 0,
        margin: '10px auto',
        width: 300,
        height: 40,
        '& input': {
          width: 250,
        },
      },

      featuredImage:{
        //marginBottom: '1rem'
      },

      swiper: {
        //width: '100%',
        paddingTop: 25,
        paddingBottom: 25,
      },
      swiperSlide:{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: 300,
        height: 300,
      },
      swiperSlideImg: {
        display: 'block',
        width: '100%'
      },

      carousel :{
        height : "295px",
        width : "100%",
        "& img" : {
            height : "295px",
            width: "-webkit-fill-available"
        }
    },

}