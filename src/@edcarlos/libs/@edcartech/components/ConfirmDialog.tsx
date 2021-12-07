import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton, Box, Grid } from '@mui/material'
import Controls from "./Controls/Controls";
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { styled } from '@mui/material/styles';
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';
import Button from "@mui/material/Button";

const classes = {

    // dialogTitle: {
    //     //textAlign: 'center'
    //     //justifyContent: 'center'
    // },
    // dialogContent: {
    //     //margin:'auto',
    //     //textAlign: 'center'
    //     //justifyContent: 'center',
    //     //textWrap:'',
    //     //direction:"column",
    //     //alignItems:"center",
    // },
    // dialogAction: {
    //     //justifyContent: 'center'
    // },
    titleIcon: {
        //backgroundColor: theme.palette.secondary.light,
        backgroundColor: '#f7f7f7',//'#f3f1f1',
        color: defaultTheme.theme.palette.secondary.main,
        '&:hover': {
            //backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        },
        // justifyContent: 'center',
        // align:'center',
        //marginLeft:'30px',
        //alignItems: "center",
        //margin:'auto',
    }
}


const styleClasses = {
    dialogTitle: {
        paddingRight: '0px'
    }
}



const StyledDialog = styled(Dialog)(({ theme }) => ({
    PaperProps: {
        //padding:'2em',// defaultTheme.theme.spacing(2),
        //position: 'absolute',
        //top:'5em',// defaultTheme.theme.spacing(5)
        alignItems: 'center',
        justifyContent: 'center'
    },
}));



export default function ConfirmDialog(props: any) {

    const { confirmDialog, setConfirmDialog, maxWidth, confirmNo, confirmYes, displayIcon } = props;
    //const classes = useStyles()

    return (
        <StyledDialog open={confirmDialog.isOpen} maxWidth={maxWidth} >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            //style={{ minHeight: '100vh' }}
            >
                <DialogTitle>
                    <IconButton disableRipple sx={classes.titleIcon}>
                        {displayIcon || <NotListedLocationIcon />}
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h2">
                        {confirmDialog.title}
                    </Typography>
                    <Typography variant="h5">
                        {confirmDialog.subTitle}
                    </Typography>
                </DialogContent>
                <DialogActions >
                    <Controls.Button
                        text={confirmNo || 'No'}
                        color="inherit"
                        onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    />
                    <Controls.Button
                        text={confirmYes || "Yes"}
                        color="secondary"
                        onClick={confirmDialog.onConfirm}
                    />
                </DialogActions>

            </Grid>
        </StyledDialog>
    )
}
