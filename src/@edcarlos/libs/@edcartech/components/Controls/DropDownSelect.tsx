import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

export default function BasicSelect(props: any) {

  const { name, label, labelId, margin, type, id, error = null, onChange, size, sx, options, value, variant, minWidth, displayField, ...other } = props;

  return (
    <>
      {/* <Box sx={{ minWidth:185 }} > */}
      <Box sx={{ minWidth: minWidth }} >
        <FormControl fullWidth size={size}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            variant={variant}
            labelId={labelId}
            id={id}
            value={value}
            label={label}
            name={name}
            defaultValue={`Choose...`}
            autoWidth={false}
            onChange={onChange}>
            {/* <MenuItem value={''}>None</MenuItem>  */}
            {
              options?.map((item: any) => (
                <MenuItem key={item.id} value={item.id}> {item[displayField] || item.itemValue} </MenuItem>
              )
              )
            }
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}

        </FormControl>
      </Box>
    </>
  );
}


export function LookUpSelect(props: any) {
  const { name, label, labelId, margin, type, id, error = null, onChange, size, sx, options, value, variant, minWidth, displayField, lookUpField, lookUpValue, itemKey, itemID, ...other } = props;
  return (
    <>
      {/* <Box sx={{ minWidth:185 }} > */}
      <Box sx={{ minWidth: minWidth }} >
        <FormControl fullWidth size={size}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            variant={variant}
            labelId={labelId}
            id={id}
            value={value}
            label={label}
            name={name}
            defaultValue={`Choose...`}
            autoWidth={false}
            onChange={onChange}>
            {/* <MenuItem value={''}>None</MenuItem>  */}

            {
              options?.map((item: any) => (

                item[lookUpField] == lookUpValue || item.itemValue == lookUpValue ?
                  //item[displayField] === lookUpValue  || item.itemValue === lookUpValue ?
                  <MenuItem key={item[itemKey] || item.id} value={item[itemID] || item.id}> {item[displayField] || item.itemValue} </MenuItem>
                  : 'No LookUp Found'
                // <MenuItem key={item.id} value={item.id}> {item[displayField] || item.itemValue} </MenuItem>

              ))
            }
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}

        </FormControl>
      </Box>
    </>
  );
}

/*
{
  options?.filter(function(item: any) {
    return item.habitat == "Ocean";
  })
}
const records: any = gradeData
    const getEducationalLevelID = edcationalLevelValue;
    const getSingleGrades = records?.filter((item) => {
        return item.grade_type === 'single' && item.educational_level_id == getEducationalLevelID;
    });
    const getOverallGrades = records?.filter((item) => {
        return item.grade_type === 'overall' && item.educational_level_id == getEducationalLevelID;
    });

*/


export function SubCatLookUpSelect(props: any) {
  const { name, label, labelId, margin, type, id, error = null, onChange, size, sx, options, value, variant, minWidth, displayField, lookUpField, lookUpValue, ...other } = props;
  return (
    <>
      {/* <Box sx={{ minWidth:185 }} > */}
      <Box sx={{ minWidth: minWidth }} >
        <FormControl fullWidth>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            variant={variant}
            labelId={labelId}
            id={id}
            value={value}
            label={label}
            name={name}
            defaultValue={`Choose...`}
            autoWidth={false}
            onChange={onChange}>
            {/* <MenuItem value={''}>None</MenuItem>  */}

            {
              options?.map((item: any) => (

                item[lookUpField] == lookUpValue || item.itemValue == lookUpValue ?
                  //item[displayField] === lookUpValue  || item.itemValue === lookUpValue ?
                  <MenuItem key={item.id} value={item.id}> {item[displayField] || item.itemValue} </MenuItem>
                  : 'No LookUp Found'
                // <MenuItem key={item.id} value={item.id}> {item[displayField] || item.itemValue} </MenuItem>

              ))
            }
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}

        </FormControl>
      </Box>
    </>
  );
}