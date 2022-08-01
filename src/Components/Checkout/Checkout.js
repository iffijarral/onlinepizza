import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    StepLabel,
    Paper,
    Stepper,
    Button,
    Typography,
    Step,
    Stack,
    IconButton
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AddressForm } from "./CustomerDetails";
import Review from "./Review";
import { AuthWrapper } from "Components/Auth/Auth.styles";

import { useTheme } from '@mui/material/styles';
import { Cart } from "Components/Cart/Cart";
import { CheckoutContext } from 'Components/Contexts/CheckoutContext';
import { CartContext } from 'Components/Contexts/CartContext';
import { AuthContext } from 'Components/Contexts/AuthContext';

import { postRequest } from 'AxiosClient';

import SnackBar from 'Util/Snackbar';
import { IsOpen } from 'Util/Common';
import CheckoutForm from './CheckoutForm';
import { CheckoutParent } from './CheckoutParent';

const steps = ["Kurven", "Kundeoplysninger", "Betaling"];

export const Checkout = () => {

    const [skipped, setSkipped] = React.useState(new Set());

    const [detailForm, setDetailForm] = React.useState(false);

    const [customerData, setCustomerData] = React.useState({});

    const [trackingCode, setTrackiingCode] = React.useState('');

    const navigate = useNavigate();

    const checkoutContext = React.useContext(CheckoutContext);

    const cartContext = React.useContext(CartContext);

    const authContext = React.useContext(AuthContext);

    const [snackbarState, setSnackbarState] = React.useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

    const [snackbarMsg, setSnackbarMsg] = React.useState("");

    const [paymentMethod, setPaymentMethod] = React.useState('mobilepay');

    const isShopOpen = IsOpen();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarState(false);

    }

    const showSnakkebar = (severity, message) => {

        setSnackbarState(true);

        setSnackbarSeverity(severity);

        setSnackbarMsg(message);
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    }; 

    const handleDetailForm = () => {
        setDetailForm(prevValue => !prevValue);

    }

    const handleCustomerData = (data) => {
        setCustomerData(data);

    }

    const handlePaymentMethod = (value) => {
        setPaymentMethod(value);
    }
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Cart />;
            case 1:
                return <AddressForm customerData={customerData} callForm={detailForm} handleCallForm={handleDetailForm} handleCustomerData={(data) => handleCustomerData(data)} />;
            case 2:
                return <CheckoutParent handleOrder={handleOrder} handlePaymentMethod={handlePaymentMethod} />;
            default:
                throw new Error("Unknown step");
        }
    }

    const handleNext = () => {
        // let newSkipped = skipped;
        // if (checkoutContext.isStepSkipped(checkoutContext.activeStep)) {
        //     newSkipped = new Set(newSkipped.values());
        //     newSkipped.delete(checkoutContext.activeStep);
        // }
        if (steps[checkoutContext.activeStep] === 'Kurven') {

            localStorage.setItem("products", JSON.stringify(cartContext.getCart()));

        } else if (steps[checkoutContext.activeStep] === 'Kundeoplysninger') {

            handleDetailForm();

            if (!checkoutContext.isCustomerFormSaved) {
                return false;
            } else {
                handleBack();
            }
        } else if (steps[checkoutContext.activeStep] === 'Betaling') {
            
            if (isShopOpen) {
                
                handleOrder();
                // showSnakkebar('warning', 'Hjemmesiden er i testtilstand!');
                // return false;
            } else {
                showSnakkebar('warning', 'Butikken er lukket!');
                return false;
            }

        }
        if(steps[checkoutContext.activeStep] !== 'Betaling')
            checkoutContext.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // checkoutContext.setSkipped(newSkipped);
    };

    const handleBack = () => {
        checkoutContext.setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(checkoutContext.activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        checkoutContext.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        checkoutContext.setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(checkoutContext.activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        checkoutContext.setActiveStep(0);
    };

    const handleOrder = async () => {                
       
        const products = cartContext.getCart();
        const customer = authContext.authState;

        const orderData = new FormData();
        orderData.append('products', products);
        orderData.append('customer', customer);

        const data = {
            products: products,
            customer: customer,
            action: 'save'
        }

        const response = await postRequest('order', data);
        
        if (response.data.status) {

            setTrackiingCode(response.data.trackingCode);

            localStorage.removeItem("products");

            cartContext.clearCart();


        }

        checkoutContext.setActiveStep(steps.length);
    }

    let saveStateChangeButton = '';

    return (
        <React.Fragment>
            <AuthWrapper>

                <Stack spacing={3} width={{ md: '20em' }} alignItems='center' justifyContent='space-around'>
                    <Typography component="h1" variant="h4" >
                        Checkout
                    </Typography>
                    <Stepper activeStep={checkoutContext.activeStep}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {checkoutContext.activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom textAlign='center'>
                                    Tak for bestiling
                                </Typography>
                                <Typography variant="subtitle1" textAlign='center'>
                                    Din ordre trackingkode er: {trackingCode}
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(checkoutContext.activeStep)}
                                <div style={{ display: 'flex', justifyContent: checkoutContext.activeStep == 0 ? 'flex-end' : 'space-between', width: '100%' }}>
                                    {checkoutContext.activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                        >
                                            Tilbage
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        disabled={cartContext.selectedProductsCount() < 1 || paymentMethod === 'card' ? true : false}

                                    >
                                        {/* {checkoutContext.activeStep === steps.length - 1 ? "Betale" : "Næste"} */}
                                        Næste
                                    </Button>
                                    <input
                                        type='button'
                                        ref={input => {
                                            // assigns a reference so we can trigger it later
                                            saveStateChangeButton = input;
                                        }}
                                        value='change'
                                        hidden
                                        onClick={() => console.log('clicked')}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                    <div style={{ marginRight: 'auto' }}>
                        <IconButton
                            aria-label="Tilføje Produkter"
                            onClick={() => {
                                checkoutContext.setActiveStep(0);
                                navigate('/');
                            }}
                        >
                            <ArrowBackIcon />
                            <Typography variant="body2" ml={1}>Tilføje Produkter</Typography>
                        </IconButton>
                    </div>

                </Stack>
                <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />
            </AuthWrapper>
        </React.Fragment>
    );
}

