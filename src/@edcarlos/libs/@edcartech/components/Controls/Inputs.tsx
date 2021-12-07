import React from 'react'
import TextField from '@mui/material/TextField';
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';

export default function Input(props: any) {
    //const classes = useStyles();
    const { name, label, color, value, margin, type, id, error = null, onChange, size, sx, maxLength, ...other } = props;
    return (
        <TextField
            sx={sx}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            margin={margin}//'normal'
            type={type}//'search'
            id={id}//'standard-search'
            //size= {'small' || size}
            color={color}
            size={size} //Normal small
            onChange={onChange}
            inputProps={{ maxLength: maxLength }}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}
