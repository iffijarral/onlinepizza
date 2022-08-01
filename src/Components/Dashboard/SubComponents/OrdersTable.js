import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiUrl } from 'Constants';
import { postRequest } from 'AxiosClient';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { StatusSwitch } from 'Util/Switch';
import { Data } from 'Data/Data';

import { io } from "socket.io-client";

import Bell from 'Sounds/bell.wav';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



export const OrdersTable = (props) => {

    const [orders, setOrders] = React.useState([]);

    const [status, setStatus] = React.useState('Pending');

    const alert = new Audio(Bell);

    const handleChange = (event) => {
        console.log('a');
    };

    useEffect(() => {

        const socket = io(apiUrl);

        socket.connect();

        socket.on("order-message", data => {
            alert.play()

            loadOrders()
        });

        loadOrders()

        return () => {
            socket.disconnect();
        }
       
        /*if (props.orderSelection === 'current') {
            
            const timeTable = Data.timeTable;
            const currentHour = new Date().toLocaleTimeString('da-DK', { hour: '2-digit' });
            const day = new Date().toLocaleString('da-DK', { weekday: 'long' });

            let openingTime;
            let closingTime;

            for (const key of Object.keys(timeTable)) {
                if (key === day) {
                    openingTime = timeTable[key].open;
                    closingTime = timeTable[key].close;
                }
            }

            if (currentHour >= openingTime && currentHour <= closingTime) {
                loadOrders();
                
                const interval = setInterval(() => {
                    loadOrders();                    
                }, 60000);

                return () => {                    
                    clearInterval(interval);
                };
            } else {
                loadOrders();
            }
        } else {            
            loadAllOrders();
        }

        return () => {
            setOrders([]);
        }*/

    }, [props.orderSelection]);

   

    const loadAllOrders = async () => {
        const data = {
            action: 'getAll'
        };
        const response = await postRequest('order', data);        
        if(response.data.status) {
            setOrders(response.data.orderData);
        }
    }

    const loadOrders = async () => {
        const data = {
            action: 'get'
        };
        const response = await postRequest('order', data);
        
        if (response.data.status) {

            if (response.data.orderData.length > 0) {

                alert.play();

                if (localStorage.getItem("orders") === null) {

                    localStorage.setItem("orders", JSON.stringify(response.data.orderData));

                    setOrders(response.data.orderData);

                } else {

                    let storedOrders = JSON.parse(localStorage.getItem("orders"));

                    for (let i = 0; i < response.data.orderData.length; i++) {

                        const found = storedOrders.some(el => el.id === response.data.orderData[i].id);

                        if (!found)
                            storedOrders.push(response.data.orderData[i]);
                    }

                    localStorage.setItem("orders", JSON.stringify(storedOrders));

                    setOrders(storedOrders);
                }
            } else {

                if (localStorage.getItem("orders") !== null) {

                    const storedOrders = JSON.parse(localStorage.getItem("orders"));

                    setOrders(storedOrders);

                }
            }

        }

    }

    const handleSwitch = (event, id) => {

        if (event.target.checked) {

            if (updateOrderStatus(id)) {
                const updatedData = orders.filter(order => order.id !== id);
                setOrders(updatedData);
                localStorage.setItem("orders", JSON.stringify(updatedData));
            }
        }

    }

    const updateOrderStatus = async (id) => {
        const data = {
            id: id,
            status: 'Completed',
            action: 'updateOrderStatus'
        }

        const response = await postRequest('order', data);

        return response.data.status;

    }
    const tableRows =
        orders.map((order) => {

            return (
                <StyledTableRow key={order.id}>
                    <StyledTableCell key={order.id+1} component="th" scope="row">
                        {
                            order.products.map((product, index) => {
                                return (
                                    <Typography key={index} variant='body2'>
                                        {(index + 1) + '. ' + product.name}
                                    </Typography>
                                )
                            })

                        }
                    </StyledTableCell>
                    <StyledTableCell key={order.id+2} align="center">{order.customer}</StyledTableCell>
                    
                    <StyledTableCell key={order.id+3} align="center">{order.created}</StyledTableCell>
                    <StyledTableCell key={order.id+4} align="center">
                        <StatusSwitch key={order.id+5} orderID={order.id} orderStatus={order.status} orderSelection={props.orderSelection} handleSwitch={handleSwitch} />

                        {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order.status}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value='Placed'><span style={{ color: 'orange' }}>Placed</span></MenuItem>
                            <MenuItem value='Completed'><span style={{ color: 'green' }}>Completed</span></MenuItem>
                        </Select> */}

                    </StyledTableCell>
                </StyledTableRow>
            )
        })

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Besteling</StyledTableCell>
                        <StyledTableCell align="center">Kunden</StyledTableCell>
                        <StyledTableCell align="center">Dato</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.length > 0 ? tableRows
                        :
                        <StyledTableRow>
                        <StyledTableCell colSpan={4}>
                            Ingen ordre endnu
                        </StyledTableCell>
                        </StyledTableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
