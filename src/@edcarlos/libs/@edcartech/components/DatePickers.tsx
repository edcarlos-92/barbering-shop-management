import React from 'react'
//import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";   //@date-io/date-fns

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';









export function DefaultDatePicker(props: any) {
    //const [value, setValue] = React.useState(null);

    const { disable, readOnly, name, label, value, onChange, variant, fieldWidth } = props

    const convertToDefEventPara = (name: any, value: any) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                //variant={variant}
                label={label}
                disabled={disable}
                readOnly={readOnly}
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}
                //onChange={(newValue) => {setValue(newValue);}}
                renderInput={(params) => <TextField variant={variant} fullWidth {...params} />}
            />
        </LocalizationProvider>
    );
}


export function ReadOnlyDatePickers() {
    const [value, setValue] = React.useState(null);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label='read-only'
                readOnly
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}




/*
export function DatePickers(props:any) {

    const { name, label, value, onChange } = props

    const convertToDefEventPara = (name:any, value:any) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}
                //TextFieldComponent={ReadOnlyTrue}

            />
        </MuiPickersUtilsProvider>
    )
}
const ReadOnlyFalse = (props:any) => {
    return <KeyboardDatePicker {...props} disabled={true} />
  }
export function DatePickerReadOnly(props:any) {

    const { name, label, value, onChange } = props

    const convertToDefEventPara = (name:any, value:any) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}
                TextFieldComponent={ReadOnlyFalse}

            />
        </MuiPickersUtilsProvider>
    )
}
*/






