import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

export default function Select(props:any) {

    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map((item:any) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.display_name}
                        </MenuItem>
                        )
                    )
                }
                {/* display_name */}
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}



export  function SectionSelect(props:any) {

    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map((item:any) => (
                        <MenuItem key={item.id} value={item.id}> {item.dept_name} </MenuItem>
                        )
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}


export  function UserSelect(props:any) {

    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map((item:any) => (
                        <MenuItem key={item.id} value={item.id}> {item.display_name} </MenuItem>
                        )
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
