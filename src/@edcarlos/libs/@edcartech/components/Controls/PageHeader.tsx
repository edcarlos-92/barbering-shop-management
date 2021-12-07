import React from 'react'
import { Paper, Card, Typography, Box } from '@mui/material'//Button
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';


const classes = {
    root: {
        backgroundColor: 'none'
    },
    pageHeader: {
        //padding:'4em',//defaultTheme.theme.spacing(4),
        display: 'flex',
        paddingBottom: '20px'
        //marginBottom:'2em',//defaultTheme.theme.spacing(2)
    },
    pageIcon: {
        //display:'inline-block',
        //padding:'2em',//defaultTheme.theme.spacing(2),
        color: defaultTheme.theme.palette.primary.main,
        //color:'#3c44b1',
        //background:'#F4F7FE',
        background: 'transparent',
        boxShadow: 'none'
    },
    pageTitle: {
        //paddingLeft:'4em',//defaultTheme.theme.spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    }
}

export default function PageHeader(props: any) {

    //const classes = useStyles();
    const { title, subTitle, icon, sx } = props;
    return (
        // <Paper elevation={0} square sx={sx}>
        <Box sx={classes.pageHeader}>
            <span style={classes.pageIcon}>
                {icon}
            </span>
            <Box sx={classes.pageTitle}>
                <Typography
                    variant="h4"
                    component="div"
                    sx={{
                        color: (theme) => theme.palette.text.secondary,
                        fontWeight: 'bold'
                    }}

                >
                    {title}
                </Typography>
                <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                        color: (theme) => theme.palette.text.secondary,
                    }}
                >
                    {subTitle}
                </Typography>
            </Box>
        </Box>
        //     </Paper>
    )
}
