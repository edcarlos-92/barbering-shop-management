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
    doAddOrEdit
} from 'redux/actions';
import { AppState } from 'redux/store';
import { getConstrainsData, getCriteriaAlgorithmsData, getCriteriaAlgorithmsRefData, getCriteriaData, getGradesAlgorithmsData, getSubCategoriesData } from 'redux/actions/MacTechRecruit';
import { objectValueWithReference, removeSquareBracketWithString, selectFieldFromObject } from '@edcarlos/libs/@edcartech/utils';
import SelectInputGradesAlgo from './SelectInputGradesAlgo';
// import DateInputAlgo from './DateInputAlgo';
// import NumberInputAlgo from './NumberInputAlgo';
// import TextInputAlgo from './TextInputAlgo';
//-------------------------Redux Store----------------------------------------

export function GeneralGradeRequirements(props) {//If there is looping hell Saving then use separte General ie. General Female or General Male
    const { variant, margin } = props
    const dispatch = useDispatch();
    useEffect(() => {
        getSubCategoriesData(dispatch);
        getGradesAlgorithmsData(dispatch);
    }, []);
    const { gradeAlgorithmsData, subCategoriesData } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);
    const records: any = gradeAlgorithmsData;
    let getSubCategoryGeneralID = null;
    if (subCategoriesData !== null) getSubCategoryGeneralID = selectFieldFromObject(`id`, subCategoriesData, `sub_category_name`, `GENERAL`)
    return (
        <>
            {records !== null && subCategoriesData !== null || records !== undefined && subCategoriesData !== null ? (
                records?.map((item: any, index) => (
                    item.real_sub_cat_id == getSubCategoryGeneralID && item.sub_category_id ?
                        <GetSelectGradesFields key={item.id} fieldIndex={index} algoData={item} variant={variant} margin={margin} />
                        : ''//Gender Level
                ))
            ) : null}

        </>
    )
}

export function SubCategoriesGradeRequirements(props) {
    const { sub_category_id, variant, margin } = props
    const dispatch = useDispatch();
    useEffect(() => {
        getGradesAlgorithmsData(dispatch);
    }, []);
    const { gradeAlgorithmsData } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);
    const records: any = gradeAlgorithmsData;
    return (
        <>
            {records !== null || records !== undefined ? (
                records?.map((item: any, index) => (
                    item.real_sub_cat_id == sub_category_id && item.sub_category_id ?
                        <GetSelectGradesFields key={item.id} fieldIndex={index} algoData={item} variant={variant} margin={margin} />
                        : ''
                ))
            ) : null}

        </>
    )
}

export function GetSelectGradesFields(props) {
    const { algoData, variant, margin } = props
    return (
        <>
            {algoData &&
                <>
                    <SelectInputGradesAlgo algoData={algoData} variant={variant} margin={margin} />
                </>
            }
        </>

    )

}