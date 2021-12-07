import React, { useState, useRef } from 'react'

import { defaultTheme } from '@edcarlos/utility/AppContextProvider/defaultConfig';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
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
import ReactToPrint from 'react-to-print';
import IconButton from '@mui/material/IconButton/IconButton';
import PrintIcon from '@mui/icons-material/Print';
//import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel, Paper } from '@mui/material'
import XLSX from 'xlsx';
import Controls from "@edcarlos/libs/@edcartech/components/Controls/Controls";
import Download from '@mui/icons-material/Download';
import PrintPdf from '@mui/icons-material/PictureAsPdf';




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



const iconSize = {
    fontSize: 15,
}

const xlxStyle = {
    fontSize: 15,
    color: '#03572f'// '#c90835'//'#33F'
}

const pdfStyle = {
    fontSize: 15,
    color: '#883F'
}



export default function useTable(records: any, headCells: any, filterFn: any, pages?: any) {

    //pages = [0]
    //const pages = [10, 5, 50, 100, 150]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState<'asc' | 'desc'>()
    const [orderBy, setOrderBy] = useState();
    const componentRef = useRef(null);

    //console.log(`The Records to Load`,records)
    const downloadExcel = () => {
        const newData = records.map(row => {
            delete row.tableData
            return row
        })
        const workSheet = XLSX.utils.json_to_sheet(newData)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        //Buffer
        XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "Document.xlsx")
    }


    const TblContainer = (props: any) => {
        return (

            <>
                <Box ref={componentRef}>

                    <h1 id='printTitleId' >{props.printTitle}</h1>
                    <TableContainer component={Paper}  >
                        <Table
                            id='muiTableId'
                            size={props.size} //'small' : 'medium'
                            sx={{
                                minWidth: props.width,
                                '.MuiTableCell-body': {
                                    paddingTop: props.paddingTop,
                                    paddingBottom: props.paddingBottom
                                }
                            }}
                            aria-labelledby={props.tableTitle}
                        >
                            {props.children}
                        </Table>
                        {/* ---Below Every Table---*/}
                        <a id="belowTableId" href='#' >
                            <ReactToPrint
                                trigger={() => <IconButton > <PrintIcon color='primary' sx={{ ...iconSize }} /> </IconButton>}
                                content={() => componentRef.current}
                            />

                            <Download onClick={() => { downloadExcel() }} sx={{ ...xlxStyle, mr: 3, }} />
                            {/* <PrintPdf onClick={() => { downloadExcel() }} sx={{ ...pdfStyle, mr: 3, }} /> */}
                        </a>

                        {/* ---Below Every Table--- */}
                    </TableContainer>
                </Box>
            </>
        )

    }

    const TblHead = () => {
        const handleSortRequest = (cellId: any) => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            //[(orderBy || cellId) === 'asc' ? 'asc' : 'desc']
            //setOrder(isAsc 'asc'  ? 'desc' : 'asc' );       
            setOrderBy(cellId)
        }
        return (
            <>
                <TableHead id='tableHeadId'>
                    <TableRow id='tableRowId'>
                        {
                            headCells.map((headCell: any) => (
                                <StyledTableCell
                                    key={headCell.id}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                    sx={{ textAlign: headCell.align }}

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

    const TblPagination = () => (

        <TablePagination
            // rowsPerPageOptions={pages}
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
