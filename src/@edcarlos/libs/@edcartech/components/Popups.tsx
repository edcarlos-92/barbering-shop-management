import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@mui/material';
import Controls from "./Controls/Controls";
import CloseIcon from '@mui/icons-material/Close';
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
//import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
//import DialogTitle from '@mui/material/DialogTitle';





const styleClasses = {
    dialogTitle: {
        paddingRight: '0px'
    }
}



const StyledDialog = styled(Dialog)(({ theme }) => ({
    PaperProps: {
        padding: '2em',// defaultTheme.theme.spacing(2),
        position: 'absolute',
        top: '5em',// defaultTheme.theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
    /*
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    */

}));

const popUpAction = {
    // borderRadius:'5px',
    // height: 10,
    // lineHeight: '10px',
    // verticalAlign: 'middle',
    // width: 21,
    // minHeight: '24px',  
    marginRight: "10px",
    backgroundColor: defaultTheme.theme.palette.iconColors.deleteBackground,
    color: defaultTheme.theme.palette.iconColors.deleteFontColor
}

export function FormPopup(props: any) {

    const { title, children, openPopup, setOpenPopup, maxWidth, closeText } = props;
    //const classes = useStyles();

    return (
        <StyledDialog open={openPopup} maxWidth={maxWidth} >
            <DialogTitle sx={styleClasses.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h2" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        //color="secondary"
                        sx={{ ...popUpAction }}
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            {/* <DialogActions >
                    <Controls.Button
                        //text={closeText}
                        //color="secondary"
                        //onClick={()=>{setOpenPopup(false)}} 
                    />
                </DialogActions> */}
        </StyledDialog>
    )
}





export function FormPopupWAButton(props: any) {

    const { title, children, openPopup, setOpenPopup, maxWidth, closeText } = props;
    //const classes = useStyles();

    return (
        <StyledDialog open={openPopup} maxWidth={maxWidth} >
            <DialogTitle sx={styleClasses.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h2" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        //color="secondary"
                        sx={{ ...popUpAction }}
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions >
                <Controls.Button
                    text={closeText}
                    //color="secondary"
                    onClick={() => { setOpenPopup(false) }}
                />
            </DialogActions>
        </StyledDialog>
    )
}


/*
'xs'
| 'sm'
| 'md'
| 'lg'
| 'xl'
| false
| string
*/




/*
export function PopupMd(props:any) {

    const { title, children, openPopup, setOpenPopup } = props;
    //const classes = useStyles();

    return (
        <StyledDialog open={openPopup} maxWidth="md"  >
            <DialogTitle sx={styleClasses.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </StyledDialog>
    )
}


export function PopupXs(props:any) {

    const { title, children, openPopup, setOpenPopup } = props;
    //const classes = useStyles();

    return (
        <StyledDialog open={openPopup} maxWidth="xs" >
            <DialogTitle sx={styleClasses.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        //sx={{...popUpAction}}
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </StyledDialog>
    )
}
*/



