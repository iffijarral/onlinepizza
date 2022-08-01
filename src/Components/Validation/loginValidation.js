import * as yup from 'yup';

export const LoginSchema = yup.object().shape({    
    email: yup.string().email().required("Angiv venligst en gyldig e-mailadresse"),
    password: yup.string().min(4).max(20).required("Angiv venligst en stærk adgangskode")
});