import * as React from 'react';
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';

export default function Buttons(props: any) {

    const { sx, text, size, color, variant, onClick, ...other } = props

    return (

        <Button
            variant={variant || "outlined"}
            //size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            sx={sx}
            {...other}
        >
            {text}
        </Button>
    )
}
