import React from 'react'
import { Button, Fab, makeStyles } from '@mui/material';
//import {EdcarlosTheme} from '../../../../types/AppContextPropsType';
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';

const classes = {
    root: {
        minWidth: 0,
        margin: '0.5em',// defaultTheme.theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: defaultTheme.theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: defaultTheme.theme.palette.secondary.main,
        }
    },
    primary: {
        backgroundColor: '#000',//theme.palette.primary.light,
        '& .MuiButton-label': {
            color: defaultTheme.theme.palette.primary.main,
        }
    },

    deleteAction: {
        backgroundColor: defaultTheme.theme.palette.text.lightSecondary,
        '& .MuiButton-label': {
            color: defaultTheme.theme.palette.secondary.main,
        }
    }

}

export default function ActionButton(props: any) {

    const { children, onClick, color, size, ariaLabel, className, sx, classes } = props;
    //const classes = useStyles();

    return (
        <Fab
            //className={`${classes.root} ${props.color} `}//classes[color]
            //className={`${classes.root} ${color}`}
            //className={`${classes.root} ${color}`}
            classes={classes}
            //className={className}
            sx={sx}
            onClick={onClick}
            size='small'
            color={color}
            aria-label='add'
        >
            {children}
        </Fab>

    )
}
