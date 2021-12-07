import React from 'react'
import IntlMessages from '@edcarlos/utility/IntlMessages';
import red from '@mui/material/colors/red';

export default function FieldAlertMessages() {
  return (
    <div>FieldAlertMessages</div>
  )
}


const requiredColor = {
  color: red[900]
}


export const RequiredFieldMessage = (props) => {

  const { color } = props

  return (
    <span style={color || requiredColor}><IntlMessages id='common.fieldrequired.label' /></span>
  )



}