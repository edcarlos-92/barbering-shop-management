import React, { useState, useEffect } from 'react'
import SalesForm from "./SalesForm";
import SalesReceiptPage from "./SalesReceiptPage"
import PageHeader from "@edcarlos/libs/@edcartech/components/Controls/PageHeader";
import InfoIcon from '@mui/icons-material/Info';
import useTable from "@edcarlos/libs/@edcartech/components/UseTables";
import Controls from "@edcarlos/libs/@edcartech/components/Controls/Controls";
import { Search } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { FormPopup } from "@edcarlos/libs/@edcartech/components/Popups";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeSharp from '@mui/icons-material/RemoveRedEyeSharp';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from "@edcarlos/libs/@edcartech/components/ConfirmDialog";
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';
import AppAnimate from '@edcarlos/core/AppAnimate';
import { niceDateDefault, niceDateWithTime } from '@edcarlos/utility/Utils';//appIntl
import IntlMessages from '@edcarlos/utility/IntlMessages';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Paper, TableBody, TableRow, Toolbar, InputAdornment, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Button from "@mui/material/Button";
import AppInfoView from '@edcarlos/core/AppInfoView';
import Moment from 'moment';
import { appIntl } from "@edcarlos/utility/helper/Utils";
import { randomNum, retrieveObjectKeyValue, objectValueWithReference } from '@edcarlos/utility/Utils';
import {
    useQuery,
    useQueryClient,
    useMutation,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import axios from 'axios'
//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import {
    //mapDeptToUsersInCharge,
    doInsert,
    doUpdate,
    doDelete,
    getSalesBookingData,
    getCustomersData,
    getGrandTotalsData
} from '../../../redux/actions';
import { AppState } from '../../../redux/store';
//-------------------------Redux Store----------------------------------------

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const iconSize = {
    fontSize: 12,
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

const viewIcon = {
    borderRadius: '5px',
    height: 10,
    lineHeight: '10px',
    verticalAlign: 'middle',
    width: 21,
    minHeight: '24px',
    backgroundColor: defaultTheme.theme.palette.iconColors.viewBackground,
    color: defaultTheme.theme.palette.iconColors.viewFontColor,

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

const headCells = [
    { id: 'id', label: <IntlMessages id='common.booking_id' /> },
    { id: 'customer_name', label: <IntlMessages id='common.customer_name' /> },
    { id: 'booking_date', label: <IntlMessages id='booking_date.label' /> },
    { id: 'total_service_cost', label: <IntlMessages id='total_service_cost.label' /> },
    { id: 'payment_status', label: <IntlMessages id='payment_status.label' /> },
    { id: 'actions', label: 'Actions', disableSorting: true }
]



export default function ShopBooking() {

    const dispatch = useDispatch();
    useEffect(() => {
        getSalesBookingData(dispatch);
        getCustomersData(dispatch);
        getGrandTotalsData(dispatch);
    }, []);




    const { salesData, customersData, grandTotalData } = useSelector<AppState, AppState['barber']>(({ barber }) => barber,);


    const [recordForEdit, setRecordForEdit] = useState(null)
    const [recordViewDetails, setrecordViewDetails] = useState(null)
    const records = salesData;
    //const [records,setRecords]=useState([]);
    const [filterFn, setFilterFn] = useState({ fn: (items: any) => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [viewPopup, setViewPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })
    const [pages, setPages] = useState([10, 5, 50, 100, 150])


    const [grandTotalByRef, setGrandTotalByRef] = useState(grandTotalData);//0.00
    const [customerNames, setCustomerNames] = useState([])


    const { messages } = appIntl();
    const msgdelete = String(messages["common.createsuccess"])
    const msgconfirm = String(messages["common.confirmmsg"])
    const msgconfirmsub = String(messages["common.confirmmsgsub"])

    const SalesBookinginsertLog = String(messages["logactivity.SalesBookinginsert"])
    const SalesBookingupdateLog = String(messages["logactivity.SalesBookingupdatemsg"])
    const SalesBookingdeleteLog = String(messages["logactivity.SalesBookingdeletemsg"])


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn, pages);

    const handleSearch = (e: any) => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter((x: any) =>
                        x.customer_name.toLowerCase().includes(target.value) //|| 
                        //x.customer_email.toLowerCase().includes(target.value)
                    )
            }
        })
    }

    const addOrEdit = (formData: any, resetForm: any) => {
        if (formData.id == 0) {
            //console.log(`A call for Inserting`);
            dispatch(doInsert('barber/salesbookings/add_bookings', formData, 'salesbookings', SalesBookinginsertLog));
        } else {
            //console.log(`A call for Update`);
            dispatch(doUpdate('barber/salesbookings/update_bookings', formData, 'salesbookings', SalesBookingupdateLog));
        }

        resetForm()
        setRecordForEdit(null)
        setrecordViewDetails(null)
        setOpenPopup(false)
    }

    const openInPopup = (item: any) => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const viewDetailsInPopup = (item: any) => {
        setrecordViewDetails(item)
        setViewPopup(true)
    }

    const onDelete = (id: any) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        //console.log(`A call for Delete on ${id}`);
        dispatch(doDelete(`barber/salesbookings/delete_bookings?id=${id}`, 'salesbookings', SalesBookingdeleteLog));

        setNotify({
            isOpen: true,
            message: msgdelete,
            type: 'error'
        })
    }

    // useEffect(() => {
    //     console.log(`PopUp State`, openPopup)
    // }, [openPopup]);





    //======================================= SALES BOOKING  As direct run function =========================
    // const getCustomersNames = (()  =>{//Prerender with redux instead---------
    //     const { status, data, error, isFetching } = useQuery(
    //     'customersNames',
    //     async () => {
    //         const res = await axios.get(`/api/barber/customers/get_sales_customers`);
    //         //console.log(`customersNames At Index Page`,res.data.document);
    //         return setCustomerNames(res.data.document);
    //     },

    //     {
    //         // Refetch the data every second
    //         //refetchInterval: 1000, 
    //     }
    //     )
    //     })()





    const getGrandTotalGroupedByReference = () => {
        const { status, data, error, isFetching } = useQuery(
            'GrandTotalByRef',
            async () => {
                const res = await axios.get(`/api/barber/salesbookings/get_service_sales_ref_total_grouped_by_ref`)
                return setGrandTotalByRef(res.data.document);
            },
            {
                // Refetch the data every second
                refetchInterval: 1000,
            }
        )
    }

    useEffect(() => {
        //console.log(`Calculate the grand totals now`, getGrandTotalGroupedByReference())
    }, [salesData]);
    //======================================= SALES BOOKING ========================= 

    return (
        <>

            {records !== null ? (
                <>

                    <Box>
                        <PageHeader
                            title={<IntlMessages id='common.sales_booking.label' />}
                            subTitle={<IntlMessages id='common.sales_booking.sub.label' />}
                            icon={<InfoIcon fontSize="large" />}
                        />
                    </Box>


                    {/* sx={{display: 'flex',,flexDirection: 'row',p: 1,'& > :not(style)': {m: 1}}} */}

                    <Box m={1} sx={{ display: "flex", justifyContent: "flex-end", }}>
                        <Controls.Button
                            sx={{
                                position: "relative",
                                minWidth: 100,
                                ml: 2.5,
                            }}
                            color="primary"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            text={<IntlMessages id='addnew.label' />}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        />
                    </Box>

                    <Box>
                        <Controls.TextInput
                            variant="filled"
                            color="primary"// success
                            label={<IntlMessages id='quicksearch.label' />}
                            sx={{
                                paddingBottom: "10px"
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />
                    </Box>

                    <AppAnimate animation='transition.slideUpIn' delay={200}>

                        <TblContainer size='small' width='750' paddingTop='0px' paddingBottom='0px' >
                            <TblHead />

                            <TableBody>
                                {
                                    //rows.map((row) => (
                                    recordsAfterPagingAndSorting().map((item: any) => (
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCell component='th' scope='row'><IntlMessages id='common.serialcode.label' />{item.id}</StyledTableCell>
                                            <StyledTableCell align='left'>{objectValueWithReference(customersData, item.customer_id, `customer_name`)}</StyledTableCell>
                                            <StyledTableCell align='left'> {Moment(item.booking_date).format("ll")}</StyledTableCell>
                                            <StyledTableCell align='left'><IntlMessages id='common.currency.label' /> {(objectValueWithReference(grandTotalData, item.service_reference_id, `itemValue`))}</StyledTableCell>
                                            <StyledTableCell align='left'> {item.payment_status}</StyledTableCell>
                                            <StyledTableCell >
                                                <Box sx={{ display: 'flex', flexDirection: 'row', p: 1, '& > :not(style)': { m: 1 }, }} >
                                                    <Controls.ActionButton
                                                        sx={{ ...editIcon }}
                                                        onClick={() => { openInPopup(item) }}>
                                                        <EditOutlinedIcon sx={{ ...iconSize }} />
                                                    </Controls.ActionButton>

                                                    <Controls.ActionButton
                                                        sx={{ ...viewIcon }}
                                                        onClick={() => { viewDetailsInPopup(item) }}>
                                                        <RemoveRedEyeSharp sx={{ ...iconSize }} />
                                                    </Controls.ActionButton>

                                                    <Controls.ActionButton

                                                        sx={{ ...deleteIcon }}


                                                        onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: msgconfirm,
                                                                subTitle: msgconfirmsub,
                                                                onConfirm: () => { onDelete(item.id) }
                                                            })
                                                        }}>
                                                        <CloseIcon sx={{ ...iconSize }} />
                                                    </Controls.ActionButton>

                                                </Box>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </TblContainer>
                        <TblPagination />

                        <FormPopup
                            maxWidth="md" //'xs' | 'sm' | 'md' | 'lg' | 'xl'
                            title={<IntlMessages id='common.sales_booking.form.label' />}
                            openPopup={openPopup}
                            setOpenPopup={setOpenPopup}

                        >
                            <SalesForm
                                recordForEdit={recordForEdit}
                                addOrEdit={addOrEdit}
                                checkRef={openPopup}
                            />
                        </FormPopup>
                        <ConfirmDialog
                            confirmDialog={confirmDialog}
                            setConfirmDialog={setConfirmDialog}
                        />


                        <FormPopup
                            maxWidth="sm" //'xs' | 'sm' | 'md' | 'lg' | 'xl'
                            title={<IntlMessages id='common.receipt.details.label' />}
                            openPopup={viewPopup}
                            setOpenPopup={setViewPopup}
                        >
                            <SalesReceiptPage
                                recordViewDetails={recordViewDetails}
                            //detailView={detailView} 
                            />
                        </FormPopup>
                    </AppAnimate>
                    <AppInfoView />
                </>
            ) : null}
        </>
    )

}
