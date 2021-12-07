import React, { useEffect, useState, useRef } from 'react' //useState,
import Moment from 'moment';

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import IntlMessages from "@edcarlos/utility/IntlMessages";
//import Header from "./tempRef/DetailItems/Header";
//import ItemList from "./tempRef/DetailItems";
import { Fonts } from "shared/constants/AppEnums";
import AppTableContainer from "@edcarlos/core/AppTableContainer";
import AppAnimate from "@edcarlos/core/AppAnimate";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { appDirectories, companyInformation } from "shared/constants/AppConst";
import Avatar from "@mui/material/Avatar";


//import recordViewDetails from "../../../@edcarlos/services/db/extraPages/invoice/recordViewDetails";
import Typography from "@mui/material/Typography";
// @ts-ignore
import Logo from "../../../assets/icon/logo.svg";
import { useThemeContext } from "@edcarlos/utility/AppContextProvider/ThemeContextProvider";
//import recordViewDetails from "@edcarlos/services/db/extraPages/invoice/recordViewDetails";
import Axios, { setAuthToken } from '@edcarlos/services/auth/jwt-auth';

import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
//import invoiceData from "../../../../@edcarlos/services/db/extraPages/invoice/invoiceData";
import Table from "@mui/material/Table";
//import TableHeading from "./TableHeading";
//import TableItem from "./TableItem";

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { green, red } from '@mui/material/colors';

import ReactToPrint from 'react-to-print';
import IconButton from '@mui/material/IconButton/IconButton';
import PrintIcon from '@mui/icons-material/Print';

import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import axios from 'axios'
import { randomNum, retrieveObjectKeyValue, objectValueWithReference } from '@edcarlos/utility/Utils';

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


const StyledTable = styled(Table)(() => ({
  "& > thead > tr > th, & > tbody > tr > th, & > tfoot > tr > th, & > thead > tr > td, & > tbody > tr > td, & > tfoot > tr > td":
  {
    padding: 8,
  },
}));



export default function SalesReceiptPage(props: any) {
  //be2102  Background https://codepen.io/JewettCitySoftwareCorporation/pen/GLLBeG?editors=1000
  const dispatch = useDispatch();
  useEffect(() => {
    // getSalesBookingData(dispatch);
    getCustomersData(dispatch);
    // getGrandTotalsData(dispatch);
  }, []);

  const { recordViewDetails } = props
  const { companyContactInfo, companyName } = companyInformation



  const { customersData } = useSelector<AppState, AppState['barber']>(({ barber }) => barber,);


  const [referenceInfo, setReferenceInfo] = useState([])
  const [salesService, setSalesService] = useState([])
  //const [customersData,setCustomersData] = useState([])

  let serviceType: any = salesService;


  const [clientsInfo, setClientsInfo] = useState([recordViewDetails])
  const mountedRef = useRef(true)
  const componentRef = useRef(null);

  console.log(`recordViewDetails`, recordViewDetails)



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

  /*
 const getCustomersNames = (()  =>{//Prerender with redux instead---------
  const { status, data, error, isFetching } = useQuery(
  'customersNames',
  async () => {
      const res = await axios.get(`/api/barber/customers/get_sales_customers`);
      console.log(`customersNames At Receipt Page`,res.data.document);
      return setCustomersData(res.data.document);
  },
  
  {
      // Refetch the data every second
      //refetchInterval: 1000, 
  }
  )
  })()
*/


  /*
async function mapServices(){
    const token:any = localStorage.getItem("token");
      let API_Link = 'policy/dependants/get_dependants'
      if (recordViewDetails.dependants === ''){
        API_Link = 'policy/dependants/get_dependants'
      }
      else{
        API_Link = `/${API_Link}?id=${recordViewDetails.dependants}`
      }
      await Axios({
          method: 'GET',
          url: API_Link,
          headers: {Authorization: `Bearer ${token}`},
          })
      .then(response =>{
         if (!mountedRef.current) return null 
         setReferenceInfo(response.data.document);
      } )
      .catch(err => console.log(err));
  }
  */


  useEffect(() => {
    //mapServices(); 
    return () => {
      mountedRef.current = false
    }
  }, [referenceInfo]);



  return (

    <>
      {/* <button>Print this out!</button> */}
      <ReactToPrint
        trigger={() => <IconButton > <PrintIcon color='primary' /> </IconButton>}
        content={() => componentRef.current}
      />

      {/* <h1>{recordViewDetails.id}</h1>
      <h1>{recordViewDetails.aecighanatwelve_rtrir}</h1>   */}

      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <Box
          ref={componentRef}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Box sx={{ flex: 1, maxWidth: 900, width: "100%" }}>
            <Card
              sx={{
                p: { xs: 6, xl: 8 },
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
              }}
            >

              {/* The Header */}

              <div id="receipt-POS">

                <span>
                  <h2 id="serialcode" className="right-content" ><IntlMessages id='common.serialcode.label' />-{recordViewDetails.id}</h2>
                </span>

                <span id="top">
                  {/* <div className="logo "></div> */}

                  <div className="info">
                    <h2 className="center-content make-bold">{companyName}</h2>
                    <p className="center-content"> In God we Trust </p>
                  </div>
                </span>
                {/* <!--End Info--> */}

                {/* <!--End InvoiceTop--> */}

                <div id="mid">
                  <div className="info">
                    <h6>{objectValueWithReference(customersData, recordViewDetails.customer_id, `customer_name`)}</h6>
                    <p>
                      {/* <!-- Address : street city, state 0000</br> --> */}
                      <IntlMessages id='common.phone' />   : {objectValueWithReference(customersData, recordViewDetails.customer_id, `customer_phone`)}<br />
                      {/* <IntlMessages id='common.email'/>   : {objectValueWithReference(customersData,recordViewDetails.customer_id,`customer_email`)}<br/> */}
                    </p>
                  </div>
                </div>
                {/* <!--End Invoice Mid--> */}

                <div id="bot">

                  {

                    (recordViewDetails.service_reference_id == 'undefined' || recordViewDetails.service_reference_id == '' || recordViewDetails.service_reference_id == null) ?
                      <IntlMessages id="common.receipt.noderecord" />
                      :

                      (
                        referenceInfo !== null ? (


                          <div id="table">

                            <table>

                              <thead>
                                <tr className="tabletitle">
                                  <td className="item"><h2><IntlMessages id='service_id.short' /></h2></td>
                                  <td className="Hours"><h2><IntlMessages id='quantity.short' /></h2></td>
                                  <td className="Rate"><h2><IntlMessages id='subtotal.short' /></h2></td>
                                </tr>
                              </thead>

                              <tbody>
                                {referenceInfo.map((item: any) => (
                                  item.ex_service_reference_id === recordViewDetails.service_reference_id ? (

                                    <tr className="service" key={item.id} >
                                      <td className="tableitem"><p className="itemtext">{retrieveObjectKeyValue(salesService, item.service_id)}</p></td>
                                      <td className="tableitem"><p className="itemtext">{item.quantity}</p></td>
                                      <td className="tableitem"><p className="itemtext">{item.total_service_cost}</p></td>
                                    </tr>

                                  ) : null
                                ))}
                              </tbody>


                              <tfoot>
                                <tr className="tabletitle">
                                  <td></td>
                                  <td className="Rate"><h2><IntlMessages id='total_service_cost.short' /></h2></td>
                                  <td className="payment"><h2><IntlMessages id='common.currency.label' /> {recordViewDetails.grand_total}</h2></td>
                                </tr>
                              </tfoot>

                            </table>



                          </div>





                        ) : null

                      )}






                  {/* <!--End Table--> */}

                  <div id="legalcopy">
                    <p className="legal"><strong><IntlMessages id='common.receipt.thankyou' /></strong>  <IntlMessages id='common.receipt.footer' /> {companyContactInfo}</p>
                  </div>

                </div>
                {/* <!--End InvoiceBot--> */}
              </div>
              {/* <!--End Invoice--> */}



              {/* The Last Part */}



            </Card>
          </Box>


        </Box>
      </AppAnimate>

    </>
  )
}