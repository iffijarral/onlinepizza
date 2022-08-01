import * as yup from 'yup';

export const RegisterValidationSchema = yup.object().shape({    
    name: yup.string().min(3, "Den er for kort").required("Den skal udfyldes"),
    email: yup.string().email().required("Den skal udfyldes"),
    phone: yup.number().required("Den skal udfyldes"),    
    password: yup.string().min(8).max(20).required("Angiv venligst en stærk adgangskode"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Adgangskoder stemmer ikke overens").required("Den skal udfyldes"),
    termsAndConditions: yup.string().oneOf(["true"], "Accepter vilkår og betingelser")
});