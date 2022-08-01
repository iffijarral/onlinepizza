import React, { useState, useRef, useContext } from 'react';

import {
    Button,
    TextField,
    Avatar,
    Typography,
    Portal,
    FormControlLabel,
    Checkbox,
    Stack
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RegisterValidationSchema } from 'Components/Validation/RegisterValidation';

import { AuthContext } from 'Components/Contexts/AuthContext';

import SnackBar from 'Util/Snackbar';

import { postRequest } from 'AxiosClient';

import { useTheme } from '@mui/material/styles';

import * as Constants from 'Constants';
import { AuthWrapper } from './Auth.styles';
import { Heading, StyledLink } from 'Styles/Common.styles';


export const Register = () => {

    const authContext = useContext(AuthContext);

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

    const theme = useTheme();

    const navigate = useNavigate();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarState(false);

        if (snackbarSeverity === 'success') {

            navigate('/');

        }
    }

    const showSnakkebar = (severity, message) => {

        setSnackbarState(true);

        setSnackbarSeverity(severity);

        setSnackbarMsg(message);
    }

    const avatarStyle = { backgroundColor: theme.palette.primary.main }
    const headerStyle = { margin: 0 }

    // Form Validation with Formik and Yup
    const initialValues = {
        name: '',
        email: '',
        password: '',
        phone: '',
        confirmPassword: '',
        termsAndConditions: false
    }

    const onSubmit = async (values, props) => {

        // console.log(values);

        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phone,
            type: 'customer',
            status: true
        }
        console.log(userData);
        const response = await postRequest('register', userData);

        if (response.data.status) {

            delete userData['name']; // we are saving only email and id of user into cookies, therefore removing rest of the fields from userData object

            delete userData['phone'];

            delete userData['password'];

            userData["id"] = response.data.userID;

            userData["status"] = true;

            authContext.setAuthState(userData);

            authContext.saveCookie(userData);

            showSnakkebar('success', response.data.message);
        } else {
            showSnakkebar('error', response.data.message);
        }


        props.resetForm()
        props.setSubmitting(false)
        // setTimeout(() => {
        //     props.resetForm()
        //     props.setSubmitting(false)
        // }, 2000)

    }
    return (

        <React.Fragment>

            <AuthWrapper>
                <Avatar sx={avatarStyle}>
                    <PersonAddAltOutlinedIcon />
                </Avatar>

                <Heading variant='h6'>Tilmelde</Heading>
                <Typography textAlign='center' variant='caption'>Udfyld venligst den formular for at oprette en konto!</Typography>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={RegisterValidationSchema}>
                    {(props) => (
                        <Form  >
                            <Field as={TextField} label='Navn' name="name"
                                placeholder='Indtast dit fulde navn' fullWidth margin="normal"
                                helperText={<ErrorMessage name="name" />}
                            />


                            <Field as={TextField} label='E-mail' name="email"
                                placeholder='Indtast din e-mailadresse' fullWidth margin="normal"
                                helperText={<ErrorMessage name="email" />}
                            />

                            <Field as={TextField} label='Telefon' name="phone"
                                placeholder='Indtast dit telefon nummer' fullWidth margin="normal"
                                helperText={<ErrorMessage name="phone" />}
                            />

                            <Field as={TextField} label='Adgangskode' name="password" margin="normal"
                                placeholder='Indtast din adgangskode' type='password' fullWidth
                                helperText={<ErrorMessage name="password" />} />

                            <Field as={TextField} label='Bekræft adgangskode' name="confirmPassword" margin="normal"
                                placeholder='Bekræft adgangskode' type='password' fullWidth
                                helperText={<ErrorMessage name="confirmPassword" />} />
                            <FormControlLabel
                                control={<Field as={Checkbox} name="termsAndConditions" />}
                                label="Jeg accepterer betingelserne."
                            />
                            <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                fullWidth>{props.isSubmitting ? "Indlæser" : "Sign up"}</Button>

                        </Form>
                    )}
                </Formik>
                <Stack direction='row' spacing={1} pt={1} justifyContent='flex-start'>
                    <Typography variant='body2' flexGrow={1}>
                        Har du allerede en bruger ?
                    </Typography>
                    <StyledLink to='/login'>
                        <Typography variant='body2'>
                            login
                        </Typography>
                    </StyledLink>
                </Stack>
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