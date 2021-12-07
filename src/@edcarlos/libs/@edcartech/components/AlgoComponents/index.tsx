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
    doAddOrEdit
} from 'redux/actions';
import { AppState } from 'redux/store';
import { getConstrainsData, getCriteriaAlgorithmsData, getCriteriaAlgorithmsRefData, getCriteriaData, getSubCategoriesData } from 'redux/actions/MacTechRecruit';
import { objectValueWithReference, removeSquareBracketWithString, selectFieldFromObject } from '@edcarlos/libs/@edcartech/utils';
import SelectInputAlgo from './SelectInputAlgo';
import DateInputAlgo from './DateInputAlgo';
import NumberInputAlgo from './NumberInputAlgo';
import TextInputAlgo from './TextInputAlgo';
import Grid from '@mui/material/Grid';
//-------------------------Redux Store----------------------------------------

export default function AllGenderTypeSubCategories(props) {//Specific SubCategories for all types of gender ie All Type
    const { sub_category_id, gender_type, variant, margin } = props
    const dispatch = useDispatch();
    useEffect(() => {
        getCriteriaAlgorithmsRefData(dispatch);
    }, []);
    const { constrainData, criteriaAlgoritmsData, criteriaAlgoritmsRefData, subCategoriesData, criteriaData } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);
    const records: any = criteriaAlgoritmsRefData;
    return (
        < >
            {records !== null || records !== undefined ? (
                records?.map((item: any, index) => (

                    item.sub_category_id == sub_category_id && item.gender_type == 'All Type' && item.ex_criteria_id ?

                        <GetConstrainsFields key={item.id} fieldIndex={index} constrainsID={item.req_constrains} algoData={item} variant={variant} margin={margin} />

                        : ''//Gender Level
                ))
            ) : null}
        </>
    )
}



export function GeneralAllGenderTypeSubCategories(props) {//If there is looping hell Saving then use separte General ie. General Female or General Male
    const { sub_category_id, gender_type, variant, margin } = props
    const dispatch = useDispatch();
    useEffect(() => {
        getCriteriaAlgorithmsRefData(dispatch);
        getSubCategoriesData(dispatch);
    }, []);

    const { constrainData, criteriaAlgoritmsData, criteriaAlgoritmsRefData, subCategoriesData, criteriaData } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);
    const records: any = criteriaAlgoritmsRefData;
    let getSubCategoryGeneralID = null;
    if (subCategoriesData !== null) getSubCategoryGeneralID = selectFieldFromObject(`id`, subCategoriesData, `sub_category_name`, `GENERAL`)
    return (
        <>
            {records !== null && subCategoriesData !== null || records !== undefined && subCategoriesData !== null ? (

                records?.map((item: any, index) => (

                    // item.sub_category_id == getSubCategoryGeneralID && item.gender_type == gender_type && item.ex_criteria_id  ?
                    item.sub_category_id == getSubCategoryGeneralID && item.gender_type == 'All Type' && item.ex_criteria_id ?

                        <GetConstrainsFields key={item.id} fieldIndex={index} constrainsID={item.req_constrains} algoData={item} variant={variant} margin={margin} />

                        : ''//Gender Level
                ))
            ) : null}

        </>
    )
}


export function GeneralSpecificGenderSubCategories(props) {//If there is looping hell Saving then use separte General ie. General Female or General Male
    const { sub_category_id, gender_type, variant, margin } = props
    const dispatch = useDispatch();
    useEffect(() => {
        getCriteriaAlgorithmsRefData(dispatch);
        getSubCategoriesData(dispatch);
    }, []);

    const { constrainData, criteriaAlgoritmsData, criteriaAlgoritmsRefData, subCategoriesData, criteriaData } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);
    const records: any = criteriaAlgoritmsRefData;
    let getSubCategoryGeneralID = null;
    if (subCategoriesData !== null) getSubCategoryGeneralID = selectFieldFromObject(`id`, subCategoriesData, `sub_category_name`, `GENERAL`)
    return (
        <>
            {records !== null && subCategoriesData !== null || records !== undefined && subCategoriesData !== null ? (

                records?.map((item: any, index) => (

                    // item.sub_category_id == getSubCategoryGeneralID && item.gender_type == gender_type && item.ex_criteria_id  ?
                    item.sub_category_id == getSubCategoryGeneralID && item.gender_type == gender_type && item.ex_criteria_id ?

                        <GetConstrainsFields key={item.id} fieldIndex={index} constrainsID={item.req_constrains} algoData={item} variant={variant} margin={margin} />

                        : ''//Gender Level
                ))
            ) : null}

        </>
    )
}


export function GenderSpecificSubCategories(props) {//Specific SubCategories for Gender Specific ie Male or Female
    const { sub_category_id, gender_type, variant, margin } = props
    const dispatch = useDispatch();
    useEffect(() => {
        getCriteriaAlgorithmsRefData(dispatch);
    }, []);

    const { constrainData, criteriaAlgoritmsData, criteriaAlgoritmsRefData, subCategoriesData, criteriaData } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);
    const records: any = criteriaAlgoritmsRefData;
    return (
        <>
            {records !== null || records !== undefined ? (

                records?.map((item: any, index) => (

                    item.sub_category_id == sub_category_id && item.gender_type == gender_type && item.ex_criteria_id ?

                        <GetConstrainsFields key={item.id} fieldIndex={index} constrainsID={item.req_constrains} algoData={item} variant={variant} margin={margin} />

                        : ''//Gender Level
                ))
            ) : null}
        </>
    )
}

export function GetConstrainsFields(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        getConstrainsData(dispatch);
    }, []);
    const { constrainData, criteriaAlgoritmsData, criteriaAlgoritmsRefData, subCategoriesData, criteriaData } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);
    const { constrainsID, algoData, fieldIndex, variant, margin } = props
    const getField = removeSquareBracketWithString(objectValueWithReference(constrainData, constrainsID, `constrain_text`))
    return (
        <>
            {getField &&
                getField === 'text' ?
                <>
                    {/* <h4>Display Text Field Component With Params{` | `}</h4> */}
                    {/* <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mt: 4 }} > */}
                    <TextInputAlgo algoData={algoData} variant={variant} margin={margin} />
                    {/* </Grid> */}
                </>
                : getField === 'number' ?
                    <>
                        {/* <h4>Display Text Field Number Type Component With Params{` | `}</h4> */}
                        {/* <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mt: 4 }} > */}
                        <NumberInputAlgo algoData={algoData} variant={variant} margin={margin} />
                        {/* </Grid> */}
                    </>
                    : getField === 'date' ?
                        <>
                            {/* <h4>Display Date Input Component With Params{` | `}</h4> */}
                            {/* <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mt: 4 }} > */}
                            <DateInputAlgo algoData={algoData} variant={variant} margin={margin} />
                            {/* </Grid> */}
                        </>
                        : getField === 'select' ?
                            <>
                                {/* <h4>Display Select Dropdown Input Reference {algoData.ex_algorithm_reference_id} With Index{fieldIndex} {` | `} For {algoData.id} </h4> */}
                                {/* <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mt: 4 }} > */}
                                <SelectInputAlgo algoData={algoData} variant={variant} margin={margin} />
                                {/* </Grid> */}
                            </>
                            // : getField === 'reference' ?
                            //     <>
                            //         <SelectInputAlgo algoData={algoData} variant={variant} margin={margin} />
                            //     </>

                            : ''//Field Level
            }
        </>

    )

}