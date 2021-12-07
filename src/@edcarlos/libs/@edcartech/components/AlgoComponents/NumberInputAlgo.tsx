import IntlMessages from '@edcarlos/utility/IntlMessages';
import FormControl from '@mui/material/FormControl';
import React, { useEffect, useState } from 'react'
import Controls from '../Controls/Controls';
import { RequiredFieldMessage } from '../FieldAlertMessages';

//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import {
  doInsert,
  doUpdate,
  doDelete,
  doSelect,
  getSalesBookingData,
  getCustomersData,
  uploadFileHandler,
  getGrandTotalsData,
  doAddOrEdit,
  getPersonalInfoData,
  silentAddOrEdit
} from 'redux/actions';
import { AppState } from 'redux/store';
import { EXPENSES_TYPES, SHOP_ITEMS } from 'types/actions/Barber.actions';
import { getConstrainsData, getCriteriaAlgorithmsData, getCriteriaAlgorithmsRefData, getCriteriaData, getRequirementsData, getSubCategoriesData } from 'redux/actions/MacTechRecruit';
import Grid from '@mui/material/Grid';
import { removeSquareBracketWithString, getSquareBracketString, objectValueWithReference } from '@edcarlos/libs/@edcartech/utils';
import { useAuthUser } from '@edcarlos/utility/AuthHooks';
import TextField from '@mui/material/TextField';
//-------------------------Redux Store----------------------------------------



export default function NumberInputAlgo(props) {

  const { user, isAuthenticated, isLoading } = useAuthUser();
  const { algoData, fieldIndex, validateAlgo, variant, margin } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    //getCriteriaAlgorithmsData(dispatch);
    //getCriteriaAlgorithmsRefData(dispatch);
    //getSubCategoriesData(dispatch);
    getCriteriaData(dispatch);//
    getConstrainsData(dispatch);//
    getRequirementsData(dispatch);//
    //getPersonalInfoData(dispatch);
  }, []);

  const { requirementData, constrainData, criteriaData, criteriaAlgoritmsData, criteriaAlgoritmsRefData, subCategoriesData } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);

  const [fieldValue, setFieldValue] = useState([]);//algoData

  const reqConstrains = objectValueWithReference(constrainData, algoData.req_constrains, `constrain_text`);
  const reqRequirements = objectValueWithReference(requirementData, algoData.req_value, `requirement_text`);
  const criteriaLabel = objectValueWithReference(criteriaData, algoData.ex_criteria_id, `criteria_name`);

  let constrainOptions = getSquareBracketString(reqConstrains) || [];
  const requiredUnit = getSquareBracketString(reqRequirements) || `Loading...`;
  const requiredValue = removeSquareBracketWithString(reqRequirements) || `Loading...`;

  // if (reqConstrains && constrainOptions && requiredUnit) {
  //   if (constrainOptions) {
  //     constrainOptions = JSON.parse(`[${constrainOptions}]`);
  //     //console.log(`constrainOptions`, constrainOptions);
  //   }
  // }

  const handleInputChange = (e) => {
    e.preventDefault()
    if (e.target.value) {//
      setFieldValue(e.target.value);
      const matcherObject = {
        id: 0,
        applicant_id: user.id,
        algo_ref_id: algoData.ref_id,
        algo_type: 'personal',
        applicant_provision: e.target.value,
      }

      addOrEdit(matcherObject);
    }
  }

  const addOrEdit = (formData: any) => {
    if (formData.id == 0) {
      dispatch(silentAddOrEdit('mactechrecruit/applications/criteriamatcher/add_edit_matcher', formData, ``, ``));
    } else {
      dispatch(silentAddOrEdit('mactechrecruit/applications/criteriamatcher/add_edit_matcher', formData, ``, ``));
    }
  }

  return (
    <>

      {/* <Grid item xs={12} sm={6} md={4} lg={3} > */}
      {/* <Grid sx={{ width: 250, mr: 2 }} > */}
      <TextField
        sx={{ width: 250, mr: 2 }}
        variant={variant}
        margin={margin}
        fullWidth
        id="algo_components"
        name="algo_components"
        type="number"
        label={`${criteriaLabel} (${requiredUnit})`}
        placeholder={`${criteriaLabel} (${requiredUnit})`}
        value={fieldValue}
        onChange={handleInputChange}
      />
      {/* </Grid> */}

    </>
  )
}
