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
import { DefaultDatePicker } from '@edcarlos/libs/@edcartech/components/DatePickers';
import { Fonts } from "shared/constants/AppEnums";
import { BookingStatus, BookingDiscount, PaymentStatus } from 'shared/constants/AppConst';//clientTypes premiumTypes paymentPlans,dependantRelation
import Axios, { setAuthToken } from '@edcarlos/services/auth/jwt-auth';
import { green, red } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { randomNum, retrieveObjectKeyValue, objectValueWithReference } from '@edcarlos/utility/Utils';
import { v4 as uuidv4 } from 'uuid';
import { RequiredFieldMessage } from '@edcarlos/libs/@edcartech/components/FieldAlertMessages'
//==========================FROM TEST===================================================
// import {
//     //mapDeptToUsersInCharge,
//     doInsert,
//     doUpdate,
//     doDelete,
//     //getCustomersData,
//     getSalesBookingData,
//     getCustomersData,
//     getGrandTotalsData
// } from '../../../redux/actions';

import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import axios from 'axios'
//==========================FROM TEST===================================================
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Moment from 'moment';
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from "@edcarlos/libs/@edcartech/components/ConfirmDialog";
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { silentInsert, silentDelete, getCustomersData } from '../../../redux/actions';
import { AppState } from '../../../redux/store';
//-------------------------Redux Store----------------------------------------

import { useEventListener, useEventListeners } from '@edcarlos/utility/hooks'

//let GenRepeatersId = randomNum();
let saleFinal: any = {};
let Gtotal: any = 0;

const initialFValues = {
  id: 0,
  customer_id: '',
  booking_date: '',
  status: '',
  payment_status: '',
  assignment: '',
  issuer: '',
  sms_notification: '',
  email_notification: '',
  push_notification: '',
  service_reference_id: '',
  created_at: new Date(),
  updated_at: new Date(),
  grand_total: 0,


  service_sales_ref: {
    //id:'',
    //ex_service_reference_id:'',
    service_id: 0,
    quantity: 0,
    discount_type: 0,
    discount: 0,
    total_service_cost: 0,
  }
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

const PageCSS = {
  input: {
    //"-webkit-text-fill-color": `#10380d !important`,
    WebkitTextFillColor: `#10380d !important`,
    color: `#10380d !important`,
    background: "#3F34",
    textAlign: "center",
    borderRadius: "5px"
  },
  "& .MuiFormLabel-root.Mui-disabled": {
    color: '#10380d',
  },

  quantity: {
    input: {
      textAlign: "center",
    }
  },

  discount: {
    input: {
      color: `#10380d !important`,
      textAlign: "center",
    }
  },

  repeatersIconSize: {
    fontSize: 35,
    color: '#fff',
    background: '#10380d',
    borderRadius: `50%`,
    marginLeft: '6px',
    marginRight: '2px'
    //borderRaduis:'50%'
  },

  labelsIconButton: {
    display: "flex",
    flexDirection: "column"
  },


  grandTotal: {
    input: {
      WebkitTextFillColor: `#fff !important`,
      //color: `#fff !important`,
      background: "#10380d",//#3F34
      textAlign: "center",
      borderRadius: "5px"
    },
  },

  refField: {
    input: {
      WebkitTextFillColor: `#fff`,
      borderColor: '#fff',
    },
    '& fieldset': {
      borderColor: '#fff',
      color: '#fff',
      background: '#fff'
    },
    // focused color for input with variant='outlined' ie. (different for other types)
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: '#fff',
        color: '#fff'
      }
    }
  }



}

const editIcon = {
  borderRadius: '5px',
  height: 10,
  lineHeight: '10px',
  verticalAlign: 'middle',
  width: 21,
  minHeight: '24px',
  backgroundColor: defaultTheme.theme.palette.iconColors.editBackground,
  color: defaultTheme.theme.palette.iconColors.editFontColor,
}

const iconSize = {
  fontSize: 12,
}

const deleteIcon = {
  borderRadius: '5px',
  height: 10,
  lineHeight: '10px',
  verticalAlign: 'middle',
  width: 21,
  minHeight: '24px',
  backgroundColor: defaultTheme.theme.palette.iconColors.deleteBackground,
  color: defaultTheme.theme.palette.iconColors.deleteFontColor
}
let servicePrice = 0;
let currentQuantity = 0;
let defaultTotal = 0;
export default function SalesForm(props: any) {

  const dispatch = useDispatch();

  useEffect(() => {
    //getSalesBookingData(dispatch);
    getCustomersData(dispatch);
    //getGrandTotalsData(dispatch);
  }, []);


  const { salesData, customersData, grandTotalData, servicesData } = useSelector<AppState, AppState['barber']>(({ barber }) => barber,);
  const { systemUsersData } = useSelector<AppState, AppState['usereducer']>(({ usereducer }) => usereducer,);

  const { messages } = appIntl();
  const msgdelete = String(messages["common.createsuccess"])
  const msgconfirm = String(messages["common.confirmmsg"])
  const msgconfirmsub = String(messages["common.confirmmsgsub"])
  const { addOrEdit, recordForEdit, checkRef } = props

  const [salesCutomer, setSalesCustomer] = useState([])
  const [salesBarber, setSalesBarber] = useState([])
  const [salesService, setSalesService] = useState([])
  let serviceType: any = salesService;

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors }
    if ('customer_id' in fieldValues) temp.customer_id = fieldValues.customer_id.length != 0 ? "" : <RequiredFieldMessage />
    if ('booking_date' in fieldValues) temp.booking_date = fieldValues.booking_date.length != 0 ? "" : <RequiredFieldMessage />
    //if ('customer_email' in fieldValues)temp.customer_email = fieldValues.customer_email.length != 0 || Emailregex.test(fieldValues.customer_email) === true ? "" : <IntlMessages id='common.invalidmail.label'/> ;  //!fieldValues.customer_email || Emailregex.test(fieldValues.customer_email) === false ? <IntlMessages id='common.invalidmail.label'/> : "";
    if ('status' in fieldValues) temp.status = fieldValues.status.length != 0 ? "" : <RequiredFieldMessage />
    if ('payment_status' in fieldValues) temp.payment_status = fieldValues.payment_status.length != 0 ? "" : <RequiredFieldMessage />
    if ('assignment' in fieldValues) temp.assignment = fieldValues.assignment.length != 0 ? "" : <RequiredFieldMessage />
    if ('service_reference_id' in fieldValues) temp.service_reference_id = fieldValues.service_reference_id.length != 0 ? "" : <RequiredFieldMessage />
    //  if ('quantity' in fieldValues)temp.quantity = fieldValues.quantity.length != 0  ? "" : <IntlMessages id='common.fieldrequired.label'/>
    //  if ('discount_type' in fieldValues)temp.discount_type = fieldValues.discount_type.length != 0  ? "" : <IntlMessages id='common.fieldrequired.label'/>
    //  if ('discount' in fieldValues)temp.discount = fieldValues.discount.length != 0  ? "" : <IntlMessages id='common.fieldrequired.label'/>
    //  if ('total_service_cost' in fieldValues)temp.total_service_cost = fieldValues.total_service_cost.length != 0  ? "" : <IntlMessages id='common.fieldrequired.label'/>
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
    e.preventDefault()
    // if (validate()  && validationschema ) {
    if (validate() && values.grand_total !== 0) {//
      addOrEdit(values, resetForm);
    }
  }

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit
      })
  }, [recordForEdit])

  /*
  const Generator =  ()=>{
      return values.service_reference_id !='' ? values.service_reference_id : GenRepeatersId
  }
  */



  // const [serviceValue,setServiceValue] = useState(values.service_sales_ref.service_id != '' ? values.service_sales_ref.service_id : '')
  const [serviceValue, setServiceValue] = useState([])
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [discount, setDiscount] = useState(0)
  const [discount_type, setDiscountType] = useState([])
  const [total_service_cost, setTotal_service_cost] = useState(0);

  let [repeatersID, setRepeatersID] = useState(values.service_reference_id != '' ? values.service_reference_id : randomNum());

  //console.log(`Updating ID`,values.service_reference_id)
  //console.log(`State ID`,repeatersID)


  const [repeaterInputField, setRepeaterInputFields] = useState([{ id: uuidv4(), ex_service_reference_id: repeatersID, ...initialFValues.service_sales_ref }]);

  const [referenceInfo, setReferenceInfo] = useState([]);
  const [editService, setEditService] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })
  const [editID, setEditID] = useState(0)

  const [grandTotal, setGrandTotal] = useState(values.grand_total !== '' ? values.grand_total : 0.00)


  const [smsNotification, setSmsNotification] = useState(values.sms_notification != '' ? values.sms_notification : false);
  const [emailNotification, setEmailNotification] = useState(values.email_notification != '' ? values.email_notification : false);
  const [pushNotification, setPushNotification] = useState(values.push_notification != '' ? values.push_notification : false);


  const handleNotificationChange = (event, type) => {
    if (type == 'sms') {
      setSmsNotification(event.target.checked);
      //console.log(`sms`,event.target.checked);
    }
    else if (type == 'email') {
      //values.email_notification = event.target.checked;
      setEmailNotification(event.target.checked);
      //console.log(`email`,event.target.checked);
      //console.log(`initialFValues.email_notification`,values.email_notification);
    }
    else if (type == 'push') {
      //values.push_notification = event.target.checked;
      setPushNotification(event.target.checked);
      //console.log(`push`,event.target.checked);  
      //console.log(`initialFValues.push_notification`,values.push_notification);  
    }
  };

  //if(values.grand_total !== 0 ){
  values.sms_notification = smsNotification;
  values.email_notification = emailNotification;
  values.push_notification = pushNotification;



  const handleServiceChange = async (getServiceID, getQuantity, getDiscountType, getDiscount, getRepeaterId, getEvent) => {//getDiscountType 

    //Get the corresponding value now
    if (getServiceID != '') {
      try {
        await Axios({
          method: 'GET',
          url: `/barber/shopservices/get_sales_services?id=${getServiceID}`,
        })
          .then(response => {
            servicePrice = response.data.document[0].service_price;

            getQuantity == '' || getQuantity == 0 ? getQuantity = 1 : getQuantity
            getDiscountType == '' || getDiscountType == 0 ? getDiscountType = 'None' : getDiscountType

            let finalCost = (getQuantity * servicePrice);
            let finalDiscount = 0;
            if (getDiscountType == 'Percent-%' && getDiscount > 0) {
              finalDiscount = finalCost * (getDiscount / 100)
              setTotalDiscount(parseInt(finalDiscount.toFixed(1)));
              defaultTotal = finalCost - finalDiscount;
              setTotal_service_cost(finalCost - finalDiscount);
              //console.log(`To Pay in GHC `,defaultTotal,`getRepeaterId`,getRepeaterId,`getEvent`,getEvent);

              //Add Repeater Now
              handleRepeaterInputChange(getRepeaterId, getEvent, defaultTotal, getQuantity, getDiscountType, getDiscount, getServiceID);

            }
            else if (getDiscountType == 'Value' && getDiscount > 0) {
              setTotalDiscount(getDiscount);
              defaultTotal = finalCost - getDiscount;
              setTotal_service_cost(finalCost - getDiscount);
              //console.log(`To Pay in GHC `,defaultTotal,`getRepeaterId`,getRepeaterId,`getEvent`,getEvent);

              //Add Repeater Now
              handleRepeaterInputChange(getRepeaterId, getEvent, defaultTotal, getQuantity, getDiscountType, getDiscount, getServiceID);

            }
            else {
              setTotalDiscount(0);
              defaultTotal = finalCost;
              setTotal_service_cost(finalCost);

              //Add Repeater Now
              handleRepeaterInputChange(getRepeaterId, getEvent, defaultTotal, getQuantity, getDiscountType, getDiscount, getServiceID);
              //console.log(`To Pay in GHC `,defaultTotal,`getRepeaterId`,getRepeaterId,`getEvent`,getEvent);
              //setDiscount(0);

            }
          })
          .catch(err => console.log(err));
      }
      catch (e: any) {
        console.log(e.message)
      }
    }
  }



  //===================== Repaeters Dynamic Entries =======================
  //===================== Repaeters Dynamic Entries =======================

  // useEffect(() => {//Use this to Calculate the total or use eventHandler Below
  //     //check to see if the total changes then make calculations bases on matched db info on unique id
  //     setTotal_service_cost(total_service_cost)
  //     //referenceInfo


  //   }, [total_service_cost])


  const handleRepeaterInputChange = (id, event, subtotal, Quantity, DiscountType, Discount, ServiceID) => {
    getJSON()


    setRepeatersID(values.service_reference_id != '' ? repeaterInputField[0].ex_service_reference_id = values.service_reference_id : repeatersID);//    GenRepeatersId
    //setRepeatersID(values.service_reference_id !='' ? repeaterInputField[0].ex_service_reference_id = values.service_reference_id : GenRepeatersId || grandTotal == 0 ? Generator() :  GenRepeatersId );
    //values.service_reference_id !='' ? repeaterInputField[0].ex_service_reference_id = values.service_reference_id : GenRepeatersId
    const newInputFields = repeaterInputField.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    //repeaterInputField[0].id = uuidv4();
    //repeaterInputField[0].id == newInputFields[0].id ? newInputFields[0].id = uuidv4() : newInputFields[0].id  ;


    newInputFields[0].quantity = Quantity;
    newInputFields[0].discount_type = DiscountType;
    newInputFields[0].discount = Discount;
    newInputFields[0].total_service_cost = subtotal;
    newInputFields[0].service_id = ServiceID;
    // console.log(`------- Added ------`)
    // console.log(`Generated id` ,newInputFields[0].id);
    // console.log(`Existing id` ,repeaterInputField[0].id);
    // console.log(`reference_id`,newInputFields[0].ex_service_reference_id)
    // console.log(`service_id`,newInputFields[0].service_id)
    // console.log(`------------------------------------------`)
    setRepeaterInputFields(newInputFields);


  }

  const handleRepeaterAddFields = () => {
    // console.log(`Service Type ?`, serviceValue)
    // console.log(`Discount Type ?`, discount_type)
    if (serviceValue === [] || discount_type === [] || discount_type == null || total_service_cost === 0) {
      toast.error(String(messages["message.ServiceDiscountRequired"]), {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: true
      });
      //return;
    } else {
      //console.log(`Service Type ?`, serviceValue)
      //GenRepeatersId=Generator();
      //getJSON();

      saleFinal = repeaterInputField;
      //console.log(`To be added to the ref table`,saleFinal);

      //console.log(`oooooooooooooooooooooMain Table ID Before insert ooooooooooooooooo `,repeaterInputField[0].id);
      //Insert Records Now
      dispatch(silentInsert('barber/salesbookings/add_service_sales_ref', saleFinal, 'silentoperations'));
      //Set TextField Back to normal

      //setServiceValue([]);
      //setDiscountType([]);
      //setServiceValue(0);
      repeaterInputField[0].id = uuidv4();
      //console.log(`oooooooooooooooooooooMain Table ID After insertion ooooooooooooooo `,repeaterInputField[0].id);
      //repeaterInputField[0].service_id = 0;
      setRepeaterInputFields(repeaterInputField);

    }




  }

  const handleRepeaterRemoveFields = id => {
    const repeaterValues = [...repeaterInputField];
    repeaterValues.splice(repeaterValues.findIndex(value => value.id === id), 1);
    setRepeaterInputFields(repeaterValues);
    saleFinal = repeaterValues;
    getJSON()
    dispatch(silentDelete(`barber/salesbookings/delete_service_sales_ref?id=${id}`, ''));
  }
  //===================== Repaeters Dynamic Entries =======================
  //===================== Repaeters Dynamic Entries =======================
  const getJSON = async () => {
    const element: any = document.querySelector('#service_reference_id'); //,#service_reference_id  ,#sms_notification,#email_notification,#push_notification
    element.addEventListener('click', () => console.log(' click Dependants'))
    const event = new Event('new change Text');
    await element.dispatchEvent(event);
    //handle Focus const handleFocus = event => {
    event.preventDefault();
    const { target }: any = event;
    const extensionStarts = target.value.lastIndexOf('.');
    await target.focus();
    await target.setSelectionRange(0, extensionStarts);

    //values.service_reference_id !='' ? repeaterInputField[0].ex_service_reference_id = values.service_reference_id && setRepeatersID(values.service_reference_id) : GenRepeatersId = values.service_reference_id

    setRepeatersID(values.service_reference_id != '' ? repeaterInputField[0].ex_service_reference_id = values.service_reference_id : repeatersID);//    GenRepeatersId
    //setRepeatersID(values.service_reference_id !='' ? repeaterInputField[0].ex_service_reference_id = values.service_reference_id : GenRepeatersId)
    //values.service_reference_id !='' ? values.service_reference_id : randomNum()
  }
  const openInPopup = (item: any) => {
    setEditService(item);

    setEditID(item.id)
    //console.log(`Existing Edit ID`,editID)
    //console.log(`Incomming Edit ID`,item.id)
    if (editID != item.id) {
      repeaterInputField[0].id = item.id;
      repeaterInputField[0].ex_service_reference_id = item.ex_service_reference_id;
      setServiceValue(item.service_id);
      setQuantity(item.quantity);
      setDiscountType(item.discount_type);
      setDiscount(item.discount);
      setTotal_service_cost(item.total_service_cost);
      setRepeaterInputFields([...repeaterInputField]);

    }

  }
  const onDelete = (id: any) => {
    dispatch(silentDelete(`barber/salesbookings/delete_service_sales_ref?id=${id}`, 'silentoperations'));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })

  }
  //======================================= SALES BOOKING  As direct run function =========================
  /*   
  const getCustomers = (()  =>{
          const { status, data, error, isFetching } = useQuery(
          'salesCustomers',
          async () => {
              const res = await axios.get(`/api/barber/customers/get_sales_customers`);
              return setSalesCustomer(res.data.document);
          },
          
          {
              // Refetch the data every second
              //refetchInterval: 1000, 
          }
          )
          })()
  */

  const getBarbers = (() => {
    const { status, data, error, isFetching } = useQuery(
      'salesBarbers',
      async () => {
        const res = await axios.get(`/api/barber/customers/get_sales_barbers`)
        return setSalesBarber(res.data.document);
      },
      {
        // Refetch the data every second
        //refetchInterval: 1000, 
      }
    )
  })()


  const getServices = (() => {

    const { status, data, error, isFetching } = useQuery(
      'salesServices',
      async () => {
        const res = await axios.get(`/api/barber/shopservices/get_sales_services`)
        return setSalesService(res.data.document);
      },
      {
        // Refetch the data every second
        //refetchInterval: 1000, 
      }
    )
  })()



  const getmapServices = (() => {

    const { status, data, error, isFetching } = useQuery(
      'mapServices',
      async () => {
        const res = await axios.get(`/api/barber/salesbookings/get_service_sales_ref`)
        return setReferenceInfo(res.data.document);
      },
      {
        // Refetch the data every second
        refetchInterval: 1000,
      }
    )
  })()





  /*
  const getGrandTotal = (()  =>{
      
      const { status, data, error, isFetching } = useQuery(
        'getGrandTotal',
        async () => {
          const res = await axios.get(`/api/barber/salesbookings/get_service_sales_ref_total?id=${repeatersID}`)
          //values.grand_total = res.data.document[0].grand_total == null || res.data.document[0].grand_total == 0 || total_service_cost == 0 ? 0.00 : (res.data.document[0].grand_total).toFixed(2)
          //return setGrandTotal(res.data.document[0].grand_total == null || res.data.document[0].grand_total == 0 || total_service_cost == 0 ? 0.00 : (res.data.document[0].grand_total).toFixed(2));

          //if(referenceInfo !== null)
          // if(total_service_cost !== 0){
          // }else{
          //  return setGrandTotal(0);
          // }
           
          //parseInt(finalDiscount.toFixed(1))
        },
        {
          // Refetch the data every second
          refetchInterval: 1000, 
        }
      )
      })()

      */
  //======================================= SALES BOOKING ========================= 


  /*
  useEffect(() => {
      console.log(`PopUp State On form`,checkRef )
      if(checkRef !=true ){
          console.log(`Old Reference `,Generator() )
          console.log(`Reset The Reference To `,randomNum() )
          setRepeatersID(randomNum());
      }
  }, [checkRef]);
  */

  //values.grand_total = res.data.document[0].grand_total == null || res.data.document[0].grand_total == 0 || total_service_cost == 0 ? 0.00 : (res.data.document[0].grand_total).toFixed(2)

  useEffect(() => {
    Gtotal = objectValueWithReference(grandTotalData, repeatersID, `itemValue`);
    values.grand_total = Gtotal == null || Gtotal === 0 || Gtotal === '' || total_service_cost === 0 ? 0.00 : Gtotal//parseInt(Gtotal).toFixed(2)
    setGrandTotal(values.grand_total);
    //objectValueWithReference(grandTotalData,repeatersID,`itemValue`)
    console.log(`UseEffect Grand Total `, Gtotal)
    console.log(`UseEffect Grand Total Value `, values.grand_total)
    //values.grand_total = res.data.document[0].grand_total == null || res.data.document[0].grand_total == 0 || total_service_cost == 0 ? 0.00 : (res.data.document[0].grand_total).toFixed(2)
    //return setGrandTotal(res.data.document[0].grand_total == null || res.data.document[0].grand_total == 0 || total_service_cost == 0 ? 0.00 : (res.data.document[0].grand_total).toFixed(2));
    //grandTotalData
  }, [grandTotalData]);


  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = useCallback(({ clientX, clientY }) => {
    //setGrandTotal(values.grand_total);
  },
    [repeatersID]
  );
  // Add event listener using the hook
  useEventListener('mousemove', handler);



  return (

    <Forms onSubmit={handleSubmit} >

      <Grid item md={12} sm={12} xs={12} >
        <Box component="h4" sx={{ fontWeight: Fonts.SEMI_BOLD, color: red[900] }}>
          <IntlMessages id="common.bookinginfo" />
        </Box>
      </Grid>

      <Grid item md={3} sm={6} xs={12} >
        <FormControl sx={{ minWidth: 185 }} >
          <Controls.BasicSelect
            id="customer_id"
            name="customer_id"
            label={<IntlMessages id='customer_id.label' />}
            value={values.customer_id}
            options={customersData}  //salesCutomer
            displayField={`customer_name`}
            onChange={handleInputChange}
            error={errors.customer_id}
          />
        </FormControl>
      </Grid>

      <Grid item md={3} sm={6} xs={12} >
        <FormControl sx={{ width: 180 }}>
          <DefaultDatePicker
            name="booking_date"
            label={<IntlMessages id='booking_date.label' />}
            value={values.booking_date}
            onChange={handleInputChange}
            error={errors.booking_date}
          />
        </FormControl>
      </Grid>

      <Grid item md={3} sm={6} xs={12} >
        <FormControl sx={{ minWidth: 185 }} >
          <Controls.BasicSelect
            id="assignment"
            name="assignment"
            label={<IntlMessages id='assignment.label' />}
            value={values.assignment}
            options={salesBarber}//  systemUsersData
            //displayField={`display_name`}
            onChange={handleInputChange}
            error={errors.assignment}
          />
        </FormControl>
      </Grid>

      <Grid item md={3} sm={6} xs={12} >
        <FormControl sx={{ minWidth: 185 }} >
          <Controls.BasicSelect
            id="status"
            name="status"
            label={<IntlMessages id='status.label' />}
            value={values.status}
            options={BookingStatus()}
            onChange={handleInputChange}
            error={errors.status}
          />
        </FormControl>
      </Grid>


      <h4 style={{ fontWeight: Fonts.BOLD, color: green[900], marginBottom: 15, marginTop: 15, marginLeft: 15 }} ><IntlMessages id="common.salesinfo" /></h4>
      <h6 style={{ fontWeight: Fonts.MEDIUM, color: red[900], marginBottom: 15, marginTop: 19, marginLeft: 5 }}><IntlMessages id="repeater.description" /></h6>



      {

        (values.service_reference_id == 'undefined' || values.service_reference_id == '' || values.service_reference_id == null) ?
          <Typography sx={{ display: 'none' }}><IntlMessages id="reference.details" /> </Typography>
          :

          (

            //'Dependants Available '+values.dependants
            //renderDependantsTable()
            referenceInfo !== null || referenceInfo !== [] ? (
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left" ><IntlMessages id="service_id.short" /></TableCell>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left"><IntlMessages id="quantity.short" /></TableCell>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left"><IntlMessages id="discounttype.short" /></TableCell>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left"><IntlMessages id="discount.short" /></TableCell>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left"><IntlMessages id="total_service_cost.short" /></TableCell>
                      <TableCell align="left">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {rows.map((row) => ( */}
                    {referenceInfo.map((item: any) => (
                      item.ex_service_reference_id === values.service_reference_id ? (

                        <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="left" component="th" scope="row" >{retrieveObjectKeyValue(serviceType, item.service_id)}</TableCell>
                          <TableCell align="left" >{item.quantity}</TableCell>
                          <TableCell align="left">{item.discount_type}</TableCell>
                          <TableCell align="left">{item.discount}</TableCell>
                          <TableCell align="left"><IntlMessages id='common.currency.label' /> {item.total_service_cost}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexDirection: 'row', p: 0, '& > :not(style)': { m: 1 }, }} >
                              <Controls.ActionButton
                                sx={{ ...editIcon }}
                                onClick={() => { openInPopup(item) }}>
                                <EditOutlinedIcon sx={{ ...iconSize }} />
                              </Controls.ActionButton>
                              <Controls.ActionButton
                                sx={{ ...deleteIcon }}
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    title: msgconfirm,
                                    subTitle: msgconfirmsub,
                                    onConfirm: () => {
                                      onDelete(item.id);
                                    }
                                  })
                                }}>
                                <CloseIcon sx={{ ...iconSize }} />
                              </Controls.ActionButton>

                            </Box>
                          </TableCell>


                        </TableRow>

                      ) : null
                    ))}

                  </TableBody>
                </Table>
                <ConfirmDialog
                  confirmDialog={confirmDialog}
                  setConfirmDialog={setConfirmDialog}
                />
              </TableContainer>

            ) : null

          )}
      {/* <Grid item md={12} sm={12} xs={12} >   
                     <Box component="h4" sx={{ fontWeight: Fonts.SEMI_BOLD, color: green[900] }}>
                        <IntlMessages  id="common.salesinfo" />

                    </Box>                     
                 </Grid> */}





      {repeaterInputField.map(repeaterItems => (

        <Container key={repeaterItems.id} sx={{ mt: 2, mb: 5 }}>

          {/* <Grid item md={3} sm={6} xs={12} > */}
          <FormControl sx={{ minWidth: 185 }} >
            <Controls.BasicSelect
              id="service_id"
              name="service_id"
              label={<IntlMessages id='service_id.label' />}
              value={serviceValue}
              options={salesService}
              onChange={(e) => {
                setServiceValue(e.target.value);
                quantity == null || quantity == 0 ? setQuantity(1) : quantity
                discount == null ? setDiscount(0) : discount
                handleServiceChange(e.target.value, quantity, discount_type, discount, repeaterItems.id, e);
                //handleInputChange;
                //handleOnChangeEvents();
                //handleRepeaterInputChange(repeaterItems.id, e)
              }}
              error={errors.service_id}
            />
          </FormControl>
          {/* </Grid> */}

          {/* <Grid item md={1.5} sm={2.5} xs={12} > */}
          <FormControl sx={{ width: { md: 80, sm: 80, sx: 185 }, ml: { md: 10, sm: 4 } }} >
            <Controls.TextInput
              sx={PageCSS.quantity}
              id="quantity"
              type="number"
              name="quantity"
              label={<IntlMessages id='quantity.label' />}
              value={quantity}
              onChange={(e) => {
                //handleInputChange;

                setQuantity(e.target.value);
                e.target.value == '' || e.target.value == 0 ? e.target.value = 1 : e.target.value
                discount == null ? setDiscount(0) : discount
                handleServiceChange(serviceValue, e.target.value, discount_type, discount, repeaterItems.id, e);


                //handleRepeaterInputChange(repeaterItems.id, e)
              }}
              /*
              onInput={e =>  {
                  setQuantity(e.target.value);  
                  e.target.value =='' || e.target.value == 0 ? e.target.value=1 : e.target.value
                  discount =='' ? setDiscount(0) : discount
                  handleServiceChange(serviceValue,e.target.value,discount_type,discount);                           
              }}
              */
              error={errors.quantity}
            />
          </FormControl>
          {/* </Grid> */}

          {/* <Grid item md={1.5} sm={2.5} xs={12} >  */}
          <FormControl sx={{ ml: { md: 2, sm: 4 }, minWidth: { xs: 92.5, sm: 92.5, md: 92.5 } }}   >  {/* sx={{ minWidth: 92.5, ml:-5}}      sx={{minWidth:{md:92.5,sm:92.5,sx:185},ml:{md:-5,sm:-5,sx:-5}  }} */}
            <Controls.BasicSelect
              id="discount_type"
              name="discount_type"
              label={<IntlMessages id='discount_type.label' />}
              value={discount_type}
              options={BookingDiscount()}
              onChange={(e) => {
                setDiscountType(e.target.value);
                e.target.value == 'None' ? setDiscount(0) : discount
                discount == null ? setDiscount(0) : discount
                handleServiceChange(serviceValue, quantity, e.target.value, discount, repeaterItems.id, e);
                //handleInputChange;

                // handleRepeaterInputChange(repeaterItems.id, e)

              }}
              error={errors.discount_type}
            />
          </FormControl>
          {/* </Grid> */}

          {/* <Grid item md={1.5} sm={2.5} xs={12} > */}
          <FormControl sx={{ width: { md: 80, sm: 80, sx: 185 }, ml: { md: 8, sm: 4 } }}  >
            <Controls.TextInput
              sx={PageCSS.discount}

              id="discount"
              type="number"
              name="discount"
              label={<IntlMessages id='discount.label' />}
              value={discount}
              onChange={(e) => {
                //handleInputChange;
                setDiscount(e.target.value)
                e.target.value == '' ? e.target.value = 0 : e.target.value
                handleServiceChange(serviceValue, quantity, discount_type, e.target.value, repeaterItems.id, e);
                //handleRepeaterInputChange(repeaterItems.id, e)
              }}
              /*
              onInput={(e) => {
                      setDiscount(e.target.value)
                      e.target.value =='' ? e.target.value = 0  : e.target.value
                      handleServiceChange(serviceValue,quantity,discount_type,e.target.value);
              }}
              */
              error={errors.discount}
            />
          </FormControl>
          {/* </Grid> */}

          {/* <Grid item md={1.5} sm={2.5} xs={12} > */}
          <FormControl sx={{ width: { md: 90, sm: 90, sx: 185 }, ml: { md: 4, sm: 5 } }}       >
            <Controls.TextInput
              style={{ fontSize: "15px" }}
              sx={PageCSS}
              //size="small"
              disabled

              id="total_service_cost"
              type="number"
              name="total_service_cost"
              label={<IntlMessages id='total_service_cost.label' />}
              value={total_service_cost}
              onChange={(e) => {
                //handleInputChange;
                handleServiceChange(serviceValue, quantity, discount_type, discount, repeaterItems.id, e);
                //handleRepeaterInputChange(repeaterItems.id, e)
              }}
              error={errors.total_service_cost}
            />
          </FormControl>
          {/* </Grid> */}



          {/* REPEATER BUTTONS */}
          {/* <Grid item md={3} sm={6} xs={12} sx={{ml:{md:0,sm:-5,xs:10}}} > */}
          {/* <IconButton  sx={{ml:{md:5,sm:-5,xs:10}}}
                                        disabled={repeaterInputField.length === 1} 
                                        onClick={() => handleRepeaterRemoveFields(repeaterItems.id)}
                                    >
                                        <RemoveIcon color='error' sx={{...PageCSS.repeatersIconSize}}  />
                                    </IconButton> */}
          <IconButton
            onClick={handleRepeaterAddFields}
          >
            <AddIcon color='success' sx={{ ...PageCSS.repeatersIconSize }} />
            <h5>{<IntlMessages id='add.more.label' />}</h5>
          </IconButton>
          {/* </Grid> */}
          {/* REPEATER BUTTONS */}


        </Container>
      ))}






      {/* <Grid item md={1.5} sm={2.5} xs={12} > */}
      <Grid item md={3} sm={6} xs={12} >
        <FormControl  > {/* sx={{width:{md:90,sm:90,sx:185}, ml:{md:-5,sm:-5} }} */}
          <Controls.TextInput
            style={{ fontSize: "15px" }}
            sx={PageCSS.grandTotal}
            //size="small"
            disabled
            id="grand_total"
            type="number"
            name="grand_total"
            //label={<IntlMessages id='grand_total.label'/>}
            value={grandTotal}
            //value={`${grandTotal}`}
            //onChange={handleInputChange}
            error={errors.grand_total}
          />
        </FormControl>
      </Grid>

      <Grid item md={3} sm={6} xs={12} >
        <FormControl sx={{ minWidth: 185, ml: { md: 0, sm: 0 } }} >
          <Controls.BasicSelect
            id="payment_status"
            name="payment_status"
            label={<IntlMessages id='paymentstatus.label' />}
            value={values.payment_status}
            options={PaymentStatus()}
            onChange={handleInputChange}
            error={errors.payment_status}
          />
        </FormControl>
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

      {referenceInfo !== null || referenceInfo !== [] ? (
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
      ) : null}
      {/* Action Controls  Don't Show if nothing has been added */}

      <Grid item md={12} sm={12} xs={12} >
        <FormControl sx={{ minWidth: 300 }}      >
          <Controls.TextInput

            style={{ fontSize: "15px" }}
            sx={PageCSS.refField}
            id="service_reference_id"
            size="small"
            //ref={depRef}
            type=""//password
            name="service_reference_id"
            value={repeatersID}
            //onClick={handleInputChange}
            //onChange={handleInputChange}
            onFocus={handleInputChange}
          />
        </FormControl>
      </Grid>

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