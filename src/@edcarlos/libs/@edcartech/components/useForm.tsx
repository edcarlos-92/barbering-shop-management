import React, { useState } from 'react'
//import { makeStyles } from "@material-ui/core";
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';
import Box from '@mui/material/Box';
import AppGridContainer from '@edcarlos/core/AppGridContainer';
//import Form from '@mui/material/FormControl'
//import { Form } from "formik";


export function useForm(initialFValues: any, validateOnChange = false, validate: any) {

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState<any>({});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }
    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}



// const classes ={
//     root: {
//         '& .MuiFormControl-root': {
//             width: '80%',
//             margin:'1em',// defaultTheme.theme.spacing(1)
//         }
//     }
// }

export function Forms(props: any) {

    const { children, width, ...other } = props;
    return (

        <form
            style={{ width: width }}
            noValidate
            autoComplete="off"
            {...other}
        >
            <Box mb={2}>
                <AppGridContainer spacing={4}>
                    {props.children}
                </AppGridContainer>
            </Box>
        </form>


        /*
        <form 
            className={classes.root} 
            autoComplete="off" 
            {...other}>
            {props.children}
        </form>
        */
    )
}

