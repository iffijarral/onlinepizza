import React, { useEffect, useContext } from 'react';

import {
    TextField,
    Stack
} from '@mui/material';

import { CheckoutValidationSchema } from "Components/Validation/CheckoutValidationSchema";
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { CheckoutContext } from 'Components/Contexts/CheckoutContext';
import { AuthContext } from 'Components/Contexts/AuthContext';

export const AddressForm = (props) => {

    const checkoutContext = useContext(CheckoutContext);
    const authContext = useContext(AuthContext);

    const initialValues = {
        name: '',
        email: '',
        phone: '',
    }

    const [userData, setUserData] = React.useState(() => {

        if (authContext.authState.id != null) { // it means user is logged in

            return authContext.authState;

        } else {
            // getting stored value
            const saved = localStorage.getItem("customerData");
            const storedValue = JSON.parse(saved);
            return storedValue || initialValues;
        }

    });

   

    useEffect(async () => { //It is executed on component load and when the callForm state is updated in checkout or parent component

        if (props.callForm) {
            submitButton.click();
            props.handleCallForm();

        }

    }, [props.callForm, props.customerData]);

    function shallowEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (let key of keys1) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }
        return true;
    }

    let submitButton = '';

    const onSubmit = async (values, props) => {
        
        const customerData = {
            name: values.name,
            email: values.email,
            phone: values.phone
        }

        if(authContext.authState.id != null) {
            
            customerData['id'] = authContext.authState.id;
            
            if(!shallowEqual(customerData, userData)) {
                
                localStorage.setItem("customerData", JSON.stringify(customerData));
            }
        } else if(!shallowEqual(customerData, userData)) {
           
            localStorage.setItem("customerData", JSON.stringify(customerData));            
            
        }          
        
        authContext.setAuthState(customerData);
        checkoutContext.handleFormState(true);
        checkoutContext.setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // props.resetForm()
        // props.setSubmitting(false)
    }

    return (
        <React.Fragment>
            <Formik initialValues={userData} onSubmit={onSubmit} validationSchema={CheckoutValidationSchema}>
                {(props) => (
                    <Form style={{ width: '100%' }}>
                        <Stack width='100%' spacing={1}>

                            <Field as={TextField} label='Name' name="name"

                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                autoComplete="name"
                                helperText={<ErrorMessage name="name" />}
                            />

                            <Field as={TextField}

                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                autoComplete="email"
                                helperText={<ErrorMessage name="email" />}
                            />

                            <Field as={TextField}

                                id="phone"
                                name="phone"
                                label="Phone"
                                fullWidth
                                autoComplete="phone"
                                helperText={<ErrorMessage name="phone" />}
                            />
                            <input
                                type='submit'
                                ref={input => {
                                    // assigns a reference so we can trigger it later
                                    submitButton = input;
                                }}
                                value='submit'
                                hidden
                            />

                        </Stack>
                    </Form>
                )}
            </Formik>


        </React.Fragment>
    );
}
