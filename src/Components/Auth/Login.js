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

import { useNavigate } from 'react-router-dom';

import { AuthContext } from 'Components/Contexts/AuthContext';

import SnackBar from 'Util/Snackbar';

import { postRequest } from 'AxiosClient';
import { Heading, StyledLink } from 'Styles/Common.styles';
import { Box } from '@mui/system';
import { AuthWrapper } from './Auth.styles';

export const Login = ({ loginDialogState, closeLoginDialog }) => {

    const authContext = useContext(AuthContext);

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

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

    const openForgotPasswordDialog = () => {
        closeLoginDialog();
        setForgotPasswordDialogState(true);
    };

    const closeForgotPasswordDialog = () => {

        setForgotPasswordDialogState(false);
    };

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
            type: 'customer'
        }

        const response = await postRequest('login', userData);
        
        if (response.data.status) {

            delete userData['password'];
 
 
            response.data.user['status'] = true;
            authContext.setAuthState(response.data.user);

            authContext.saveCookie(response.data.user);

            navigate('/');
            
        } else {
            showSnakkebar('error', response.data.message);
        }

        // props.resetForm()
        // props.setSubmitting(false)
        // setTimeout(() => {
        //     props.resetForm()
        //     props.setSubmitting(false)
        // }, 2000)

    }

    return (

        <React.Fragment>


            <AuthWrapper>

                <Avatar sx={avatarStyle} ><LockOutlinedIcon /></Avatar>

                <Heading variant='h6'>Log ind på Vitalia Pizza</Heading>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={LoginSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} label='E-mail' name="email"
                                placeholder='Indtast din e-mailadresse' fullWidth margin="normal"
                                helperText={<ErrorMessage name="email" />}
                            />
                            <Field as={TextField} label='Adgangskode' name="password"
                                placeholder='Indtast din adgangskode' type='password' fullWidth margin="normal"
                                helperText={<ErrorMessage name="password" />} />
                            <Field as={FormControlLabel}
                                name='remember'
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Indlæser" : "Sign in"}</Button>

                        </Form>
                    )}
                </Formik>
                <Stack direction={{md: 'row', xs: 'column'}} width='100%' spacing={1} alignItems='center' justifyContent= 'space-between'>
                    <Typography variant='body2' >
                        <StyledLink to="/forgotpassword" >
                            Glemt adgangskode ?
                        </StyledLink>
                    </Typography>
                    <Typography variant='body2'> Har du en konto?
                        <StyledLink to="/register" style={{ paddingLeft: '1em' }} >
                            Tilmelde
                        </StyledLink>
                    </Typography>
                </Stack>

                <StyledLink to='/' style={{ justifyContent: 'left', width: '100%' }}>
                    <Stack direction='row' pt={2} spacing={1} >
                        <ArrowBackIcon />
                        <Typography variant='body2' >Hjem</Typography>
                    </Stack>
                </StyledLink>




            </AuthWrapper>

            <Portal>
                <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />
            </Portal>
        </React.Fragment>
    );
}
