import React, { useEffect, useContext } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useTheme } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Stack } from '@mui/material';
import { TextBox } from 'Components/Items/Items.styles';

import { CartContext } from 'Components/Contexts/CartContext';


export const Item = (props) => {

  const [quantity, setQuantity] = React.useState(0);  

  const cartContext = useContext(CartContext);

  // useEffect(() => addToCart(), [quantity]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    console.log(quantity);
  }

  const handlePlus = () => {
    setQuantity(prev => prev + 1);    
  }

  const handleMinus = () => {
    setQuantity(prev => {
      if (prev > 0)
        return prev - 1;
    });    
  }


  const handleCart = () => {
    if (quantity > 0) {
      const product = {
        id: props.id,
        name: props.name,
        quantity: quantity,
        price: props.price
      } 
      cartContext.addToCart(product);
      console.log(product);
    } else {
      setQuantity(prev => {
        const product = {
          id: props.id,
          name: props.name,
          quantity: 1,
          price: props.price
        } 
        cartContext.addToCart(product);
        return 1;
      })
    }
   
  }




  const theme = useTheme();


  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 350, width: 300 }}>
        <CardHeader
          title={props.name}

        />
        <CardMedia
          component="img"
          height="194"
          image={`http://vitaliapizza.dk/vitalia/uploads/${props.image}`}
          alt={props.name}
          style={{ backgroundColor: theme.palette.pale.main }}
        />
        <CardContent>
          <Stack justifyContent='space-between' spacing={4}>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
            <Typography variant="h6" color="text.secondary" textAlign='right'>
              Pris: kr. {props.price}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing style={{ backgroundColor: theme.palette.pale.main }}>
          <Stack direction='row' width={'100%'} justifyContent='space-between'>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>

            <Stack direction='row' alignItems='center' justifyContent='center'>
              <IconButton disabled={quantity > 0 ? false : true} onClick={handleMinus} >
                <RemoveCircleOutlineIcon style={{ color: "red" }} />
              </IconButton>

              <TextBox name='txtQuantity' value={quantity} onChange={handleQuantityChange} />

              <IconButton aria-label="add item" onClick={handlePlus}>
                <AddCircleOutlineIcon color='success' />
              </IconButton>

            </Stack>

            <IconButton aria-label="cart" onClick={handleCart}>
              <AddShoppingCartIcon />
            </IconButton>
          </Stack>

        </CardActions>

      </Card>

    </React.Fragment>
  );
}
