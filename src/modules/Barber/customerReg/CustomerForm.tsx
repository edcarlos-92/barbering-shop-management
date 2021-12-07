import React, { useEffect } from 'react' //useState,
import Grid from '@mui/material/Grid';
import Controls from "@edcarlos/libs/@edcartech/components/Controls/Controls";
import { useForm, Forms } from '@edcarlos/libs/@edcartech/components/useForm';
//import * as employeeService from "../../../../services/employeeService";
import { useDispatch, useSelector } from 'react-redux';
//import {AppState} from '../../redux/store';
//import {getAllUsers} from '../../../../redux/actions';
//import  {UserSelect} from "./DeptCustomComp";
import IntlMessages from '@edcarlos/utility/IntlMessages';
//import { makeStyles } from "@material-ui/core";
import * as yup from "yup";
import { appIntl } from "@edcarlos/utility/helper/Utils";
//import {appIntl} from '../../../../@edcarlos/utility/Utils';

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
import { RoutePermittedRole, authRole } from 'shared/constants/AppConst';

import { Emailregex } from '@edcarlos/utility/Utils'

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
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  customer_dob: '',
  created_at: new Date(),
  updated_at: new Date(),
}

const userRoles = [
  {
    id: 'Admin',
    itemValue: 'Admin'
  },
  {
    id: 'User',
    itemValue: 'User'
  }
]

export default function CustomerForm(props: any) {

  //const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(getAllUsers());
    //getAllUsers(dispatch);
  }, []);

  //const {safetyBoardData}:any = useSelector<AppState, AppState['safety']>(({safety}) => safety,);
  //console.log(`Department Users`, safetyBoardData)

  //const [credential, setCredential] = React.useState("");
  //setCredential(credential.target.value);
  // const handleCredentialChange = (event) => {
  //   setCredential(event.target.value);
  // };

  //console.log(`Employee Sample`, employeeService.getDepartmentCollection())

  const { messages } = appIntl();
  const { addOrEdit, recordForEdit } = props


  const validationschema = yup.object({
    //customer_name: yup.string().required( String(messages["common.fieldrequired.label"])),
    customer_email: yup.string().email(String(<IntlMessages id="validation.emailFormat" />)).required("Required"),
  });

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors }
    if ('customer_name' in fieldValues) temp.customer_name = fieldValues.customer_name.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />
    //if ('customer_email' in fieldValues)temp.customer_email = fieldValues.customer_email.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label'/>
    //if ('customer_email' in fieldValues)temp.customer_email = fieldValues.customer_email.length != 0 || Emailregex.test(fieldValues.customer_email) === true ? "" : <IntlMessages id='common.invalidmail.label'/> ;  //!fieldValues.customer_email || Emailregex.test(fieldValues.customer_email) === false ? <IntlMessages id='common.invalidmail.label'/> : "";
    if ('customer_phone' in fieldValues) temp.customer_phone = fieldValues.customer_phone.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />
    //if ('customer_dob' in fieldValues)temp.customer_dob = fieldValues.customer_dob.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label'/>
    //if ('user_role' in fieldValues)temp.user_role = fieldValues.user_role.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label'/>

    setErrors({ ...temp })

    if (fieldValues == values) return Object.values(temp).every(x => x == "")
  }


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
    // if (validate()  && validationschema ) {
    if (validate()) {
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


  return (
    // sx={classes.formMargin}  columns={16}
    //onSubmit={handleSubmit}              
    <Forms onSubmit={handleSubmit} >


      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            type="text"
            name="customer_name"
            //size="small"
            label={<IntlMessages id='common.customer_name' />}
            value={values.customer_name}
            onChange={handleInputChange}
            error={errors.customer_name}
          />
        </FormControl>
      </Grid>

      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            type="number"
            name="customer_phone"
            label={<IntlMessages id='common.customer_phone' />}
            value={values.customer_phone}
            onChange={handleInputChange}
            error={errors.customer_phone}
          />
        </FormControl>
      </Grid>

      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            type="email"
            name="customer_email"
            label={<IntlMessages id='common.customer_email' />}
            value={values.customer_email}
            onChange={handleInputChange}
            error={errors.customer_email}
            onInput={() => { }}
          />
        </FormControl>
      </Grid>



      <Grid item md={6} sm={6} xs={12}  >
        <FormControl sx={{ width: 180 }}>
          <DefaultDatePicker
            name="customer_dob"
            label={<IntlMessages id='commom.customer_dob' />}
            value={values.customer_dob}
            onChange={handleInputChange}
            error={errors.customer_dob}
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