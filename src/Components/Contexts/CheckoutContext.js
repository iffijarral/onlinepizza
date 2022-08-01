import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutContext = createContext();
const { Provider } = CheckoutContext; 

const CheckoutProvider = ({ children }) => {           

    const [activeStep, setActiveStep] = React.useState(0);

    const [skipped, setSkipped] = React.useState(new Set());

    const [isCustomerFormSaved, setCustomerFormSaved] = React.useState(false);

    const handleFormState = (state) => {
        setCustomerFormSaved(state);
    }

    return (
        <Provider
            value={{
                activeStep,
                setActiveStep,
                skipped,
                setSkipped,
                isCustomerFormSaved,  
                handleFormState,                                                          
            }}
        >
            {children}
        </Provider>
    );
};

export { CheckoutContext, CheckoutProvider };