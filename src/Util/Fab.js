import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import Badge from '@mui/material/Badge';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import { IconButton } from '@mui/material';

import { CartContext } from 'Components/Contexts/CartContext';

export const Betaling = () => {

    const cartContext = useContext(CartContext);

    const productsCount = cartContext.selectedProductsCount();

    const navigate = useNavigate();

    const handlePayment = (event) => {
        navigate('/checkout');
    }
    return (
        <Box>
            {productsCount > 0 ?
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{
                        position: 'fixed',
                        top: 'auto',
                        left: 'auto',
                        bottom: 25,
                        right: 25
                    }}
                    onClick={handlePayment}
                >

                    <Badge badgeContent={productsCount} color='primary' sx={{ mr: 1 }} > <ShoppingBasketIcon /></Badge>
                    Betaling
                </Fab>
                :
                ''
            }
        </Box>
    );
}
