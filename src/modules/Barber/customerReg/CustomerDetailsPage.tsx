import React, { useEffect, useRef } from 'react' //useState,
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
import { FormPopup } from "@edcarlos/libs/@edcartech/components/Popups";
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

import Paper from '@mui/material/Paper';
import { DefaultDatePicker } from '@edcarlos/libs/@edcartech/components/DatePickers';
//import {stringDateFormat} from "@edcarlos/utility/Utils";
import ReactToPrint from 'react-to-print';
import IconButton from '@mui/material/IconButton/IconButton';
import PrintIcon from '@mui/icons-material/Print';

import Moment from 'moment';

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import KeyOffIcon from '@mui/icons-material/KeyOff';
import KeyIcon from '@mui/icons-material/Key';
import AttributionIcon from '@mui/icons-material/Attribution';
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { appDirectories } from "shared/constants/AppConst";

export default function CustomerDetailsPage(props: any) {
  //be2102  Background
  const componentRef = useRef(null);
  const { recordViewDetails } = props
  return (

    <>


      <Box
        ref={componentRef}
      >

        <Box
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            ml: -6,
            mr: -6,
            pl: 5,
            pr: 5,
            pb: 4,
            display: 'none'
          }}
        >
          <Box
            sx={{
              mb: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {recordViewDetails.avatar ? (
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mb: 2.5,
                }}

                src={`${appDirectories.onlineAvatarAccessDir}${recordViewDetails.avatar}`}

              />
            ) : (
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mb: 2.5,
                }}

                src={`${appDirectories.onlineAvatarDefault}`}
              />
            )}
            <Box component="h3">{recordViewDetails.customer_name}</Box>
          </Box>
        </Box>


        <Box
          sx={{
            pb: 5,
          }}
        >
          <Box
            component="h4"
            sx={{
              mb: 4,
              fontWeight: Fonts.SEMI_BOLD,
              textAlign: "center"
            }}
          >
            {/* <IntlMessages id="common.customer_reg.details.label" /> */}
            {recordViewDetails.customer_name}
          </Box>

          <div>
            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <PhoneOutlinedIcon
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box
                sx={{
                  ml: 3.5,
                }}
              >
                {recordViewDetails.customer_phone ? (
                  recordViewDetails.customer_phone
                ) : (
                  <IntlMessages id="common.na" />
                )}
              </Box>
            </Box>

            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <EmailOutlinedIcon
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box
                sx={{
                  ml: 3.5,
                }}
              >
                {recordViewDetails.customer_email ? (
                  recordViewDetails.customer_email
                ) : (
                  <IntlMessages id="common.na" />
                )}
              </Box>
            </Box>

            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <CakeOutlinedIcon
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box
                sx={{
                  ml: 3.5,
                }}
              >
                {Moment(recordViewDetails.customer_dob).format("ll") ? (
                  Moment(recordViewDetails.customer_dob).format("ll")
                ) : (
                  <IntlMessages id="common.na" />
                )}

              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AttributionIcon
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box
                sx={{
                  ml: 3.5,
                }}
              >
                {Moment(recordViewDetails.created_at).format("ll") ? (
                  Moment(recordViewDetails.created_at).format("ll")
                ) : (
                  <IntlMessages id="common.na" />
                )}
              </Box>
            </Box>
          </div>

        </Box>


        {/* <ReactToPrint
            trigger={() => <IconButton > <PrintIcon color='primary' /> </IconButton> }
            content={() => componentRef.current}
          /> */}
      </Box>



    </>
  )
}