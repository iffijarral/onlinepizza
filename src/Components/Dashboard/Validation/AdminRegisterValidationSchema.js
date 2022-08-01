import { yupToFormErrors } from 'formik';
import * as yup from 'yup';

export const AdminRegisterValidationSchema = yup.object().shape({    
    name: yup.string().min(3, "It's too short").required("Required"),
    email: yup.string().email().required("Please give a valid email address"),    
    phone: yup.number(),
    password: yup.string().min(8).max(20).required("Please give a strong password"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "passwords don't match").required("Required"),
    
});