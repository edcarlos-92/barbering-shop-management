import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Controls from "@edcarlos/libs/@edcartech/components/Controls/Controls";
import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';

//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import {
  doInsert,
  doUpdate,
  deleteRec,
  getSystemUsersData,
  doSelect,
  doAddOrEdit,
} from 'redux/actions';
import { AppState } from 'redux/store';
//import { GET_CATEGORIES } from 'types/actions/MacTechRecruit.actions';
import { GET_CATEGORIES, GET_CENTRES, GET_CONSTRAINS, GET_CRATERIA, GET_CRITERIA_ALGORITHMS, GET_CRITERIA_ALGORITHMS_REF, GET_EDUCATIONAL_LEVELS, GET_GRADES, GET_REQUIREMENTS, GET_SUBJECTS, GET_SUB_CATEGORIES } from 'types/actions/MacTechRecruit.actions';
import { getCategoriesData, getEducationalLevelData, getSubCategoriesData, getSubjectsData } from 'redux/actions/MacTechRecruit';
import { useEffect, useState } from 'react';
import IntlMessages from '@edcarlos/utility/IntlMessages';
import { appIntl } from '@edcarlos/utility/helper/Utils';
import { objectValueWithReference } from '@edcarlos/libs/@edcartech/utils';
//-------------------------Redux Store----------------------------------------






function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}






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

// function TableGroupDetails(props: { detailData: ReturnType<typeof createData> }) {
function TableGroupDetails(props) {
  const { detailData, secondDbData } = props;
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [recordViewDetails, setrecordViewDetails] = useState(null)
  //const records = subjectsData;
  const [filterFn, setFilterFn] = useState({ fn: (items: any) => { return items; } })
  const [openPopup, setOpenPopup] = useState(false)
  const [viewPopup, setViewPopup] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })
  const [pages, setPages] = useState([10, 5, 50, 100, 150])

  const { messages } = appIntl();
  const msgconfirm = String(messages["common.msgconfirm"])
  const msgconfirmsub = String(messages["common.msgconfirmsub"])
  const msgdelete = String(messages["common.createsuccess"])
  const DeleteLog = String(messages["logactivity.DeleteLog"])


  const openInPopup = (item: any) => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  const onDelete = (id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    dispatch(deleteRec(`mactechrecruit/admin/settings/subjects/delete_subjects?id=${id}`, `Subjects ${DeleteLog}`, GET_SUBJECTS));

    setNotify({
      isOpen: true,
      message: msgdelete,
      type: 'error'
    })
  }


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{objectValueWithReference(secondDbData, detailData.educational_level_id, `educational_level`)}</TableCell>
        {/* <TableCell align="right">{detailData.calories}</TableCell>
        <TableCell align="right">{detailData.fat}</TableCell>
        <TableCell align="right">{detailData.carbs}</TableCell>
        <TableCell align="right">{detailData.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell><IntlMessages id='common.educational_level' /></TableCell>
                    <TableCell align="right"><IntlMessages id='common.subject_name' /></TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[detailData]?.map((detailItem) => (
                    <TableRow key={detailItem.id}>
                      <TableCell component="th" scope="row">{detailItem.id}</TableCell>
                      <TableCell>{objectValueWithReference(secondDbData, detailItem.educational_level_id, `educational_level`)}</TableCell>
                      <TableCell align="right">{detailItem.subject_name}</TableCell>
                      <TableCell align="right">

                        <Box sx={{ display: 'flex', flexDirection: 'row', p: 1, '& > :not(style)': { m: 1 }, justifyContent: 'right' }}  >
                          <Controls.ActionButton
                            sx={{ ...editIcon }}
                            onClick={() => { openInPopup(detailItem) }}>
                            <EditOutlinedIcon sx={{ ...iconSize }} />
                          </Controls.ActionButton>

                          <Controls.ActionButton
                            sx={{ ...deleteIcon }}
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: msgconfirm,
                                subTitle: msgconfirmsub,
                                onConfirm: () => { onDelete(detailItem.id) }
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const groupTitles = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {

  const dispatch = useDispatch();
  useEffect(() => {
    getEducationalLevelData(dispatch);
    getSubjectsData(dispatch);
  }, []);

  //const { systemUsersData } = useSelector<AppState, AppState['general']>(({ general }) => general,);
  const { subjectsData, categoriesData, educationalLevelsData, } = useSelector<AppState, AppState['mactechrecruit']>(({ mactechrecruit }) => mactechrecruit,);

  const records: any = subjectsData;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><IntlMessages id='common.educational_level' /></TableCell>
            {/* <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {records?.map((row) => (
            <TableGroupDetails key={row.name} detailData={row} secondDbData={educationalLevelsData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
