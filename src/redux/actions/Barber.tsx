
import jwtAxios from '../../@edcarlos/services/auth/jwt-auth';
import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { fetchError, fetchStart, fetchSuccess, showMessage } from './';//Common
import { appIntl } from "@edcarlos/utility/helper/Utils";
import { GET_CUSTOMERS, GET_SHOP_SERVICES, GET_SALES_BOOKING, GRAND_TOTAL_DATA } from '../../types/actions/Barber.actions';
import { GET_PERSONAL_INFO, GET_FILE_UPLOAD } from '../../types/actions/Common.action';

import { toast } from 'react-toastify';
import { fetchTokenid } from '@edcarlos/libs/@edcartech/helpers/appHelper'
import { appDirectories, initialUrl } from "shared/constants/AppConst";
import { useRouter } from 'next/router';
import { useHistory } from "react-router-dom";
import Router from "next/router";



export async function getCustomersData(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('barber/customers/get_customers');
    dispatch(fetchSuccess());
    if (res.data.status === 200 && res.data !== null || res.data !== undefined) {
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data.document || '[]'
      });
    }
  } catch (err: any) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
  }
};

export async function getServicesData(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('barber/shopservices/get_services');
    dispatch(fetchSuccess());
    if (res.data.status === 200 && res.data !== null || res.data !== undefined) {
      dispatch({
        type: GET_SHOP_SERVICES,
        payload: res.data.document || '{}'
      });
    }
  } catch (err: any) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
  }
};

export async function getSalesBookingData(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('barber/salesbookings/get_bookings');
    dispatch(fetchSuccess());
    if (res.data.status === 200 && res.data !== null || res.data !== undefined) {
      dispatch({
        type: GET_SALES_BOOKING,
        payload: res.data.document || '{}'
      });
    }
  } catch (err: any) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
  }
};


export async function getGrandTotalsData(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('barber/salesbookings/get_service_sales_ref_total_grouped_by_ref');
    dispatch(fetchSuccess());
    if (res.data.status === 200 && res.data !== null || res.data !== undefined) {
      dispatch({
        type: GRAND_TOTAL_DATA,
        payload: res.data.document || '{}'
      });
    }
  } catch (err: any) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
  }
};












export async function getBarberDataRecordsData(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('policy/get_policy_records');
    dispatch(fetchSuccess());
    if (res.data.status === 200 && res.data !== null || res.data !== undefined) {
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data.document || '{}'
      });
      console.log('-----------All Policies Fetched-------', res.data.document);
    }

  } catch (err: any) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
  }
};

export async function getBarberData_(dispatch: Dispatch<AppActions>) {

  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('policy/dependants/get_dependants');
    dispatch(fetchSuccess());
    if (res.data.status === 200 && res.data !== null || res.data !== undefined) {
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data.document || '{}'
      });
      console.log('-----------All Dependants Fetched-------', res.data.document);
    }

  } catch (err: any) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
  }
};

export const getCustomerData = (API_Link: any, Reference: any, selectType: any) => {
  console.log(`---- Redux Dependant Accesed ${API_Link} Fetch with ------ ${Reference}-- On`, selectType);
  const { messages } = appIntl();
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    console.log(`oooooooooooo Now On  /${API_Link}?id=${Reference}`);
    await jwtAxios.get(`/${API_Link}?id=${Reference}`)
      //.put(`/${API_Link}/${body['id']}`,body)    
      //.get(API_Link,Reference)
      .then((data) => {

        if (data.status === 200) { //res.data!==null || res.data!==undefined
          //persitor(dispatch,persitorId);
          dispatch(fetchSuccess());
          dispatch({
            type: selectType,//GET_POLICY_RECORDS, ,selectPayload:any
            payload: data.data.document || '{}'//selectPayload || '{}'//
          });
          console.log(`-----------All ${API_Link} Fetched-------`, data.data.document);
        } else {
          console.log(`-----------${API_Link} Status Not-------`, data.status);
          //dispatch(fetchError(String(messages["message.somethingWentWrong"])));
          //toast.error(String(messages["message.somethingWentWrong"]),{ theme: "colored" });
        }
      })
      .catch(() => {
        console.log(`-----------${API_Link} Fetch Error-------`);
        //dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        //toast.error(String(messages["message.somethingWentWrong"]),{ theme: "colored" });
      });
  };
};
