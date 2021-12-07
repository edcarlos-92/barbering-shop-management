import IntlMessages from '@edcarlos/utility/IntlMessages';
import FormControl from '@mui/material/FormControl';
import React, { useEffect, useState } from 'react'
import Controls from '../../Controls/Controls';
import { RequiredFieldMessage } from '../../FieldAlertMessages';

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
import { getConstrainsData, getCriteriaAlgorithmsData, getCriteriaAlgorithmsRefData, getCriteriaData, getEducationalLevelData, getGradesData, getRequirementsData, getSubCategoriesData } from 'redux/actions/MacTechRecruit';
import Grid from '@mui/material/Grid';
import { removeSquareBracketWithString, getSquareBracketString, objectValueWithReference, selectFieldFromObject } from '@edcarlos/libs/@edcartech/utils';
import { useAuthUser } from '@edcarlos/utility/AuthHooks';
import { ConstructionOutlined } from '@mui/icons-material';
//-------------------------Redux Store----------------------------------------



export default function SelectInputGradesAlgo(props) {

  const { user, isAuthenticated, isLoading } = useAuthUser();
  const { algoData, variant, margin } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    getGradesData(dispatch);
  }, []);

  const { gradeData } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);

  const [fieldValue, setFieldValue] = useState([]);
  const records: any = gradeData
  const getEducationalLevelID = algoData.educational_level_id
  const getSingleGrades = records?.filter((item) => {
    return item.grade_type === 'single' && item.educational_level_id == getEducationalLevelID;
  });
  const getOverallGrades = records?.filter((item) => {
    return item.grade_type === 'overall' && item.educational_level_id == getEducationalLevelID;
  });

  const gradeLabel = algoData.subject
  const levelLabel = algoData.educational_level
  const gradeType = algoData.grade_type
  const handleInputChange = (e) => {
    e.preventDefault()
    if (e.target.value) {
      setFieldValue(e.target.value);
      const matcherObject = {
        id: 0,
        applicant_id: user.id,
        algo_ref_id: algoData.id,
        algo_type: 'educational',
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
      <Grid sx={{ width: 250, mr: 2, mt: 4 }}>
        <Controls.BasicSelect
          variant={variant}
          margin={margin}
          id="algo_components"
          name="algo_components"
          label={`${levelLabel} ${gradeLabel}`}
          //label={gradeLabel}
          value={fieldValue}
          options={gradeType === 'single' ? getSingleGrades : gradeType === 'overall' ? getOverallGrades : [{}]}
          displayField={`grade_name`}
          defaultValue={`Choose...`}
          onChange={handleInputChange}
        />
      </Grid>

    </>
  )
}
