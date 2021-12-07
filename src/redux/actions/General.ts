import jwtAxios from '../../@edcarlos/services/auth/jwt-auth';
import {Dispatch} from 'redux';
import {AppActions} from '../../types';
import {fetchError, fetchStart, fetchSuccess, showMessage} from '.'; //Common
import {appIntl} from '@edcarlos/utility/helper/Utils';
//import {,,GET_DASHBOARD_DATA} from '../../types/actions/Policy.actions';
import {
  GET_PERSONAL_INFO,
  GET_FILE_UPLOAD,
  GET_SYSTEM_USERS,
  GET_LOGS_ACTIVITIES,
} from '../../types/actions/General.action';
import {
  GET_CATEGORIES,
  GET_INTERNAL_PINS_STATS,
} from 'types/actions/MacTechRecruit.actions';
import {
  getCategoriesData,
  getCentresData,
  getConstrainsData,
  getCriteriaAlgorithmsData,
  getCriteriaAlgorithmsRefData,
  getCriteriaData,
  getEducationalLevelData,
  getGradesData,
  getInstitutionFilesCategoriesData,
  getRequirementsData,
  getSubCategoriesData,
  getSubjectsData,
} from './MacTechRecruit';
import {useAuthUser} from '@edcarlos/utility/AuthHooks';
//import {getCustomersData,getServicesData,getSalesBookingData,getGrandTotalsData} from './Barber'

/**
 * @param API_Link The Api Link for the Post method.
 * @param body POST object Body for Submission .
 * @param persitorId Will the Post refresh Data for Display ? If yes specify.
 * @param insertDesc Tracks the Log Actitivy, Provide message to be inserted.
 * @param sMessage Success Message to be displayed on the Toast Message After Submission.
 * @param sMessage Error Message to be displayed on the Toast Message After Submission.
 * @param dispatchType The Redux Store reducer to update After The API Call.
 */
export const doInsert = (
  API_Link: any,
  body: any,
  persitorId: any,
  insertDesc: any,
  sMessage?: any,
  eMessage?: any,
  dispatchType?: any,
) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post(API_Link, body)
      .then((data) => {
        if (data.status === 200) {
          if (insertDesc) activityLog(dispatch, insertDesc);
          persitor(dispatch, persitorId);
          dispatch(fetchSuccess());
          if (dispatchType)
            dispatch({type: dispatchType, payload: data.data.document || '{}'});

          if (sMessage.length == 0)
            dispatch(showMessage(String(messages['common.createsuccess'])));
          if (sMessage.length != 0) dispatch(showMessage(String(sMessage)));
        } else {
          if (eMessage.length == 0)
            dispatch(
              fetchError(String(messages['message.somethingWentWrong'])),
            );
          if (eMessage.length != 0) dispatch(fetchError(String(eMessage)));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

/**
 * @param doAddOrEdit Insert if request body id=0 and Update If request body is not 0.
 * @param API_Link The Api Link for the Post method.
 * @param body POST object Body for Submission .
 * @param insertDesc Tracks the Log Actitivy, Provide message to be inserted.
 * @param sMessage Success Message to be displayed on the Toast Message After Submission.
 * @param sMessage Error Message to be displayed on the Toast Message After Submission.
 * @param dispatchType The Redux Store reducer to update After The API Call.
 */
export const doAddOrEdit = (
  API_Link: any,
  body: any,
  insertDesc?: any,
  sMessage?: any,
  eMessage?: any,
  dispatchType?: any,
) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post(API_Link, body)
      .then((data) => {
        if (data.status === 200) {
          if (insertDesc) activityLog(dispatch, insertDesc);
          dispatch(fetchSuccess());
          if (dispatchType) {
            updateAfterAPICalls(
              dispatch,
              getDispatchLinks(dispatchType),
              dispatchType,
            );
          }
          if (sMessage.length == 0)
            dispatch(showMessage(String(messages['common.createsuccess'])));
          if (sMessage.length != 0) dispatch(showMessage(String(sMessage)));
        } else {
          if (eMessage.length == 0)
            dispatch(
              fetchError(String(messages['message.somethingWentWrong'])),
            );
          if (eMessage.length != 0) dispatch(fetchError(String(eMessage)));
        }
      })
      .catch((err: any) => {
        //dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        dispatch(fetchError(String(err.message)));
      });
  };
};

/**
 * @param silentAddOrEdit Silently Add Or Edir Records in the System.
 * @param API_Link The Api Link for the Post method.
 * @param deleteDesc Tracks the Log Actitivy, Provide message to be inserted.
 * @param dispatchType The Redux Store reducer to update After The API Call.
 */
export const silentAddOrEdit = (
  API_Link: any,
  body: any,
  insertDesc: any,
  dispatchType: any,
) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post(API_Link, body)
      .then((data) => {
        if (data.status === 200) {
          if (insertDesc) activityLog(dispatch, insertDesc);
          dispatch(fetchSuccess());
          if (dispatchType) {
            updateAfterAPICalls(
              dispatch,
              getDispatchLinks(dispatchType),
              dispatchType,
            );
          }
        } else {
          // Handle error case
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

/**
 * @param deleteRec Delete Any Record with a db ID.
 * @param API_Link The Api Link for the Post method.
 * @param deleteDesc Tracks the Log Actitivy, Provide message to be inserted.
 * @param dispatchType The Redux Store reducer to update After The API Call.
 */
export const deleteRec = (API_Link: any, deleteDesc: any, dispatchType) => {
  const {messages} = appIntl();
  let Idafter_URLquery = API_Link.substring(API_Link.indexOf('=') + 1);
  let msg = `ID ${Idafter_URLquery} ${deleteDesc}`;
  //if(persitorId ==`logsactivity`) msg = deleteDesc;
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    await jwtAxios
      .delete(`/${API_Link}`)
      .then((data) => {
        if (data.status === 200) {
          //res.data!==null || res.data!==undefined
          activityLog(dispatch, msg);
          if (dispatchType)
            updateAfterAPICalls(
              dispatch,
              getDispatchLinks(dispatchType),
              dispatchType,
            );
          dispatch(fetchSuccess());
          dispatch(showMessage(String(messages['common.deletesuccess'])));
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

/**
 * @param silentDeleteRec Sillently Delete Any Record with a db ID.
 * @param API_Link The Api Link for the Post method.
 * @param deleteDesc Tracks the Log Actitivy, Provide message to be inserted.
 * @param dispatchType The Redux Store reducer to update After The API Call.
 */
export const silentDeleteRec = (
  API_Link: any,
  deleteDesc: any,
  dispatchType,
) => {
  const {messages} = appIntl();
  let Idafter_URLquery = API_Link.substring(API_Link.indexOf('=') + 1);
  let msg = `ID ${Idafter_URLquery} ${deleteDesc}`;
  //if(persitorId ==`logsactivity`) msg = deleteDesc;
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    await jwtAxios
      .delete(`/${API_Link}`)
      .then((data) => {
        if (data.status === 200) {
          //res.data!==null || res.data!==undefined
          //activityLog(dispatch,msg);
          dispatch(fetchSuccess());
          if (deleteDesc) activityLog(dispatch, msg);
          if (dispatchType)
            updateAfterAPICalls(
              dispatch,
              getDispatchLinks(dispatchType),
              dispatchType,
            );
          //dispatch(showMessage(String(messages["common.deletesuccess"])));
        } else {
          //dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

/**
 * @param updateAfterAPICalls API Call On Redux To update Store After a POST,PUT and DELETE API Call.
 * @param API_Link The Api Link for the Post method.
 * @param dispatchType The Redux Store reducer to update After The API Call.
 */
export const updateAfterAPICalls = async (
  dispatch: Dispatch<AppActions>,
  API_Link: any,
  dispatchType: any,
) => {
  const {messages} = appIntl();
  //return async (dispatch: Dispatch<AppActions>) => {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get(API_Link);
    dispatch(fetchSuccess());
    if (
      (res.data.status === 200 && res.data !== null) ||
      res.data !== undefined
    ) {
      dispatch({
        type: dispatchType,
        payload: res.data.document || '{}',
      });
    }
  } catch (err: any) {
    dispatch(fetchError(err.message));
  }
  //};
};

/*
export const doAddOrEdit = (API_Link:any,body:any,persitorId:any,insertDesc:any,sMessage?:any,eMessage?:any,dispatchType?:any) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post(API_Link,body)
      .then((data) => {
        if (data.status === 200) {
          console.log(`doAddOrEdit`,data);
          if(insertDesc) activityLog(dispatch,insertDesc);
          persitor(dispatch,persitorId);
          dispatch(fetchSuccess());
          if(dispatchType) dispatch({type: dispatchType,payload: data.data.document || '{}'});
          if ( sMessage.length == 0 ) dispatch(showMessage(String(messages["common.createsuccess"]))); 
          if ( sMessage.length != 0 ) dispatch(showMessage(String(sMessage)));
        } else {
          if ( eMessage.length == 0 ) dispatch(fetchError(String(messages["message.somethingWentWrong"])));
          if ( eMessage.length != 0 ) dispatch(fetchError(String(eMessage)));
        }
      })
      .catch(() => {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

*/

export const doSelect = (API_Link: any, Reference: any, selectType: any) => {
  const {messages} = appIntl();
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.get(API_Link, Reference);
      dispatch(fetchSuccess());
      if (
        (res.data.status === 200 && res.data !== null) ||
        res.data !== undefined
      ) {
        dispatch({
          type: selectType,
          payload: res.data.document || '{}',
        });
      }
    } catch (err: any) {
      dispatch(fetchError(err.message));
    }
  };
};

export const doUpdate = (
  API_Link: any,
  body: any,
  persitorId: any,
  updateDesc: any,
) => {
  const {messages} = appIntl();
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    await jwtAxios
      .put(`/${API_Link}`, body)
      .then((data) => {
        if (data.status === 200) {
          //res.data!==null || res.data!==undefined
          activityLog(dispatch, `ID ${body.id} ${updateDesc}`);
          persitor(dispatch, persitorId);
          dispatch(fetchSuccess());
          dispatch(showMessage(String(messages['common.updatesuccess'])));
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const doDelete = (API_Link: any, persitorId: any, deleteDesc: any) => {
  const {messages} = appIntl();
  let Idafter_URLquery = API_Link.substring(API_Link.indexOf('=') + 1);
  let msg = `ID ${Idafter_URLquery} ${deleteDesc}`;
  if (persitorId == `logsactivity`) msg = deleteDesc;
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    await jwtAxios
      .delete(`/${API_Link}`)
      .then((data) => {
        if (data.status === 200) {
          //res.data!==null || res.data!==undefined
          activityLog(dispatch, msg);
          persitor(dispatch, persitorId);
          dispatch(fetchSuccess());
          dispatch(showMessage(String(messages['common.deletesuccess'])));
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const doSelectOne = (API_Link: any, Reference: any, selectType: any) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const res = await jwtAxios.get(`/${API_Link}?id=${Reference}`);
      if (
        (res.data.status === 200 && res.data !== null) ||
        res.data !== undefined
      ) {
        dispatch({
          type: selectType,
          payload: res.data.document || '{}',
        });
      }
    } catch (err: any) {
      // Handle error silently
    }
  };
};

export const uploadFileHandler = async (acceptedFiles, target) => {
  try {
    const response = await fetch(`/api/${target}`, {
      method: 'POST',
      body: acceptedFiles,
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
  } catch (error: any) {
    // Handle upload error
  }
};

export const getFileUpload = (data) => {
  const {messages} = appIntl();
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      dispatch({
        type: GET_FILE_UPLOAD,
        payload: data,
      });
      dispatch(showMessage(String(messages['common.fileuploadedsuccess'])));
    } catch (err: any) {
      dispatch(fetchError(String(messages['common.fileuploadederror'])));
    }
  };
};

export async function getSystemUsersData(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('users/get_system_users');
    dispatch(fetchSuccess());
    if (
      (res.data.status === 200 && res.data !== null) ||
      res.data !== undefined
    ) {
      dispatch({
        type: GET_SYSTEM_USERS,
        payload: res.data.document || '{}',
      });
    }
  } catch (err: any) {
    dispatch(fetchError(err.message));
  }
}

export async function getTokenFreeSystemUsersData(
  dispatch: Dispatch<AppActions>,
) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('users/get_system_users_token_free');
    dispatch(fetchSuccess());
    if (
      (res.data.status === 200 && res.data !== null) ||
      res.data !== undefined
    ) {
      dispatch({
        type: GET_SYSTEM_USERS,
        payload: res.data.document || '{}',
      });
    }
  } catch (err: any) {
    dispatch(fetchError(err.message));
  }
}

export async function getTokenProtectedSystemUsersData(
  dispatch: Dispatch<AppActions>,
) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('users/get_system_users_token_protected');
    dispatch(fetchSuccess());
    if (
      (res.data.status === 200 && res.data !== null) ||
      res.data !== undefined
    ) {
      dispatch({
        type: GET_SYSTEM_USERS,
        payload: res.data.document || '{}',
      });
    }
  } catch (err: any) {
    dispatch(fetchError(err.message));
  }
}

export async function getPersonalInfoData(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('personal_info_me');
    dispatch(fetchSuccess());
    if (
      (res.data.status === 200 && res.data !== null) ||
      res.data !== undefined
    ) {
      dispatch({
        type: GET_PERSONAL_INFO,
        payload: res.data.document || '{}',
      });
    }
  } catch (err: any) {
    //console.log('error!!!!', err.response.error);
    //console.log(`err`,err);
    dispatch(fetchError(err.message));
  }
}

export async function getActivityLogsData(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('users/userlogs/get_user_log_activities');
    dispatch(fetchSuccess());
    if (
      (res.data.status === 200 && res.data !== null) ||
      res.data !== undefined
    ) {
      dispatch({
        type: GET_LOGS_ACTIVITIES,
        payload: res.data.document || '{}',
      });
    }
  } catch (err: any) {
    //console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.message));
  }
}

/**
 * @param doAddOrEditWithMultiDispatchTypes Special case with Multiple update after API Call
 * @param API_Link The Api Link for the Post method.
 * @param body POST object Body for Submission .
 * @param insertDesc Tracks the Log Actitivy, Provide message to be inserted.
 * @param sMessage Success Message to be displayed on the Toast Message After Submission.
 * @param sMessage Error Message to be displayed on the Toast Message After Submission.
 * @param dispatchType The Redux Store reducer to update After The API Call.
 */
export const doAddOrEditWithMultiDispatchTypes = (
  API_Link: any,
  body: any,
  insertDesc?: any,
  sMessage?: any,
  eMessage?: any,
  dispatchType?: any,
  dispatchType2?: any,
  dispatchType3?: any,
  dispatchType4?: any,
  dispatchType5?: any,
) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post(API_Link, body)
      .then((data) => {
        if (data.status === 200) {
          // dispatch({
          //   type: dispatchType2,
          //   payload: data.data.document || '{}'
          // });
          if (insertDesc) activityLog(dispatch, insertDesc);
          dispatch(fetchSuccess());
          if (dispatchType)
            updateAfterAPICalls(
              dispatch,
              getDispatchLinks(dispatchType),
              dispatchType,
            );
          if (dispatchType2)
            updateAfterAPICalls(
              dispatch,
              getDispatchLinks(dispatchType2),
              dispatchType2,
            );
          if (dispatchType3)
            updateAfterAPICalls(
              dispatch,
              getDispatchLinks(dispatchType3),
              dispatchType3,
            );
          if (dispatchType4)
            updateAfterAPICalls(
              dispatch,
              getDispatchLinks(dispatchType4),
              dispatchType4,
            );
          if (dispatchType5)
            updateAfterAPICalls(
              dispatch,
              getDispatchLinks(dispatchType5),
              dispatchType5,
            );
          //if(dispatchType2) updateAfterAPICalls(dispatch,`mactechrecruit/admin/settings/pincodegenerator/get_internal_stats`,GET_INTERNAL_PINS_STATS);
          if (sMessage.length == 0)
            dispatch(showMessage(String(messages['common.createsuccess'])));
          if (sMessage.length != 0) dispatch(showMessage(String(sMessage)));
        } else {
          if (eMessage.length == 0)
            dispatch(
              fetchError(String(messages['message.somethingWentWrong'])),
            );
          if (eMessage.length != 0) dispatch(fetchError(String(eMessage)));
        }
      })
      .catch((err: any) => {
        //dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        dispatch(fetchError(String(err.message)));
      });
  };
};

/*
export async function getPolicyRecordsData(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('policy/get_policy_records');
    dispatch(fetchSuccess());
    if (res.data.status === 200 && res.data!==null || res.data!==undefined) {
        dispatch({
        type: GET_POLICY_RECORDS, 
        payload: res.data.document || '{}'
      });
    console.log('-----------All Policies Fetched-------',res.data.document);
    }

  } catch (err:any) {
    //console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.message));
  }
};
*/

/*
export async function getPolicyDependantData_(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('policy/dependants/get_dependants');
    dispatch(fetchSuccess());
    if (res.data.status === 200 && res.data!==null || res.data!==undefined) {
        dispatch({
        type: GET_POLICY_RECORDS, 
        payload: res.data.document || '{}'
      });
    console.log('-----------All Dependants Fetched-------',res.data.document);
    }

    } catch (err:any) {
    //console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.message));
  }
};

export const getPolicyDependantData = (API_Link:any,Reference:any,selectType:any) => {
  console.log(`---- Redux Dependant Accesed ${API_Link} Fetch with ------ ${Reference}-- On`,selectType);
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
          console.log(`-----------All ${API_Link} Fetched-------`,data.data.document);
        } else {
          console.log(`-----------${API_Link} Status Not-------`,data.status);
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
*/
//--------------Client Dependants-----------------
/*
export const getallDependants = async (API_Link,id) => {
  id = id || '';
  return await jwtAxios.get(`${API_Link}/${id}`);
}
export const addDependant = async (API_Link,body) => {
  return await jwtAxios.post(API_Link,body);
}
export const editDependant = async (API_Link,id, body) => {
  return await jwtAxios.put(`${API_Link}/${id}`,body);
}
export const deleteDependant = async (API_Link,id) => {
  return await jwtAxios.delete(`${API_Link}/${id}`);
}
*/

//--------------Client Dependants-----------------
export const silentInsert = (API_Link: any, body: any, persitorId: any) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      //.post(`/${API_Link}/`,body)
      .post(API_Link, body)
      //const res = await jwtAxios.post(API_Link,body);
      .then((data) => {
        if (data.status === 200) {
          persitor(dispatch, persitorId);
          dispatch(fetchSuccess());
          //dispatch({ type: CREATE_NEW_TASK, payload: data.data });
          //dispatch(showMessage(String(messages["common.createsuccess"])));
        } else {
          //dispatch(fetchError(data.data.message));
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const silentUpdate = (API_Link: any, body: any, persitorId: any) => {
  const {messages} = appIntl();
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    await jwtAxios
      .put(`/${API_Link}`, body)
      .then((data) => {
        if (data.status === 200) {
          //res.data!==null || res.data!==undefined
          persitor(dispatch, persitorId);
          dispatch(fetchSuccess());
          //dispatch(showMessage(String(messages["common.updatesuccess"])));
        } else {
          //dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        //dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const silentDelete = (API_Link: any, persitorId: any) => {
  const {messages} = appIntl();
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    await jwtAxios
      .delete(`/${API_Link}`)
      .then((data) => {
        if (data.status === 200) {
          //res.data!==null || res.data!==undefined
          persitor(dispatch, persitorId);
          dispatch(fetchSuccess());
          //dispatch(showMessage(String(messages["common.deletesuccess"])));
          //toast.success(String(messages["common.updatesuccess"])/*,{ theme: "colored" }*/);
        } else {
          //dispatch(fetchError(String(messages["message.somethingWentWrong"])));
          //toast.error(String(messages["message.somethingWentWrong"]),{ theme: "colored" });
        }
      })
      .catch(() => {
        //dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        //toast.error(String(messages["message.somethingWentWrong"]),{ theme: "colored" });
      });
  };
};

export async function getGoupNotification(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('personal_info_me');
    dispatch(fetchSuccess());
    if (
      (res.data.status === 200 && res.data !== null) ||
      res.data !== undefined
    ) {
      dispatch({
        type: GET_PERSONAL_INFO,
        payload: res.data.document || '{}',
      });
    }
  } catch (err: any) {
    //console.log('error!!!!', err.response.error);
    //console.log(`err`,err);
    dispatch(fetchError(err.message));
  }
}

export async function getSingleNotification(dispatch: Dispatch<AppActions>) {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('personal_info_me');
    dispatch(fetchSuccess());
    if (
      (res.data.status === 200 && res.data !== null) ||
      res.data !== undefined
    ) {
      dispatch({
        type: GET_PERSONAL_INFO,
        payload: res.data.document || '{}',
      });
    }
  } catch (err: any) {
    //console.log('error!!!!', err.response.error);
    //console.log(`err`,err);
    dispatch(fetchError(err.message));
  }
}

export async function persitor(dispatch: Dispatch<AppActions>, persitorId) {
  dispatch(fetchStart());
  if (persitorId === 'users') getSystemUsersData(dispatch);
  if (persitorId === 'applicants') getTokenFreeSystemUsersData(dispatch);
  //if (persitorId==='applicantsf') const { user, isAuthenticated, isLoading } = useAuthUser();
  if (persitorId === 'logsactivity') getActivityLogsData(dispatch);
  if (persitorId === 'personalinfo') getPersonalInfoData(dispatch);
  if (persitorId === 'categories') getCategoriesData(dispatch);
  if (persitorId === 'edulevels') getEducationalLevelData(dispatch);
  if (persitorId === 'subcategories') getSubCategoriesData(dispatch);
  if (persitorId === 'centres') getCentresData(dispatch);
  if (persitorId === 'criteria') getCriteriaData(dispatch);
  if (persitorId === 'subjects') getSubjectsData(dispatch);
  if (persitorId === 'grades') getGradesData(dispatch);
  if (persitorId === 'systemalgo') getCriteriaAlgorithmsData(dispatch);
  if (persitorId === 'algoref') getCriteriaAlgorithmsRefData(dispatch);
  if (persitorId === 'requirements') getRequirementsData(dispatch);
  if (persitorId === 'constrains') getConstrainsData(dispatch);
  if (persitorId === 'filecourses') getInstitutionFilesCategoriesData(dispatch);
}

export async function activityLog(
  dispatch: Dispatch<AppActions>,
  activity_description,
) {
  jwtAxios
    .post(`/users/userlogs/add_user_log_activities`, activity_description)
    .then((data) => {
      if (data.status === 200) {
        console.log(
          `User Log Activities Innitiated At the Redux Action Level `,
          activity_description,
        );
      }
    })
    .catch((err) => {
      console.log(`Error `, err);
    });
}

export function getDispatchLinks(dispatchType) {
  if (dispatchType === 'GET_PERSONAL_INFO') return 'personal_info_me';
  if (dispatchType === 'GET_CATEGORIES')
    return 'mactechrecruit/admin/settings/categories/get_categories';
  if (dispatchType === 'GET_EDUCATIONAL_LEVELS')
    return 'mactechrecruit/admin/settings/edulevels/get_edu_levels';
  //if (dispatchType==='GET_EDUCATIONAL_LEVELS') return 'mactechrecruit/admin/settings/edulevels/get_edu_levels_front_end';
  if (dispatchType === 'GET_SUB_CATEGORIES')
    return 'mactechrecruit/admin/settings/subcategories/get_sub_categories';
  if (dispatchType === 'GET_CENTRES')
    return 'mactechrecruit/admin/settings/centres/get_centres';
  if (dispatchType === 'GET_SUBJECTS')
    return 'mactechrecruit/admin/settings/subjects/get_subjects';
  if (dispatchType === 'GET_GRADES')
    return 'mactechrecruit/admin/settings/grades/get_grades';
  if (dispatchType === 'GET_CRATERIA')
    return 'mactechrecruit/admin/settings/criteria/get_criteria';
  if (dispatchType === 'GET_CRITERIA_ALGORITHMS')
    return 'mactechrecruit/admin/settings/criteriaalgorithms/get_criteria_algorithms';
  if (dispatchType === 'GET_CRITERIA_ALGORITHMS_REF')
    return 'mactechrecruit/admin/settings/criteriaalgorithms/get_criteria_algorithms_ref';
  if (dispatchType === 'GET_REQUIREMENTS')
    return 'mactechrecruit/admin/settings/criteriaalgorithms/get_requirements';
  if (dispatchType === 'GET_CONSTRAINS')
    return 'mactechrecruit/admin/settings/criteriaalgorithms/get_constrains';
  if (dispatchType === 'GET_CAT_TO_LEVELS_ASSIGNMENT_REF')
    return 'mactechrecruit/admin/settings/subcategories/cat_assignments/get_cat_level_assignments_ref';
  if (dispatchType === 'GET_CAT_TO_LEVELS_ASSIGNMENT')
    return 'mactechrecruit/admin/settings/subcategories/cat_assignments/get_cat_level_assignments';
  if (dispatchType === 'GET_INTERNAL_VOUCHER')
    return 'mactechrecruit/admin/settings/pincodegenerator/get_internal_pins';
  //if (dispatchType==='GET_INTERNAL_PINS_STATS') return 'mactechrecruit/admin/settings/pincodegenerator/get_internal_stats';
  //if (dispatchType==='GET_INTERNAL_VOUCHER') return 'mactechrecruit/admin/settings/pincodegenerator/get_internal_stats';
  if (dispatchType === 'GET_EXTERNAL_VOUCHER')
    return 'mactechrecruit/admin/settings/pincodegenerator/get_external_pins';
  if (dispatchType === 'GET_GRADE_ALGORITHM')
    return 'mactechrecruit/admin/settings/grades/gradealgorithms/get_grades_algorithms';
  if (dispatchType === 'GET_EDUCATIONAL_INFORMATION')
    return 'mactechrecruit/applications/educationalinfo/get_edcucational_info';
  if (dispatchType === 'GET_BANKS')
    return 'mactechrecruit/admin/settings/banking/get_banks';
  if (dispatchType === 'GET_INSTITUTIONS')
    return 'mactechrecruit/admin/settings/institutions/get_institutions';
  if (dispatchType === 'GET_INSTITUTION_FILES')
    return 'mactechrecruit/admin/settings/institutions/institutionfiles/get_institutionfiles';

  //if (dispatchType==='GET_INTERNAL_PINS_STATS') return 'mactechrecruit/admin/settings/pincodegenerator/get_internal_stats';

  //if (dispatchType==='GET_SUB_CATEGORIES_REF') return 'mactechrecruit/admin/settings/subcategories/get_sub_categories_ref';

  if (dispatchType === 'GET_SYSTEM_USERS') return 'users/get_system_users';
  if (dispatchType === 'GET_ALL_APPLICANTS')
    return 'mactechrecruit/admin/reports/situational/get_all_applicants';
}
