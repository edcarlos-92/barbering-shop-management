import React, { useState } from 'react'

import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
//import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
//import { makeStyles, TableSortLabel } from '@mui/material'

//import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel, Paper } from '@mui/material'

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



/*
const classes:any = {

  root: {
      width: '100%',
    },
    paper: {
      marginTop: '2em',// defaultTheme.theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom:'2em',// defaultTheme.theme.spacing(2),
    },
   
  table: {
     
      minWidth: 650,
      marginTop:'3em',// defaultTheme.theme.spacing(3),
      '& thead th': {
          fontWeight: '600',
          color: defaultTheme.theme.palette.primary.contrastText,
          //defaultTheme.theme.palette.secondary.main,
          backgroundColor: defaultTheme.theme.palette.primary.main,
      },
      // '& thead th:hover': {
      //     color: defaultTheme.theme.palette.primary.contrastText,
      //     backgroundColor: defaultTheme.theme.palette.primary.main,
      // },
      '& tbody td': {
          fontWeight: '300',
      },
      '& tbody tr:hover': {
          backgroundColor:defaultTheme.theme.palette.primary.mainLight,
          cursor: 'pointer',
      },
      '& td.MuiTableCell-root.MuiTableCell-body':{
          padding: '0px',
      },

      '& th.MuiTableCell-root.MuiTableCell-head':{
          padding: '5px',           
      },
      '& span.MuiTableSortLabel-root.MuiTableSortLabel-active':{
          color:'white'
      },
      '& span.MuiButtonBase-root.MuiTableSortLabel-root:hover':{
          color:'white'
      },
           
      '& thead.MuiTableHead-root':{//top accross
          borderTopRightRadius: '5px'
      } 
  },

};

*/

export default function useTable(records: any, headCells: any, filterFn: any, pages?: any) {

    //const pages = [10, 5, 50, 100, 150]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState<'asc' | 'desc'>()
    const [orderBy, setOrderBy] = useState()


    const TblContainer = (props: any) => (
        <TableContainer component={Paper}>
            <Table

                size={props.size} //'small' : 'medium'
                sx={{
                    minWidth: props.width,
                    '.MuiTableCell-body': {
                        paddingTop: props.paddingTop,//'0px',
                        paddingBottom: props.paddingBottom//'0px',
                    }

                }}//750
                aria-labelledby={props.tableTitle}

            >
                {props.children}
            </Table>
        </TableContainer>
    )


    const TblHead = (props: any) => {
        const handleSortRequest = (cellId: any) => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            //[(orderBy || cellId) === 'asc' ? 'asc' : 'desc']
            //setOrder(isAsc 'asc'  ? 'desc' : 'asc' );       
            setOrderBy(cellId)
        }
        return (
            <>
                <TableHead>
                    <TableRow>
                        {
                            headCells.map((headCell: any) => (
                                <StyledTableCell
                                    key={headCell.id}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    {
                                        headCell.disableSorting ? headCell.label :
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={() => { handleSortRequest(headCell.id) }}
                                            // sx={{
                                            //     "& tr.MuiTableRow-root.MuiTableRow-head.css-ypjwlk-MuiTableRow-root:hover":{color:'##fff'},
                                            //     "& span..MuiButtonBase-root-MuiTableSortLabel-root.Mui-active":{color:'##fff'}
                                            // }}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                    }
                                </StyledTableCell>))
                        }
                    </TableRow>
                </TableHead>
            </>
        )
    }

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }


    function stableSort(records: any, comparator: any) {
        //if (array !== null || array !== undefined ){
        //if (typeof array !== undefined || array !== null) {

        const stabilizedThis = records.map((el: any, index: any) => [el, index]);
        stabilizedThis.sort((a: any, b: any) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el: any) => el[0]);
        //} else {array=[]}

    }



    function descendingComparator(a: any, b: any, orderBy: any) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }


    function getComparator(order: any, orderBy: any) {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    const recordsAfterPagingAndSorting = () => {
        //console.log(`recordsAfterPagingAndSorting`, Date().toLocaleString());
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }


    const TblPagination = (props) => (
        <TablePagination
            rowsPerPageOptions={pages}
            component='div'
            count={records.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />

    )


    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}
