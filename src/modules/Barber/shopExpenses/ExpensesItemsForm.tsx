import React, { useEffect, useState, useCallback } from 'react' //useState,
import Grid from '@mui/material/Grid';
import Controls from "@edcarlos/libs/@edcartech/components/Controls/Controls";
import { useForm, Forms } from '@edcarlos/libs/@edcartech/components/useForm';
import IntlMessages from '@edcarlos/utility/IntlMessages';
import { appIntl } from "@edcarlos/utility/helper/Utils";
//-==========================FORM TEST================================================
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Fonts } from "shared/constants/AppEnums";
import { green, red } from '@mui/material/colors';
import { RequiredFieldMessage } from '@edcarlos/libs/@edcartech/components/FieldAlertMessages'
//==========================FROM TEST===================================================

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

const initialFValues = {
  id: 0,
  item_name: '',
  description: '',
  created_at: new Date()
}

const PageCSS = {
  repeatersIconSize: {
    fontSize: 35,
    color: '#fff',
    background: '#10380d',
    borderRadius: `50%`,
    marginLeft: '6px',
    marginRight: '2px'
    //borderRaduis:'50%'
  },
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

export default function ShopItemsForm(props: any) {

  const dispatch = useDispatch();
  useEffect(() => {
    getCustomersData(dispatch);
  }, []);

  const { salesData, customersData, grandTotalData, servicesData } = useSelector<AppState, AppState['barber']>(({ barber }) => barber,);
  const { systemUsersData } = useSelector<AppState, AppState['usereducer']>(({ usereducer }) => usereducer,);

  const { messages } = appIntl();
  const msgdelete = String(messages["common.createsuccess"])
  const msgconfirm = String(messages["common.confirmmsg"])
  const msgconfirmsub = String(messages["common.confirmmsgsub"])
  const { addOrEdit, recordForEdit, checkRef } = props

  const validate = (fieldValues = values) => {
    let temp: any = { ...errors }
    if ('item_name' in fieldValues) temp.item_name = fieldValues.item_name.length != 0 ? "" : <RequiredFieldMessage />
    if ('description' in fieldValues) temp.description = fieldValues.description.length != 0 ? "" : <RequiredFieldMessage />

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

    if (values.item_name !== '') {//
      addOrEdit(values, resetForm);
    }
  }

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit
      })
  }, [recordForEdit])


  const [repeaterInputField, setRepeaterInputFields] = useState([{ ...initialFValues }]);
  const [expensesInfo, setExpensesInfo] = useState([]);

  const [expenseName, setExpenseName] = useState(values.item_name);
  const [description, setDescription] = useState(values.description)

  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })

  const handleRepeaterInputChange = (id, event) => {
    const newInputFields = repeaterInputField.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    //console.log(`handleRepeaterInputChange`,newInputFields );
    setRepeaterInputFields(newInputFields);
  }

  const handleRepeaterAddFields = () => {
    if (values.item_name !== '') {
      toast.error(String(messages["message.expensesrequired"]), {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: true
      });
      //return;
    } else {

      dispatch(silentInsert('barber/expenses/add_edit_expenses_items', repeaterInputField, ''));

      //repeaterInputField[0].id = uuidv4();
      setRepeaterInputFields(repeaterInputField);

    }

  }

  const sendToEditField = (item: any) => {
    repeaterInputField[0].id = item.id;
    repeaterInputField[0].item_name = item.item_name;
    repeaterInputField[0].description = item.description;
    setRepeaterInputFields([...repeaterInputField]);
    setExpenseName(item.item_name);
    setDescription(item.description);
  }

  const onDelete = (id: any) => {
    dispatch(silentDelete(`barber/expenses/delete_expenses_item?id=${id}`, ''));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })

  }
  //======================================= EXPENSES TYPE BOOKING  As direct run function =========================

  const getexpensesTypes = (() => {

    const { status, data, error, isFetching } = useQuery(
      'expensesTypes',
      async () => {
        const res = await axios.get(`/api/barber/expenses/get_expenses_items`)
        //console.log(`expensesTypes`,res.data.document);
        return setExpensesInfo(res.data.document);
      },
      {
        // Refetch the data every second
        refetchInterval: 1000,
      }
    )
  })()

  return (

    <Forms onSubmit={handleSubmit} >

      {/* <Grid item md={12} sm={12} xs={12} >           
                <Box component="h4" sx={{ fontWeight: Fonts.SEMI_BOLD, color: red[900] }}>
                  <IntlMessages  id="common.bookinginfo" />
                </Box>
              </Grid> */}






      {/* <h4 style={{ fontWeight: Fonts.BOLD, color: green[900],marginBottom:15,marginTop:15,marginLeft:15 }} ><IntlMessages  id="common.salesinfo" /></h4> */}
      <h6 style={{ fontWeight: Fonts.MEDIUM, color: red[900], marginBottom: 15, marginTop: 19, marginLeft: 5 }}><IntlMessages id="common.repeater.description" /></h6>




      {repeaterInputField.map(repeaterItems => (

        <Container key={repeaterItems.id} sx={{ mt: 2, mb: 5 }}>

          {/* <Grid item md={3} sm={6} xs={12} > */}
          <FormControl sx={{ minWidth: 180, ml: { xs: 5, sm: 5 }, mb: { xs: 2, sm: 2 } }} >
            <Controls.TextInput
              id="item_name"
              name="item_name"
              label={<IntlMessages id='item_name.label' />}
              value={expenseName}
              //options={customersData}  //salesCutomer
              //displayField={`customer_name`}
              onChange={(e) => {
                handleRepeaterInputChange(repeaterItems.id, e);
                setExpenseName(e.target.value);
              }}
              error={errors.item_name}
            />
          </FormControl>
          {/* </Grid> */}

          {/* <Grid item md={3} sm={6} xs={12} > */}
          <FormControl sx={{ width: 180, ml: { xs: 5, sm: 5 }, mb: { xs: 2, sm: 2 } }}>
            <Controls.TextInput
              id="description"
              name="description"
              label={<IntlMessages id='common.description' />}
              value={description}
              // onChange={handleInputChange}
              onChange={(e) => {
                handleRepeaterInputChange(repeaterItems.id, e);
                setDescription(e.target.value);
              }}
              error={errors.description}
            />
          </FormControl>

          <IconButton
            onClick={handleRepeaterAddFields}
          >
            <AddIcon color='success' sx={{ ...PageCSS.repeatersIconSize }} />
            <h5>{<IntlMessages id='add.more.label' />}</h5>
          </IconButton>
        </Container>
      ))}


      {
        (expensesInfo.length === undefined || expensesInfo.length == null) ?
          <Typography sx={{ display: 'block' }}><IntlMessages id="reference.details" /> </Typography>
          :

          (

            expensesInfo !== null || expensesInfo !== [] ? (
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left" ><IntlMessages id="item_id.short" /></TableCell>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left"><IntlMessages id="item_name.short" /></TableCell>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left"><IntlMessages id="common.description" /></TableCell>
                      <TableCell sx={{ fontWeight: Fonts.BOLD }} align="left"><IntlMessages id="common.date" /></TableCell>
                      <TableCell align="left">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expensesInfo.map((item: any) => (

                      <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center" component="th" scope="row" >{item.id}</TableCell>
                        <TableCell align="left" >{item.item_name}</TableCell>
                        <TableCell align="left">{item.description}</TableCell>
                        <TableCell align="left">{Moment(item.created_at).format("ll")}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'row', p: 0, '& > :not(style)': { m: 1 }, }} >
                            <Controls.ActionButton
                              sx={{ ...editIcon }}
                              onClick={() => { sendToEditField(item) }}>
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


      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: "none",//flex
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
      {/* ) : null }   */}
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