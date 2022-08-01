import React, { useState, useContext } from 'react';

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
import { ChangePasswordValidationSchema } from 'Components/Validation/ChangePasswordValidationSchema';

import { AuthContext } from 'Components/Contexts/AuthContext';

import SnackBar from 'Util/Snackbar';

import { postRequest } from 'AxiosClient';

import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { AuthWrapper } from './Auth.styles';
import { Heading, StyledLink } from 'Styles/Common.styles';

export const ChangePassword = () => {

    // To get logged user data
    const authContext = useContext(AuthContext);    

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

    const theme = useTheme();

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
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    const onSubmit = async (values, props) => {

        if (authContext.authState.status) {

            const userData = {
                userID: authContext.authState.id,
                email: authContext.authState.email,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            }

            const response = await postRequest('newPassword', userData);
            console.log(response);
            if (response.data.status) {
                showSnakkebar('success', response.data.message);
            } else {
                showSnakkebar('error', response.data.message);
            }

            props.resetForm()

            props.setSubmitting(false)

        } else {
            showSnakkebar('warning', 'Please be logged in to perform this operation');
        }


    }

    return (
        <React.Fragment>

            <AuthWrapper>

                <Avatar sx={avatarStyle} ><LockOutlinedIcon /></Avatar>

                <Heading variant='h6' style={{ marginBottom: '.5em' }}>Ændre adgangskode</Heading>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ChangePasswordValidationSchema}>
                    {(props) => (
                        <Form style={{width: '100%'}}>
                            <Field as={TextField} label='Nuværende adgangskode' name="oldPassword"
                                placeholder='Nuværende adgangskode' type='password' fullWidth margin="normal"
                                helperText={<ErrorMessage name="oldPassword" />}
                            />
                            <Field as={TextField} label='Ny adgangskode' name="newPassword"
                                placeholder='Nyt kodeord' type='password' fullWidth margin="normal"
                                helperText={<ErrorMessage name="newPassword" />} />

                            <Field as={TextField} label='Bekræft ny adgangskode' name="confirmPassword"
                                placeholder='Bekræft ny adgangskode' type='password' fullWidth margin="normal"
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