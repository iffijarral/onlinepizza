import * as yup from 'yup';

export const ChangePasswordValidationSchema = yup.object().shape({    
    
    oldPassword: yup.string().min(8).max(20).required("Den skal udfyldes"),
    newPassword: yup.string().min(8).max(20).required("Den skal udfyldes"),
    confirmPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Adgangskoder stemmer ikke overens").required("Den skal udfyldes")
    
});
