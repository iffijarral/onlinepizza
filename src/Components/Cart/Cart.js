import React, { useContext } from 'react';

import { styled } from '@mui/material/styles';
import { 
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    IconButton,

} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { TextBox } from 'Components/Items/Items.styles';

import { CartContext } from 'Components/Contexts/CartContext';



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


export const Cart = () => {

    const cartContext = useContext(CartContext);

    const rows = cartContext.getCart();

    const handlePlus = (product) => {
        cartContext.addToCart(product);
    }

    const handleMinus = (id) => {
        cartContext.removeFromCart(id);
    }

    const handleQuantityChange = (event, id) => {
        cartContext.setProductQuantity(id, event.target.value);
    }


    let total = 0;
    let subTotal = 0;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Produkt(er)</StyledTableCell>
                        <StyledTableCell align="center">Pris</StyledTableCell>
                        <StyledTableCell align="center">Antal</StyledTableCell>
                        <StyledTableCell align="right">Total</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                        rows.length > 0 ?
                            <React.Fragment>
                                {
                                    rows.map((row) => (
                                        subTotal = row.price * row.quantity,
                                        total += subTotal,
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.price}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Stack direction='row' alignItems='center' justifyContent='center'>
                                                    <IconButton disabled={row.quantity > 0 ? false : true} onClick={() => handleMinus(row.id)} >
                                                        <RemoveCircleOutlineIcon style={{ color: "red" }} />
                                                    </IconButton>

                                                    <TextBox name='txtQuantity' value={row.quantity} onChange={(event) => handleQuantityChange(event, row.id)} />

                                                    <IconButton aria-label="add item" onClick={()=> handlePlus(row)}>
                                                        <AddCircleOutlineIcon color='success' />
                                                    </IconButton>
                                                </Stack>                                                
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {
                                                    subTotal
                                                }
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                                < StyledTableRow key={rows.length + 1}>
                                    <StyledTableCell align="center" colSpan={3}>I ALT</StyledTableCell>
                                    <StyledTableCell align="right">

                                        {total} kr.
                                    </StyledTableCell>
                                </StyledTableRow>
                            </React.Fragment>
                            :
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row" align='center' colSpan={4}>
                                    Kurven er tøm
                                </StyledTableCell>
                            </StyledTableRow>
                    }

                </TableBody>
            </Table>
        </TableContainer >
    );
}
