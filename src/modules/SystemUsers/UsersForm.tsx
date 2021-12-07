import React, { useEffect } from 'react' //useState,
import Grid from '@mui/material/Grid';
import Controls from "@edcarlos/libs/@edcartech/components/Controls/Controls";
import { useForm, Forms } from '@edcarlos/libs/@edcartech/components/useForm';
//import * as employeeService from "../../../../services/employeeService";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/store';
//import {getAllUsers} from '../../../../redux/actions';
//import  {UserSelect} from "./DeptCustomComp";
import IntlMessages from '@edcarlos/utility/IntlMessages';
//import { makeStyles } from "@material-ui/core";
import * as yup from "yup";
import { appIntl } from "@edcarlos/utility/helper/Utils";
import { Emailregex } from '@edcarlos/utility/Utils';

//-==========================FORM TEST================================================
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
//import { Form } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import DatePicker from "@mui/lab/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useIntl } from "react-intl";
import AppGridContainer from "@edcarlos/core/AppGridContainer";
import AppTextField from "@edcarlos/core/AppFormComponents/AppTextField";
import { Fonts } from "shared/constants/AppEnums";
import { styled } from "@mui/material/styles";
import { LabelObj, PriorityObj, StaffObj } from "types/models/apps/Todo";

import { DefaultDatePicker } from '@edcarlos/libs/@edcartech/components/DatePickers';
import { RoutePermittedRole, authRole, userRoles } from 'shared/constants/AppConst';


//==========================FROM TEST===================================================
import Paper from '@mui/material/Paper';


/*
const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
*/
//==========================FROM TEST===================================================

const initialFValues = {
  id: 0,
  user_login: '',
  user_email: '',
  user_registered: new Date(),
  user_phone_number: '',
  display_name: '',
  user_role: '',
  user_pass: 'password',
  updated_at: new Date(),
  //avatar:'',
}

export default function UsersForm(props: any) {

  //const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(getAllUsers());
    //getAllUsers(dispatch);
  }, []);

  const { messages } = appIntl();
  const { addOrEdit, recordForEdit } = props

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors }
    if ('user_login' in fieldValues) temp.user_login = fieldValues.user_login.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />
    //if ('user_email' in fieldValues)temp.user_email = fieldValues.user_email.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label'/>
    if ('user_email' in fieldValues) temp.user_email = fieldValues.user_email.length != 0 && Emailregex.test(fieldValues.user_email) === true ? "" : <IntlMessages id='common.invalidmail.label' />;
    if ('user_phone_number' in fieldValues) temp.user_phone_number = fieldValues.user_phone_number.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />
    if ('display_name' in fieldValues) temp.display_name = fieldValues.display_name.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />
    if ('user_role' in fieldValues) temp.user_role = fieldValues.user_role.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />

    setErrors({ ...temp })

    if (fieldValues == values) return Object.values(temp).every(x => x == "")
  }


  const validationschema = yup.object({
    //user_login: yup.string().required( String(messages["common.fieldrequired.label"])),
    user_email: yup.string().email(String(<IntlMessages id="validation.emailFormat" />)).required("Required"),
  });


  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e: any) => {
    //console.log(`Handle Submit Clicked`,values)
    e.preventDefault()
    if (validate() && validationschema) {
      //console.log(`Records Submitted to be saved`)
      addOrEdit(values, resetForm);
    }
  }

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit
      })
  }, [recordForEdit])



  const getUserRoles = userRoles.filter((item) => {
    return item.id == "User" || item.id == "Admin"
  })



  return (

    <Forms onSubmit={handleSubmit} >

      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            type="text"
            name="display_name"
            label={<IntlMessages id='common.display_name' />}
            value={values.display_name}
            onChange={handleInputChange}
            error={errors.display_name}
          />
        </FormControl>
      </Grid>

      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            type="text"
            name="user_login"
            //size="small"
            label={<IntlMessages id='common.user_login' />}
            value={values.user_login}
            onChange={handleInputChange}
            error={errors.user_login}
          />
        </FormControl>
      </Grid>

      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            type="email"
            name="user_email"
            label={<IntlMessages id='common.user_email' />}
            value={values.user_email}
            onChange={handleInputChange}
            error={errors.user_email}
          />
        </FormControl>
      </Grid>

      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            type="text"
            name="user_phone_number"
            label={<IntlMessages id='common.user_phone_number' />}
            value={values.user_phone_number}
            onChange={handleInputChange}
            error={errors.user_phone_number}
          />
        </FormControl>
      </Grid>



      <Grid item md={6} sm={6} xs={12} >
        <FormControl sx={{ minWidth: 185 }}>
          <Controls.BasicSelect
            //labelId={labelId}
            id="user_role"
            name="user_role"
            label={<IntlMessages id='common.user_role' />}
            value={values.user_role}
            options={getUserRoles}
            onChange={handleInputChange} // handleCredentialChange
            error={errors.user_role}
          />
        </FormControl>
      </Grid>


      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            disabled
            type="password"
            name="user_pass"
            label={<IntlMessages id='common.password' />}
            value={`password`}//values.user_pass ? values.user_pass : 
            onChange={handleInputChange}
            error={errors.user_pass}
          />
        </FormControl>
      </Grid>


      {/* Action Controls */}

      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Controls.Button
            sx={{
              position: "relative",
              minWidth: 100,
            }}
            color="primary"
            variant="contained"
            type="submit"
            text={<IntlMessages id='submit.label' />}
          />

          <Controls.Button
            sx={{
              position: "relative",
              minWidth: 100,
              ml: 2.5,
            }}
            color="primary"
            variant="outlined"
            onClick={resetForm}
            text={<IntlMessages id='reset.label' />}
          />

        </Box>
      </Grid>
    </Forms>
  )
}