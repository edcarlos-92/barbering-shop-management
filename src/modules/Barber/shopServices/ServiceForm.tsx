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
import { DefaultDatePicker } from '@edcarlos/libs/@edcartech/components/DatePickers';
//==========================FROM TEST===================================================

const initialFValues = {
  id: 0,
  service_name: '',
  service_description: '',
  service_price: '',
  price_date: '',
  //price_date: new Date(),
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
    //service_name: yup.string().required( String(messages["common.fieldrequired.label"])),
    customer_email: yup.string().email(String(<IntlMessages id="validation.emailFormat" />)).required("Required"),
  });

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors }
    if ('service_name' in fieldValues) temp.service_name = fieldValues.service_name.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />
    if ('service_description' in fieldValues) temp.service_description = fieldValues.service_description.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />
    if ('service_price' in fieldValues) temp.service_price = fieldValues.service_price.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />
    if ('price_date' in fieldValues) temp.price_date = fieldValues.price_date.length != 0 ? "" : <IntlMessages id='common.fieldrequired.label' />
    //if ('customer_email' in fieldValues)temp.customer_email = fieldValues.customer_email.length != 0 || Emailregex.test(fieldValues.customer_email) === true ? "" : <IntlMessages id='common.invalidmail.label'/> ;  //!fieldValues.customer_email || Emailregex.test(fieldValues.customer_email) === false ? <IntlMessages id='common.invalidmail.label'/> : "";
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
            name="service_name"
            //size="small"
            label={<IntlMessages id='common.service_name' />}
            value={values.service_name}
            onChange={handleInputChange}
            error={errors.service_name}
          />
        </FormControl>
      </Grid>

      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            type="text"
            name="service_description"
            label={<IntlMessages id='common.service_description' />}
            value={values.service_description}
            onChange={handleInputChange}
            error={errors.service_description}
          />
        </FormControl>
      </Grid>

      <Grid item md={6} sm={6} xs={12} >
        <FormControl>
          <Controls.TextInput
            type="number"
            name="service_price"
            label={<IntlMessages id='common.service_price' />}
            value={values.service_price}
            onChange={handleInputChange}
            error={errors.service_price}
            onInput={() => { }}
          />
        </FormControl>
      </Grid>


      <Grid item md={6} sm={6} xs={12}  >
        <FormControl sx={{ width: 180 }}>
          <DefaultDatePicker
            name="price_date"
            label={<IntlMessages id='commom.price_date' />}
            value={values.price_date}
            onChange={handleInputChange}
            error={errors.price_date}
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