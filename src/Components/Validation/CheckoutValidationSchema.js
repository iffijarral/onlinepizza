import * as yup from 'yup';

export const CheckoutValidationSchema = yup.object().shape({    
    name: yup.string().min(3, "Den er for kort").required("Den skal udfyldes"),
    email: yup.string().email().required("Den skal udfyldes med en gyldig e-mailadresse"),    
    phone: yup.number().min(8, "Den er for kort").required('Den skal udfyldes med et gyldigt telefonnummer'),    
});