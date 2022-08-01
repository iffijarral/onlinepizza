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
import { ForgotPasswordValidationSchema } from 'Components/Validation/ForgotPasswordValidation';

import { AuthContext } from 'Components/Contexts/AuthContext';

import { useTheme } from '@mui/material/styles';

import SnackBar from 'Util/Snackbar';

import { postRequest } from 'AxiosClient';
import { Heading, StyledLink } from 'Styles/Common.styles';
import { AuthWrapper } from './Auth.styles';

export const ForgotPassword = () => {

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

    const avatarStyle = { backgroundColor: theme.palette.primary.main, marginBottom: '.5em' };

    const btnstyle = { margin: '8px 0' }

    const initialValues = {
        email: '',
    }

    const onSubmit = async (values, props) => {

        const userData =
        {
            email: values.email,

        }        

        const response = await postRequest('forgotPassword', userData);
        
        if (response.data.status) {
            showSnakkebar('success', response.data.message);
        } else {
            showSnakkebar('warning', response.data.message);
        }       

    }
    return (

        <React.Fragment>
            <AuthWrapper>
                
                <Avatar sx={avatarStyle} ><LockOutlinedIcon /></Avatar>

                <Heading variant='h6' style={{marginBottom: '.5em'}}>Glemt adgangskode</Heading>

                <Typography variant='caption' gutterBottom>
                Angiv venligst din tilknyttede e-mailadresse.
                     Hvis det findes i vores system, modtager du en e-mail med instruktioner til at nulstile din adgangskode
                </Typography>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ForgotPasswordValidationSchema}>
                    {(props) => (
                        <Form style={{width: '100%'}}>
                            <Field as={TextField} label='E-mail' name="email"
                                placeholder='Indtast din e-mailadresse' fullWidth margin="normal"
                                helperText={<ErrorMessage name="email" />}
                            />

                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Indlæser" : "Send"}</Button>
                        </Form>
                    )}
                </Formik>


                <StyledLink to='/' style={{ justifyContent: 'left', width: '100%' }}>
                    <Stack direction='row' pt={2} spacing={1} >
                        <ArrowBackIcon />
                        <Typography variant='body2' >Home</Typography>
                    </Stack>
                </StyledLink>

                <Portal>
                    <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />
                </Portal>


            </AuthWrapper>
        </React.Fragment>






    );
}
