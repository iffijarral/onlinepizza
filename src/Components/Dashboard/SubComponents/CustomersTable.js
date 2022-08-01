import React, { useEffect } from 'react';
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

import { Button } from '@mui/material';

import { postRequest } from 'AxiosClient';

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



export const CustomersTable = () => {

    const [rows, setRows] = React.useState([]);
    const [status, setStatus] = React.useState('Pending');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {

        loadCustomers();

    },[]);

    const loadCustomers = async() => {
        const data = {
            action: 'get'
        };

        const response = await postRequest('customer', data);        
        
        if(response.data.status) {
            setRows(response.data.customers);
        } 

    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>                        
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Phone</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>                        
                    </TableRow>
                </TableHead>
                <TableBody>                    
                    {
                    rows.length > 0 ?
                    rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            
                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.email}</StyledTableCell>
                            <StyledTableCell align="center">{row.phone}</StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                        </StyledTableRow>
                    ))

                    :
                    <StyledTableRow>                            
                        <StyledTableCell colSpan={4} align="center">Ingen data fundet</StyledTableCell>                        
                    </StyledTableRow>
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
