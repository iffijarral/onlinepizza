import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import SnackBar from 'Util/Snackbar';
import { postRequest } from 'AxiosClient';


import { NewCategoryDialog } from '../Dialogs/NewCategory';
import { ConfirmationDialog } from '../Dialogs/ConfirmationDialog';
import { NewSubCategoryDialog } from '../Dialogs/NewSubCategoryDialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
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

export const SubCategoriesTable = (props) => {

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");


    const [open, setOpen] = useState(false); //Dialog state
    const [confirmationOpen, setConfirmationOpen] = useState(false); //confirmation dialog state

    const [rows, setRows] = useState([]); //contains categories record from database

    const [currentIndex, setCurrentIndex] = useState(0); // current Index

    const childRef = useRef();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarState(false);

        if (snackbarSeverity === 'success') {

            handleConfirmationClose();

        }
    }

    const showSnakkebar = (severity, message) => {

        setSnackbarState(true);

        setSnackbarSeverity(severity);

        setSnackbarMsg(message);

    }

    const handleClickOpen = (index) => {
        childRef.current.handleAction('edit');
        setOpen(true);
        setCurrentIndex(index);
    };

    const handleConfirmationOpen = (index) => {
        setConfirmationOpen(true);
        setCurrentIndex(index);
    };

    const handleConfirmationClose = () => {
        setConfirmationOpen(false);
    };

    const handleDelete = async () => {

        const formData = new FormData();

        formData.append('id', rows[currentIndex].id);

        formData.append('action', 'delete');

        // for (var p of formData) {
        //     let name = p[0];
        //     let value = p[1];

        //     console.log(name, value);
        // }

        const response = await postRequest('subCategory', formData);

        if (response.data.status) {
            childRef.current.handleAction('');
            showSnakkebar('success', response.data.msg);
        } else 
            showSnakkebar('error', response.data.error);
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(async () => {
        console.log(`selected category is: ${props.categoryId}`);
        const formData = new FormData();

        formData.append('action', 'get');

        formData.append('catID', props.categoryId);
        for (var p of formData) {
            let name = p[0];
            let value = p[1];

            console.log(name, value)
        }
        const response = await postRequest('subCategory', formData);
        
        if(response.data.status) {
            const subCategories = Array.from(response.data.subCategories);
            setRows(subCategories);
        } else {
            setRows([]);
        }     

    }, [props.categoryId, props.dialogState, open, confirmationOpen ]);



    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Update</StyledTableCell>
                            <StyledTableCell align="center">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? rows.map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="td" scope="row">
                                    <img src={'http://vitaliapizza.dk/vitalia/uploads/' + row.image} width={50} alt={row.name} />
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => handleClickOpen(index)}> <EditIcon />  </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => handleConfirmationOpen(index)}> <DeleteIcon />   </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                        :
                        <StyledTableRow>
                            <StyledTableCell colSpan={4} align="center">No record available</StyledTableCell>
                        </StyledTableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <NewSubCategoryDialog ref={childRef} open={open} categories={rows[currentIndex]} handleClose={handleClose} />            
            <ConfirmationDialog open={confirmationOpen} type='subCategory' category={rows[currentIndex]} handleDelete={handleDelete} handleClose={handleConfirmationClose} />

            <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />

        </React.Fragment>
    );
}
