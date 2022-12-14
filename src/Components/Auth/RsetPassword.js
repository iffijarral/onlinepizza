import React, { useState, useContext } from 'react';
import { useParams } from "react-router-dom";

import {
    Button,
    TextField,   
    Avatar,
    Typography,
    Portal,    
    Stack
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ResetPasswordValidationSchema } from 'Components/Validation/ResetPasswordValidationSchema';

import { AuthContext } from 'Components/Contexts/AuthContext';

import SnackBar from 'Util/Snackbar';

import { postRequest } from 'AxiosClient';

import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { AuthWrapper } from './Auth.styles';
import { Heading, StyledLink } from 'Styles/Common.styles';

export const ResetPassword = () => {

    // To get logged user data
    const authContext = useContext(AuthContext);    

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

    const theme = useTheme();

    const { token } = useParams(); // Retrieve token sent by server

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


    const avatarStyle = { backgroundColor: theme.palette.primary.main, marginBottom: '1em' }

    const btnstyle = { margin: '8px 0' }

    const initialValues = {        
        newPassword: '',
        confirmPassword: ''
    }

    const onSubmit = async (values, props) => {
        
            const userData = {
                token   : token,
                password: values.newPassword
            }

            const response = await postRequest('changePassword', userData);
            
            if (response.data.status) {
                showSnakkebar('success', response.data.message);
            } else {
                showSnakkebar('error', response.data.message);
            }

            props.resetForm()

            props.setSubmitting(false)

        


    }

    return (
        <React.Fragment>

            <AuthWrapper>

                <Avatar sx={avatarStyle} ><LockOutlinedIcon /></Avatar>

                <Heading variant='h6' style={{ marginBottom: '.5em' }}>Ny adgangskode</Heading>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ResetPasswordValidationSchema}>
                    {(props) => (
                        <Form style={{width: '100%'}}>
                            
                            <Field as={TextField} label='Ny adgangskode' name="newPassword"
                                placeholder='Nyt kodeord' type='password' fullWidth margin="normal"
                                helperText={<ErrorMessage name="newPassword" />} />

                            <Field as={TextField} label='Bekr??ft ny adgangskode' name="confirmPassword"
                                placeholder='Bekr??ft ny adgangskode' type='password' fullWidth margin="normal"
                                helperText={<ErrorMessage name="confirmPassword" />} />

                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Send"}</Button>

                        </Form>
                    )}
                </Formik>
                
                <StyledLink to='/' style={{ justifyContent: 'left', width: '100%' }}>
                    <Stack direction='row' pt={2} spacing={1} >
                        <ArrowBackIcon />
                        <Typography variant='body2' >Hjem</Typography>
                    </Stack>
                </StyledLink>
                <Portal>
                    <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />
                </Portal>
            </AuthWrapper>
        </React.Fragment>
    );
}