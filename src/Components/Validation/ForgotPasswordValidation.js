import * as yup from 'yup';

export const ForgotPasswordValidationSchema = yup.object().shape({    
    
    email: yup.string().email().required("Angiv venligst en gyldig e-mailadresse"),
    
});
