import React, { useState, useContext } from 'react';

import {
    Button,
    TextField,   
    Avatar,
    Typography,
    Portal,
    Checkbox,
    FormControlLabel,    
    Stack
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginSchema } from 'Components/Validation/loginValidation';

import { useNavigate } from "react-router-dom";

import { AuthContext } from 'Components/Contexts/AuthContext';

import SnackBar from 'Util/Snackbar';

import { postRequest } from 'AxiosClient';
import { Heading, StyledLink } from 'Styles/Common.styles';
import { Box } from '@mui/system';
import { AuthWrapper } from 'Components/Auth/Auth.styles';

export const LoginAdmin = () => {    

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarState(false);

    }

    const showSnakkebar = (severity, message) => {

        setSnackbarState(true);

        setSnackbarSeverity(severity);

        setSnackbarMsg(message);
    }

    const [forgotPasswordDialogState, setForgotPasswordDialogState] = React.useState(false);

    
    const avatarStyle = { backgroundColor: 'red', marginBottom: '1em' }

    const btnstyle = { margin: '8px 0' }

    // Handle Form Validation with Formik and Yup

    const initialValues = {
        email: '',
        password: '',
        remember: false
    }

    const onSubmit = async (values, props) => {

        const userData =
        {
            email: values.email,
            password: values.password,
            type: 'admin'
        }

        const response = await postRequest('login', userData);
        
        if (response.data.status) {

            delete userData['password'];


            response.data.user['status'] = true;
            authContext.setAuthState(response.data.user);

            authContext.saveCookie(response.data.user);

            navigate('/admin/orders');            
        } else {
            showSnakkebar('error', response.data.message);
        }

    }

    return (

        <React.Fragment>
            

            <AuthWrapper>

                <Avatar sx={avatarStyle} ><LockOutlinedIcon /></Avatar>

                <Typography variant='h6'>Admin Login to Vitalia Pizza</Typography>

                 <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={LoginSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} label='email' name="email"
                                placeholder='Enter email' fullWidth margin="normal"
                                helperText={<ErrorMessage name="email" />}
                            />
                            <Field as={TextField} label='Password' name="password"
                                placeholder='Enter password' type='password' fullWidth margin="normal"
                                helperText={<ErrorMessage name="password" />} />                            
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                        </Form>
                    )}
                </Formik>
                <Stack direction='row' width='100%' justifyContent='space-between'>
                    <Typography variant='body2' >
                        <StyledLink to="/forgotpassword" >
                            Forgot password ?
                        </StyledLink>
                    </Typography>                    
                </Stack>

                <StyledLink to='/' style={{ justifyContent: 'left', width: '100%' }}>
                    <Stack direction='row' pt={2} spacing={1} >
                        <ArrowBackIcon />
                        <Typography variant='body2' >Home</Typography>
                    </Stack>
                </StyledLink> 
            </AuthWrapper>

            <Portal>
                <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />
            </Portal>
        </React.Fragment>
    );
}
