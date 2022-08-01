import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from 'Components/Contexts/AuthContext';
import 'Styles/Stripe.css';
import { postRequest } from 'AxiosClient';

import { CartContext } from 'Components/Contexts/CartContext';
import { Typography } from "@mui/material";

export default function CheckoutForm(props) {

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const auth = useContext(AuthContext);

    const cartContext = useContext(CartContext);

    const products = cartContext.getCart();

    useEffect(() => {

        loadClientSecreet();

    }, []);

    const loadClientSecreet = async () => {
        try {
            const productData =
            {
                products: products
            }

            const response = await postRequest('payment', productData);

            if (response.data) {
                setClientSecret(response.data.clientSecret);
            }

        }
        catch (error) {
            setError(error);
        }
    }
    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(`Betaling mislykkedes ${payload.error.message}`);
            setProcessing(false);
        } else {
            
            props.handleOrder();            
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const saveTransaction = async (payload) => {

        const paymentData = {
            userid: auth.authState.id,
            txn_id: payload.id,
            payment_gross: (payload.amount) / 100,
            currency_code: payload.currency,
            payer_email: auth.authState.email,
            payment_status: payload.status
        }

        const response = await postRequest('transaction', paymentData);

        if (response.data.status) {

            auth.setAuthState(response.data.user);

            auth.saveCookie(response.data.user);

            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
        else {
            setError(`Transaction failed, please try again later. Sorry for inconvenience.`);
            setProcessing(false);
        }


    }

    return (


        <form id="payment-form" className="stripeForm" onSubmit={handleSubmit}>

            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            <button
                disabled={processing || disabled || succeeded}
                id="submit"
            >
                <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "Betal nu for at bestille"
                    )}
                </span>
            </button>

            {error && (
                <div id="card-error" role="alert">
                    {error}
                </div>
            )}
            <Typography variant="body1" textAlign='center' pt={1} color='secondary' className={succeeded ? "result-message" : "result-message hidden"}>
                Betaling lykkedes, mange tak for dit køb.
            </Typography>


        </form>

    );
}