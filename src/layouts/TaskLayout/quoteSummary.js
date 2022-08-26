import React, { useRef, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import StyleIcon from '@material-ui/icons/Style';
import './style.css';
import { Grid, Icon, MenuItem, Menu } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'react-moment';
import Loader from './loader';
import { TXN_STATE_VARIABLE } from '../../variables/chatWidget'
import { getQuoteSummary } from 'src/services/camundaService';


const columns = [
    { id: 'quote', label: 'Quote', minWidth: 100 },
    { id: 'createdBy', label: 'Created By', minWidth: 100 },
    {
        id: 'createdOn',
        label: 'Created On',
        minWidth: 100
    },
    {
        id: 'quoteExpiry',
        label: 'Quote Expires',
        minWidth: 100
    },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'buyerName', label: 'Buyer Name', minWidth: 100 },
    { id: 'sellerName', label: 'Seller Name', minWidth: 100 },
    { id: 'amt', label: 'Total Amount in Rs', minWidth: 100 },
    { id: 'conditions', label: 'Terms and Conditions', minWidth: 100 },
];

function createData(quote, createdBy, createdOn, quoteExpiry, status, buyerName, sellerName, amt, conditions) {
    return { quote, createdBy, createdOn, quoteExpiry, status, buyerName, sellerName, amt, conditions };
}

const useStyles = makeStyles({
    container: {
        maxHeight: 440,
    },
});

export default function QuoteSummary({ selectedTask }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [configJson, setConfigJson] = React.useState(JSON.parse(sessionStorage.getItem('config')));
    const [openCommentBox, setOpenCommentBox] = React.useState(null);
    const [commentList, setCommentList] = React.useState([]);
    const inputRef = useRef(null);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (selectedTask) {
            getComments();
        }
    }, [])

    useEffect(() => {
        if (selectedTask) {
            getComments();
        }
    }, [selectedTask])

    function getComments() {
        setLoading(true);
        // getCommentsList()
        getQuoteSummary().then(response => {
            if (response.success) {
                if (response && response.data.length > 0) {
                    let rows = [];
                    response.data.forEach(summary => {
                        rows.push(createData(summary.quote,
                            summary.createdBy,
                            <Moment format="YYYY/MMM/DD">{summary.createdOn}</Moment>,
                            <Moment format="YYYY/MMM/DD">{summary.quoteExpiry}</Moment>,
                            getStatus(summary.status) ,
                            summary.buyerName,
                            summary.sellerName,
                            summary.amt,
                            summary.conditions,
                            ))
                    });
                    setCommentList(rows);
                } else {
                    setCommentList([]);
                }
                setLoading(false);
            }
            if (!response.success) {
                setLoading(false);
            }
        })

    

        // getCommentsList(selectedTask.id).then(response => {
        //     if (response.success) {
        //         if (response && response.data.length > 0) {
        //             let rows = [];
        //             response.data.forEach(comment => {
        //                 rows.push(createData(comment.message, comment.userId, <Moment format="YYYY/MM/DD HH:mm">{comment.time}</Moment>, comment.message))
        //             });
        //             setCommentList(rows);
        //         } else {
        //             setCommentList([]);
        //         }
        //         setLoading(false);
        //     }
        //     if (!response.success) {
        //         setLoading(false);
        //     }
        // })

    }

    function getStatus(status) {
        switch(status) {
            case 'Approved' :   return <span className="status-approved">{status}</span> 
            break;

            case 'Negotiation' :   return <span className="status-negotiate">{status}</span> 
            break;

            default :  return <span>{status}</span> 
        }
    }
    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    return (
        <div className={'custom-table-block'}>
            <Grid container>
                <Grid item lg={12} md={12} sm={12} className={''}>
                    <AppBar position="relative" color="transparent" variant="dense" className={'buyer-head'}>
                        <Toolbar>
                            <Grid container spacing={0} >
                                <Grid item lg={6} md={6} xs={12}>
                                    <Typography variant="h5">
                                        {(configJson && configJson.headings) ? configJson.headings.quoteSummary.main : ''}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>

                    <div style={{ position: 'relative' }}>
                        {loading && <Loader position={'absolute'} />}
                        <Paper className={'custom-table-layout quote-summary-table'} elevation0>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {commentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            /> */}
                        </Paper>
                    </div>

                </Grid>
            </Grid>
        </div>
    )
}

