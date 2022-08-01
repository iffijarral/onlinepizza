import * as yup from 'yup';

export const PaymentValidationSchema = yup.object().shape({        
    termsAndConditions: yup.string().oneOf(["true"], "Accept terms & conditions")
});

