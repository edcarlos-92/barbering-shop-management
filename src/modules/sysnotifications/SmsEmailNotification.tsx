import React, { useEffect, useState, useCallback } from 'react' //useState,
import Grid from '@mui/material/Grid';
import Controls from "@edcarlos/libs/@edcartech/components/Controls/Controls";
import { useForm, Forms } from '@edcarlos/libs/@edcartech/components/useForm';
import IntlMessages from '@edcarlos/utility/IntlMessages';
import * as yup from "yup";
import { appIntl } from "@edcarlos/utility/helper/Utils";
//-==========================FORM TEST================================================
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Fonts } from "shared/constants/AppEnums";
import { green, red } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { randomNum, retrieveObjectKeyValue, objectValueWithReference } from '@edcarlos/utility/Utils';
import { v4 as uuidv4 } from 'uuid';
import { RequiredFieldMessage } from '@edcarlos/libs/@edcartech/components/FieldAlertMessages'
//==========================FROM TEST===================================================

//==========================FROM TEST===================================================
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextareaAutosize from '@mui/base/TextareaAutosize';
//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { silentInsert, silentDelete, getCustomersData, doInsert } from '../../redux/actions';
import { AppState } from '../../redux/store';
//-------------------------Redux Store----------------------------------------

import { useEventListener, useEventListeners } from '@edcarlos/utility/hooks'

const initialFValues = {
  id: 0,
  customer_id: '',
  sms_notification: '',
  email_notification: '',
  push_notification: '',
  text_message: '',
  created_at: new Date(),
  notification_type: 'Single',
  role_or_user_id: '',
}
const PageCSS = {

  textAreaStyle: {
    borderRadius: '5px',
    borderColor: '#3498db',
    "& textarea#text_message": {
    }
  }
}

export default function SmsEmailNotification(props: any) {

  const dispatch = useDispatch();

  useEffect(() => {
    getCustomersData(dispatch);
  }, []);

  const { customersData } = useSelector<AppState, AppState['barber']>(({ barber }) => barber,);

  const { messages } = appIntl();
  const NotificationinsertLog = String(messages["logactivity.Nottification"])

  const { optionalCustomerData } = props

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors }
    if ('customer_id' in fieldValues) temp.customer_id = fieldValues.customer_id.length != 0 ? "" : <RequiredFieldMessage />
    //if ('text_message' in fieldValues)temp.text_message = fieldValues.text_message.length != 0 ? "" : <RequiredFieldMessage />

    setErrors({ ...temp })

    if (fieldValues == values) return Object.values(temp).every(x => x == "")
  }

  const sendMessages = (formData: any, resetForm: any) => {
    if (formData.id == 0) {
      //console.log(`A call for Inserting`);
      dispatch(doInsert('/system_notification', formData, '', NotificationinsertLog));
    } else {
      // console.log(`A call for Update`);
      //dispatch(doUpdate('barber/salesbookings/update_bookings',formData,'salesbookings',UserupdateLog));
    }
    resetForm()
  }

  const {
    values,
    //setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const [textAreaText, setTextAreaText] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (validate() && values.text_message !== '') {//
      //console.log(`Sending...`);
      sendMessages(values, resetForm);
      setTextAreaText('');
    }
  }

  values.text_message = textAreaText;
  const [smsNotification, setSmsNotification] = useState(values.sms_notification != '' ? values.sms_notification : false);
  const [emailNotification, setEmailNotification] = useState(values.email_notification != '' ? values.email_notification : false);
  const [pushNotification, setPushNotification] = useState(values.push_notification != '' ? values.push_notification : false);

  const limit = 160;
  const maximumLength = useCallback(text => {
    setTextAreaText(text.slice(0, limit));
  },
    [limit, setTextAreaText]
  );


  const handleNotificationChange = (event, type) => {
    if (type == 'sms') {
      setSmsNotification(event.target.checked);
    }
    else if (type == 'email') {
      setEmailNotification(event.target.checked);
    }
    else if (type == 'push') {
      setPushNotification(event.target.checked);

    }
  };

  values.sms_notification = smsNotification;
  values.email_notification = emailNotification;
  values.push_notification = pushNotification;

  return (

    <Forms onSubmit={handleSubmit} >

      <Grid item md={12} sm={12} xs={12} >
        <Box component="h4" sx={{ fontWeight: Fonts.SEMI_BOLD, color: red[900] }}>
          <IntlMessages id="sendmessaging.label" />
        </Box>
      </Grid>

      <Grid item md={4} sm={4} xs={12} >
        <FormControl sx={{ minWidth: 185 }} >
          <Controls.BasicSelect
            id="customer_id"
            name="customer_id"
            label={<IntlMessages id='customer_id.label' />}
            value={values.customer_id}
            options={customersData || optionalCustomerData}  //salesCutomer
            displayField={`customer_name`}
            onChange={handleInputChange}
            error={errors.customer_id}
          />
        </FormControl>
      </Grid>

      <Grid item md={12} sm={12} xs={12} >
      </Grid>

      <Grid item md={4} sm={4} xs={12} >
        {/* <FormControl sx={{ minWidth: 185}} > */}
        <TextareaAutosize
          id="text_message"
          name="text_message"
          maxRows={4}
          aria-label="maximum height"
          placeholder="Messages..."//{<IntlMessages id='messagingbox.label'/>}
          value={textAreaText}
          //defaultValue="Messages..."
          onChange={
            (e) => {
              maximumLength(e.target.value);
              handleInputChange;
            }
          }
          style={{ width: 200, height: 100, marginTop: '-10px', ...PageCSS.textAreaStyle }}

        //error={errors.text_message}
        />
        {/* </FormControl> */}
      </Grid>

      <FormControl sx={{ mt: 2, ml: 5 }} component="fieldset">
        <FormLabel component="legend">Notification</FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            label={<IntlMessages id='notification.sms.label' />}
            //value={smsNotification}

            control={<Checkbox
              id="sms_notification"
              name="sms_notification"
              value={smsNotification}
              checked={smsNotification}
            />}

            // checked={smsNotification} 
            labelPlacement="end"
            onChange={(e) => {
              handleNotificationChange(e, 'sms');
              handleInputChange;
            }}
          />

          <FormControlLabel
            label={<IntlMessages id='notification.email.label' />}

            //value={emailNotification}

            control={<Checkbox
              id="email_notification"
              name="email_notification"
              value={emailNotification}
              checked={emailNotification}
            />}

            // checked={emailNotification} 
            labelPlacement="end"
            onChange={(e) => {
              handleNotificationChange(e, 'email');
              handleInputChange;
            }}
          />

          <FormControlLabel sx={{ display: 'none' }}
            label={<IntlMessages id='notification.push.label' />}

            //value={pushNotification}

            control={<Checkbox
              id="push_notification"
              name="push_notification"
              value={pushNotification}
              checked={pushNotification}
            />}

            //checked={pushNotification} 
            labelPlacement="end"
            onChange={(e) => {
              handleNotificationChange(e, 'push');
              handleInputChange;
            }}
          />
        </FormGroup>
      </FormControl>

      {/* Action Controls  Don't Show if nothing has been added */}

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
      {/* Action Controls  Don't Show if nothing has been added */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </Forms>
  )
}