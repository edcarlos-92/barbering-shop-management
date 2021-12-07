import React, { useEffect, useState, useCallback } from 'react' //useState,
import Grid from '@mui/material/Grid';
import Controls from "@edcarlos/libs/@edcartech/components/Controls/Controls";
import { useForm, Forms } from '@edcarlos/libs/@edcartech/components/useForm';
import IntlMessages from '@edcarlos/utility/IntlMessages';
import * as yup from "yup";
import { appIntl } from "@edcarlos/utility/helper/Utils";
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
import Button from "@mui/material/Button";
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
import { silentInsert, silentDelete, getCustomersData, doSelect, uploadFileHandler, getFileUpload } from '../../../redux/actions';
import { AppState } from '../../../redux/store';
import { EXPENSES_TYPES, SHOP_ITEMS, TOTAL_EXPENSES } from '../../../types/actions/Barber.actions';
//-------------------------Redux Store----------------------------------------

import { useEventListener, useEventListeners } from '@edcarlos/utility/hooks';
import { useDropzone } from "react-dropzone";


//let GenRepeatersId = randomNum();
let finalToSave: any = {};
let Gtotal: any = 0;

const initialFValues = {
  id: 0,
  expenses_type_id: '',
  shop_expenses_reference_id: '',
  expenses_note: '',
  expenses_file: '',
  expenses_date: '',
  expenses_amount: 0,
  created_at: new Date(),

  shop_expenses_ref: {
    //id:'',
    //ex_shop_expenses_reference_id:'',
    item_id: 0,
    quantity: 0,
    total_cost: 0,
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


export default function ExpensesForm(props: any) {

  const dispatch = useDispatch();

  useEffect(() => {
    //getSalesBookingData(dispatch);
    getCustomersData(dispatch);
    //getGrandTotalsData(dispatch);
    dispatch(doSelect('barber/expenses/get_expenses_types', '', EXPENSES_TYPES));
    dispatch(doSelect('barber/expenses/get_expenses_items', '', SHOP_ITEMS));
    dispatch(doSelect('barber/expenses/get_shop_expenses_ref_total_grouped_by_ref', '', TOTAL_EXPENSES));

  }, []);


  const { salesData, customersData, grandTotalData, servicesData, expensesTypesData, shopItemsData } = useSelector<AppState, AppState['barber']>(({ barber }) => barber,);
  //totalExpensesData
  let totalExpensesData = [];
  const { systemUsersData } = useSelector<AppState, AppState['usereducer']>(({ usereducer }) => usereducer,);

  const { messages } = appIntl();
  const msgdelete = String(messages["common.createsuccess"])
  const msgconfirm = String(messages["common.confirmmsg"])
  const msgconfirmsub = String(messages["common.confirmmsgsub"])
  const { addOrEdit, recordForEdit, checkRef, fileData } = props

  const [salesCutomer, setSalesCustomer] = useState([])
  const [salesBarber, setSalesBarber] = useState([])
  //const [shopItems,setSalesService] = useState([])
  const shopItems = shopItemsData;
  let serviceType: any = shopItems;

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors }
    if ('expenses_type_id' in fieldValues) temp.expenses_type_id = fieldValues.expenses_type_id.length != 0 ? "" : <RequiredFieldMessage />
    if ('expenses_date' in fieldValues) temp.expenses_date = fieldValues.expenses_date.length != 0 ? "" : <RequiredFieldMessage />
    if ('expenses_note' in fieldValues) temp.expenses_note = fieldValues.expenses_note.length != 0 ? "" : <RequiredFieldMessage />
    //if ('customer_email' in fieldValues)temp.customer_email = fieldValues.customer_email.length != 0 || Emailregex.test(fieldValues.customer_email) === true ? "" : <IntlMessages id='common.invalidmail.label'/> ;  //!fieldValues.customer_email || Emailregex.test(fieldValues.customer_email) === false ? <IntlMessages id='common.invalidmail.label'/> : "";
    //if ('status' in fieldValues)temp.status = fieldValues.status.length != 0 ? "" : <RequiredFieldMessage />
    //if ('expenses_file' in fieldValues)temp.expenses_file = fieldValues.expenses_file.length != 0 ? "" : <RequiredFieldMessage />
    if ('shop_expenses_reference_id' in fieldValues) temp.shop_expenses_reference_id = fieldValues.shop_expenses_reference_id.length != 0 ? "" : <RequiredFieldMessage />
    //  if ('quantity' in fieldValues)temp.quantity = fieldValues.quantity.length != 0  ? "" : <IntlMessages id='common.fieldrequired.label'/>
    //  if ('discount_type' in fieldValues)temp.discount_type = fieldValues.discount_type.length != 0  ? "" : <IntlMessages id='common.fieldrequired.label'/>
    //  if ('discount' in fieldValues)temp.discount = fieldValues.discount.length != 0  ? "" : <IntlMessages id='common.fieldrequired.label'/>
    //  if ('total_cost' in fieldValues)temp.total_cost = fieldValues.total_cost.length != 0  ? "" : <IntlMessages id='common.fieldrequired.label'/>
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
    //values.get_file_upload = "I just Rechanged the  partern";
    if (validate() && values.expenses_amount !== 0) {//
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
      return values.shop_expenses_reference_id !='' ? values.shop_expenses_reference_id : GenRepeatersId
  }
  */



  // const [shopItemValue,setShopItemValue] = useState(values.shop_expenses_ref.item_id != '' ? values.shop_expenses_ref.item_id : '')
  const [shopItemValue, setShopItemValue] = useState([])
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [discount, setDiscount] = useState(0)
  const [discount_type, setDiscountType] = useState([])
  const [total_cost, setTotalCost] = useState(0);

  let [repeatersID, setRepeatersID] = useState(values.shop_expenses_reference_id != '' ? values.shop_expenses_reference_id : randomNum());

  //console.log(`Updating ID`,values.shop_expenses_reference_id)
  //console.log(`State ID`,repeatersID)


  const [repeaterInputField, setRepeaterInputFields] = useState([{ id: uuidv4(), ex_shop_expenses_reference_id: repeatersID, ...initialFValues.shop_expenses_ref }]);

  const [referenceInfo, setReferenceInfo] = useState([]);
  const [editService, setEditService] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })
  const [editID, setEditID] = useState(0)

  const [grandTotal, setGrandTotal] = useState(values.expenses_amount !== '' ? values.expenses_amount : 0.00)


  const [smsNotification, setSmsNotification] = useState(values.sms_notification != '' ? values.sms_notification : false);
  const [emailNotification, setEmailNotification] = useState(values.email_notification != '' ? values.email_notification : false);
  const [pushNotification, setPushNotification] = useState(values.push_notification != '' ? values.push_notification : false);


  const handleNotificationChange = (event, type) => {
    if (type == 'sms') {
      //values.sms_notification = event.target.checked;
      setSmsNotification(event.target.checked);
      //console.log(`sms`,event.target.checked);
      //console.log(`initialFValues.sms_notification`,values.sms_notification);
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

  //if(values.expenses_amount !== 0 ){
  values.sms_notification = smsNotification;
  values.email_notification = emailNotification;
  values.push_notification = pushNotification;
  //}
  //console.log(`values.expenses_amount`,values.expenses_amount);
  //console.log(`initialFValues.push_notification`,values.push_notification);  
  //console.log(`initialFValues.email_notification`,values.email_notification);
  //console.log(`initialFValues.sms_notification`,values.sms_notification);


  // const getCheckBoxes = (()=>{
  //     initialFValues.sms_notification = smsNotification;
  //     initialFValues.email_notification = emailNotification;
  //     initialFValues.push_notification = pushNotification;

  //     console.log(`initialFValues.sms_notification`,initialFValues.sms_notification);
  //     console.log(`initialFValues.email_notification`,initialFValues.email_notification);
  //     console.log(`initialFValues.push_notification`,initialFValues.push_notification);

  // })()


  /*
      const handleServiceChange =  async (getServiceID,getQuantity,getDiscountType,getDiscount,getRepeaterId,getEvent) => {//getDiscountType 
          
          //Get the corresponding value now
          if (getServiceID != ''){
              try{
                 await Axios({
                      method: 'GET',
                      url: `/barber/shopservices/get_sales_services?id=${getServiceID}`,
                      })
                  .then(response =>{
                      servicePrice=response.data.document[0].service_price;
  
                      getQuantity == '' || getQuantity == 0 ? getQuantity = 1 : getQuantity
                      getDiscountType == '' || getDiscountType == 0 ? getDiscountType = 'None' : getDiscountType
  
                      let finalCost = (getQuantity * servicePrice);
                      let finalDiscount = 0;
                      if(getDiscountType == 'Percent-%' && getDiscount > 0){
                          finalDiscount = finalCost * (getDiscount/100)
                          setTotalDiscount(parseInt(finalDiscount.toFixed(1)));
                          defaultTotal = finalCost - finalDiscount;
                          setTotalCost( finalCost - finalDiscount );
                          //console.log(`To Pay in GHC `,defaultTotal,`getRepeaterId`,getRepeaterId,`getEvent`,getEvent);
                         
                         //Add Repeater Now
                         handleRepeaterInputChange(getRepeaterId,getEvent,defaultTotal,getQuantity,getDiscountType,getDiscount,getServiceID);
                        
                      }
                      else if(getDiscountType == 'Value' && getDiscount > 0 ){
                          setTotalDiscount(getDiscount);
                          defaultTotal = finalCost - getDiscount;
                          setTotalCost( finalCost - getDiscount );
                          //console.log(`To Pay in GHC `,defaultTotal,`getRepeaterId`,getRepeaterId,`getEvent`,getEvent);
                         
                          //Add Repeater Now
                         handleRepeaterInputChange(getRepeaterId,getEvent,defaultTotal,getQuantity,getDiscountType,getDiscount,getServiceID);                       
                         
                      }
                      else{
                          setTotalDiscount(0);
                          defaultTotal = finalCost;
                          setTotalCost(finalCost);
                          
                          //Add Repeater Now
                          handleRepeaterInputChange(getRepeaterId,getEvent,defaultTotal,getQuantity,getDiscountType,getDiscount,getServiceID);
                          //console.log(`To Pay in GHC `,defaultTotal,`getRepeaterId`,getRepeaterId,`getEvent`,getEvent);
                          //setDiscount(0);
                         
                      }
                  } )
                  .catch(err => console.log(err));
                }
               catch (e:any) {
                console.log(e.message)
              }  
          }
      }
  
      */



  //===================== Repaeters Dynamic Entries =======================
  //===================== Repaeters Dynamic Entries =======================

  // useEffect(() => {//Use this to Calculate the total or use eventHandler Below
  //     //check to see if the total changes then make calculations bases on matched db info on unique id
  //     setTotalCost(total_cost)
  //     //referenceInfo


  //   }, [total_cost])


  // const handleRepeaterInputChange = (id, event,subtotal,Quantity,DiscountType,Discount,ItemID) => {
  const handleRepeaterInputChange = (id, event, Quantity, TotalCost, ItemID) => {

    getJSON()


    setRepeatersID(values.shop_expenses_reference_id != '' ? repeaterInputField[0].ex_shop_expenses_reference_id = values.shop_expenses_reference_id : repeatersID);//    GenRepeatersId
    //setRepeatersID(values.shop_expenses_reference_id !='' ? repeaterInputField[0].ex_shop_expenses_reference_id = values.shop_expenses_reference_id : GenRepeatersId || grandTotal == 0 ? Generator() :  GenRepeatersId );
    //values.shop_expenses_reference_id !='' ? repeaterInputField[0].ex_shop_expenses_reference_id = values.shop_expenses_reference_id : GenRepeatersId
    const newInputFields = repeaterInputField.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    //repeaterInputField[0].id = uuidv4();
    //repeaterInputField[0].id == newInputFields[0].id ? newInputFields[0].id = uuidv4() : newInputFields[0].id  ;


    newInputFields[0].quantity = Quantity;
    newInputFields[0].total_cost = TotalCost;
    newInputFields[0].item_id = ItemID;
    // console.log(`------- Added ------`)
    // console.log(`Generated id` ,newInputFields[0].id);
    // console.log(`Existing id` ,repeaterInputField[0].id);
    // console.log(`reference_id`,newInputFields[0].ex_shop_expenses_reference_id)
    // console.log(`item_id`,newInputFields[0].item_id)
    // console.log(`------------------------------------------`)
    setRepeaterInputFields(newInputFields);
    console.log(`------------------------------------------`, newInputFields)


  }

  const handleRepeaterAddFields = () => {
    // console.log(`Service Type ?`, shopItemValue)
    // console.log(`Discount Type ?`, discount_type)
    if (shopItemValue === [] || total_cost === 0) {
      toast.error(String(messages["message.ItemInfoRequired"]), {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: true
      });
      //return;
    } else {
      //console.log(`Service Type ?`, shopItemValue)
      //GenRepeatersId=Generator();
      //getJSON();

      finalToSave = repeaterInputField;
      //console.log(`To be added to the ref table`,finalToSave);

      //console.log(`oooooooooooooooooooooMain Table ID Before insert ooooooooooooooooo `,repeaterInputField[0].id);
      //Insert Records Now
      dispatch(silentInsert('barber/expenses/add_shop_expenses_ref', finalToSave, ''));
      //dispatch(silentInsert('barber/expenses/add_service_sales_ref',finalToSave,'silentoperations'));
      //Set TextField Back to normal

      //setShopItemValue([]);
      //setDiscountType([]);
      //setShopItemValue(0);
      repeaterInputField[0].id = uuidv4();
      //console.log(`oooooooooooooooooooooMain Table ID After insertion ooooooooooooooo `,repeaterInputField[0].id);
      //repeaterInputField[0].item_id = 0;
      setRepeaterInputFields(repeaterInputField);

    }

  }

  //===================== Repaeters Dynamic Entries =======================
  //===================== Repaeters Dynamic Entries =======================
  const getJSON = async () => {
    const element: any = document.querySelector('#shop_expenses_reference_id'); //,#shop_expenses_reference_id  ,#sms_notification,#email_notification,#push_notification
    element.addEventListener('click', () => console.log(' click Dependants'))
    const event = new Event('new change Text');
    await element.dispatchEvent(event);
    //handle Focus const handleFocus = event => {
    event.preventDefault();
    const { target }: any = event;
    const extensionStarts = target.value.lastIndexOf('.');
    await target.focus();
    await target.setSelectionRange(0, extensionStarts);

    //values.shop_expenses_reference_id !='' ? repeaterInputField[0].ex_shop_expenses_reference_id = values.shop_expenses_reference_id && setRepeatersID(values.shop_expenses_reference_id) : GenRepeatersId = values.shop_expenses_reference_id

    setRepeatersID(values.shop_expenses_reference_id != '' ? repeaterInputField[0].ex_shop_expenses_reference_id = values.shop_expenses_reference_id : repeatersID);//    GenRepeatersId
    //setRepeatersID(values.shop_expenses_reference_id !='' ? repeaterInputField[0].ex_shop_expenses_reference_id = values.shop_expenses_reference_id : GenRepeatersId)
    //values.shop_expenses_reference_id !='' ? values.shop_expenses_reference_id : randomNum()
  }
  const openInPopup = (item: any) => {
    setEditService(item);

    setEditID(item.id)
    //console.log(`Existing Edit ID`,editID)
    //console.log(`Incomming Edit ID`,item.id)
    if (editID != item.id) {
      repeaterInputField[0].id = item.id;
      repeaterInputField[0].ex_shop_expenses_reference_id = item.ex_shop_expenses_reference_id;
      setShopItemValue(item.item_id);
      setQuantity(item.quantity);
      //setDiscountType(item.discount_type);
      //setDiscount(item.discount);
      setTotalCost(item.total_cost);
      setRepeaterInputFields([...repeaterInputField]);

    }

  }
  const onDelete = (id: any) => {
    dispatch(silentDelete(`barber/expenses/delete_shop_expenses_ref?id=${id}`, 'silentoperations'));
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

  /*
const getBarbers = (()  =>{
  
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
*/


  /*
  const getServices = (()  =>{
      
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
      */



  const getmapExpenses = (() => {

    const { status, data, error, isFetching } = useQuery(
      'mapExpenses',
      async () => {
        const res = await axios.get(`/api/barber/expenses/get_shop_expenses_ref`)
        return setReferenceInfo(res.data.document);
      },
      {
        // Refetch the data every second
        refetchInterval: 1000,
      }
    )
  })()



  const gettotalExpenses = (() => {
    const { status, data, error, isFetching } = useQuery(
      'maptotalExpenses',
      async () => {
        const res = await axios.get(`/api/barber/expenses/get_shop_expenses_ref_total_grouped_by_ref`)
        console.log(`All Totals `, res.data.document)
        console.log(`All Totals Fully converted `, objectValueWithReference(res.data.document, repeatersID, `itemValue`))
        return Gtotal = objectValueWithReference(res.data.document, repeatersID, `itemValue`);
        //return setReferenceInfo(res.data.document);  
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
          //values.expenses_amount = res.data.document[0].expenses_amount == null || res.data.document[0].expenses_amount == 0 || total_cost == 0 ? 0.00 : (res.data.document[0].expenses_amount).toFixed(2)
          //return setGrandTotal(res.data.document[0].expenses_amount == null || res.data.document[0].expenses_amount == 0 || total_cost == 0 ? 0.00 : (res.data.document[0].expenses_amount).toFixed(2));

          //if(referenceInfo !== null)
          // if(total_cost !== 0){
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

  //values.expenses_amount = res.data.document[0].expenses_amount == null || res.data.document[0].expenses_amount == 0 || total_cost == 0 ? 0.00 : (res.data.document[0].expenses_amount).toFixed(2)

  useEffect(() => {
    //Gtotal= objectValueWithReference(totalExpensesData,repeatersID,`itemValue`);
    values.expenses_amount = Gtotal == null || Gtotal === 0 || Gtotal === '' || total_cost === 0 ? 0.00 : Gtotal //parseInt(Gtotal).toFixed(2)
    setGrandTotal(values.expenses_amount);
    //objectValueWithReference(grandTotalData,repeatersID,`itemValue`)
    console.log(`UseEffect Grand Total `, Gtotal)
    console.log(`UseEffect Grand Total Value `, values.expenses_amount)
    //values.expenses_amount = res.data.document[0].expenses_amount == null || res.data.document[0].expenses_amount == 0 || total_cost == 0 ? 0.00 : (res.data.document[0].expenses_amount).toFixed(2)
    //return setGrandTotal(res.data.document[0].expenses_amount == null || res.data.document[0].expenses_amount == 0 || total_cost == 0 ? 0.00 : (res.data.document[0].expenses_amount).toFixed(2));
    //grandTotalData
  }, [Gtotal]);//totalExpensesData


  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = useCallback(({ clientX, clientY }) => {
    //setGrandTotal(values.expenses_amount);
  },
    [repeatersID]
  );
  // Add event listener using the hook
  useEventListener('mousemove', handler);



  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      //-----------------------Use Axios to Upload Now
      let currentFile = acceptedFiles[0];
      const originalFilename = currentFile.name.replace(/[^\x00-\x7F]/g, "");
      const fileExtension = originalFilename.split('.').pop();

      const fdata = new FormData();

      const FileName = `${Date.now()}.${fileExtension}`;
      fdata.append("File", currentFile);
      fdata.append("id", `${values.id}`);
      fdata.append("filename", FileName);

      if (values.expenses_file !== '') {
        fdata.append("oldfilename", values.expenses_file);
      }


      console.log("fdata: ", fdata)
      console.log("currentFile: ", currentFile);


      values.get_file_upload = fdata;
      values.expenses_file = FileName;
      dispatch(getFileUpload(fdata));
      //uploadFileHandler(fdata,`policy/import_policy_records`);

    },
  });




  return (

    <Forms onSubmit={handleSubmit} >

      <Grid item md={12} sm={12} xs={12} >
        <Box component="h4" sx={{ fontWeight: Fonts.SEMI_BOLD, color: red[900] }}>
          <IntlMessages id="common.expensesinfo" />
        </Box>
      </Grid>

      <Grid item md={3} sm={6} xs={12} >
        <FormControl sx={{ minWidth: 185 }} >
          <Controls.BasicSelect
            id="expenses_type_id"
            name="expenses_type_id"
            label={<IntlMessages id='expenses_type_id.label' />}
            value={values.expenses_type_id}
            options={expensesTypesData}
            displayField={`expenses_name`}
            onChange={handleInputChange}
            error={errors.expenses_type_id}
          />
        </FormControl>
      </Grid>


      <Grid item md={3} sm={6} xs={12} >
        <FormControl sx={{ minWidth: 185 }} >
          <Controls.TextInput
            id="expenses_note"
            name="expenses_note"
            label={<IntlMessages id='expenses_note.label' />}
            value={values.expenses_note}
            onChange={handleInputChange}
            error={errors.expenses_name}
          />
        </FormControl>
      </Grid>

      <Grid item md={3} sm={6} xs={12} >
        <FormControl sx={{ width: 180 }}>
          <DefaultDatePicker
            name="expenses_date"
            label={<IntlMessages id='expenses_date.label' />}
            value={values.expenses_date}
            onChange={handleInputChange}
            error={errors.expenses_date}
          />
        </FormControl>
      </Grid>


      <Grid item md={3} sm={6} xs={12} >
        <FormControl sx={{ minWidth: 185, mt: 2 }} >
          <Box sx={{}} {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} name="expenses_file" id="expenses_file" />

            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              color="success"
            >
              <IntlMessages id='expenses_file.label' />
            </Button>
          </Box>
        </FormControl>
      </Grid>



      <h4 style={{ fontWeight: Fonts.BOLD, color: green[900], marginBottom: 15, marginTop: 15, marginLeft: 15 }} ><IntlMessages id="common.shopiteminfo" /></h4>
      <h6 style={{ fontWeight: Fonts.MEDIUM, color: red[900], marginBottom: 15, marginTop: 19, marginLeft: 5 }}><IntlMessages id="common.repeater.description" /></h6>

      {

        (values.shop_expenses_reference_id == 'undefined' || values.shop_expenses_reference_id == '' || values.shop_expenses_reference_id == null) ?
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
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left" ><IntlMessages id="item_id.short" /></TableCell>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left"><IntlMessages id="quantity.short" /></TableCell>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left"><IntlMessages id="total_cost.short" /></TableCell>
                      <TableCell align="left">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {rows.map((row) => ( */}
                    {referenceInfo.map((item: any) => (
                      item.ex_shop_expenses_reference_id === values.shop_expenses_reference_id ? (

                        <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="left" component="th" scope="row" >{objectValueWithReference(shopItems, item.item_id, `item_name`)}</TableCell>
                          <TableCell align="left" >{item.quantity}</TableCell>
                          <TableCell align="left"><IntlMessages id='common.currency.label' /> {item.total_cost}</TableCell>
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
              id="item_id"
              name="item_id"
              label={<IntlMessages id='item_id.label' />}
              value={shopItemValue}
              options={shopItems}
              displayField={`item_name`}
              onChange={(e) => {
                setShopItemValue(e.target.value);
                //quantity ==null || quantity == 0 ? setQuantity(1) : quantity
                //discount ==null ? setDiscount(0) : discount
                handleRepeaterInputChange(repeaterItems.id, e, quantity, total_cost, e.target.value);
                //handleServiceChange(e.target.value,quantity,discount_type,discount,repeaterItems.id, e);
              }}
              error={errors.item_id}
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
                //e.target.value =='' || e.target.value == 0 ? e.target.value=1 : e.target.value
                //discount ==null ? setDiscount(0) : discount
                handleRepeaterInputChange(repeaterItems.id, e, e.target.value, total_cost, shopItemValue);
                //handleServiceChange(shopItemValue,e.target.value,discount_type,discount,repeaterItems.id, e);


                //handleRepeaterInputChange(repeaterItems.id, e)
              }}
              /*
              onInput={e =>  {
                  setQuantity(e.target.value);  
                  e.target.value =='' || e.target.value == 0 ? e.target.value=1 : e.target.value
                  discount =='' ? setDiscount(0) : discount
                  handleServiceChange(shopItemValue,e.target.value,discount_type,discount);                           
              }}
              */
              error={errors.quantity}
            />
          </FormControl>
          {/* </Grid> */}

          {/* <Grid item md={1.5} sm={2.5} xs={12} >  */}

          {/* </Grid> */}

          {/* <Grid item md={1.5} sm={2.5} xs={12} > */}

          {/* </Grid> */}

          {/* <Grid item md={1.5} sm={2.5} xs={12} > */}
          <FormControl sx={{ width: { md: 90, sm: 90, sx: 185 }, ml: { md: 4, sm: 5 } }}       >
            <Controls.TextInput
              style={{ fontSize: "15px" }}
              sx={PageCSS}
              //size="small"
              //disabled

              id="total_cost"
              type="number"
              name="total_cost"
              label={<IntlMessages id='total_cost.label' />}
              value={total_cost}
              onChange={(e) => {
                //handleInputChange;
                setTotalCost(e.target.value);
                handleRepeaterInputChange(repeaterItems.id, e, quantity, e.target.value, shopItemValue);
                //handleServiceChange(shopItemValue,quantity,discount_type,discount,repeaterItems.id, e);
                //handleRepeaterInputChange(repeaterItems.id, e)
              }}
              error={errors.total_cost}
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
            id="expenses_amount"
            type="number"
            name="expenses_amount"
            //label={<IntlMessages id='expenses_amount.label'/>}
            value={grandTotal}
            //value={`${grandTotal}`}
            //onChange={handleInputChange}
            error={errors.expenses_amount}
          />
        </FormControl>
      </Grid>



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
            id="shop_expenses_reference_id"
            size="small"
            //ref={depRef}
            type=""//password
            name="shop_expenses_reference_id"
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