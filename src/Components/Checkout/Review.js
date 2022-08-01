import React, { useContext } from 'react';

import {
  Grid,
  List,
  ListItemText,
  ListItem,
  Typography,
  Stack
} from '@mui/material';

import { CartContext } from 'Components/Contexts/CartContext';

function Review(props) {

  const cartContext = useContext(CartContext);

  const products = cartContext.getCart();

  let subTotal = 0;
  let total = 0;
  return (
    <React.Fragment>
      <Stack width='100%'>
       
        <List disablePadding>
          {products.map(product => (
            subTotal = product.quantity * product.price,
            total += subTotal, 
            <ListItem key={product.name}>
              <ListItemText primary={product.name + ' x '+ product.quantity} />
              <Typography variant="body2">{subTotal}</Typography>
            </ListItem>
          ))}
          <ListItem>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1">
              {total} kr.
            </Typography>
          </ListItem>
        </List>                                  
        </Stack>
     
    </React.Fragment>
  );
}


export default Review;
