import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

import CardImg from 'Images/cards.jpeg';
import { Grid, Paper, Typography } from '@mui/material';

export const CheckoutParent = (props) => {
    const [value, setValue] = React.useState('mobilepay');

    const handleChange = (event) => {
        setValue(event.target.value);
        props.handlePaymentMethod(event.target.value);
    };

    const stripePromise = loadStripe('pk_test_51KhrtfGN6QzLP9qlM34debd55YI7LwuMSCmQkfiGrupbABvq5DQOg9ehOQlvFYH6P0jNRSayDwQyKrRlQYnMdlX500wr7Ry1J9');
    
    return (
        <Elements stripe={stripePromise}>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group" sx={{textAlign: 'center'}}>Betalingsmetode</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="mobilepay" control={<Radio />} label="Mobilepay" />
                    <FormControlLabel value="card" control={<Radio />} label="Kort" />
                </RadioGroup>
            </FormControl>
            {value === 'card' ? <CheckoutForm handleOrder={props.handleOrder} /> : <Mobilepay />}
            <div className="supportedCards">
                <img src={CardImg} width='8em' alt="supported cards" />
            </div>
        </Elements>
    )
}

const Mobilepay = () => {
    return (
        <React.Fragment>
            <Grid container sx={{padding: 0, margin: 0}}>
                <Grid item xs={12} sx={{padding: 0, margin: 0}}>
                    <Paper elevation={0} sx={{padding: '1em .3em', boxShadow: '0px 0px 0px 0.5px rgb(50 50 93 / 10%), 0px 2px 5px 0px rgb(50 50 93 / 10%), 0px 1px 1.5px 0px rgb(0 0 0 / 7%)', borderRadius: '7px'}}>
                        <Typography variant='body2' textAlign='center' color='GrayText' >
                            Betal på følgende mobilepay nummer og vis kvittering ved afhentning
                        </Typography>
                        <Typography className='mobilepayText' variant='h4' color='secondary'>
                            143041
                        </Typography>
                    </Paper>

                </Grid>
            </Grid>
        </React.Fragment>
    )
}
