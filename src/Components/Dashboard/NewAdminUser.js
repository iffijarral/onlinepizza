import React, { useState, useRef, useContext } from "react";
import SnackBar from 'Util/Snackbar';
import { postRequest } from 'AxiosClient';

import { useTheme } from '@mui/material/styles';

import {
    Button,
    TextField,
    Avatar,
    Typography,
    Portal,
    FormControlLabel,
    Paper,
    Grid
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AdminRegisterValidationSchema } from "Components/Dashboard/Validation/AdminRegisterValidationSchema";

export const NewAdminUser = () => {

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

    const theme = useTheme();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarState(false);

        if (snackbarSeverity === 'success') {

            // closeRegisterDialog();

        }
    }

    const showSnakkebar = (severity, message) => {

        setSnackbarState(true);

        setSnackbarSeverity(severity);

        setSnackbarMsg(message);
    }

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''

    }

    const onSubmit = async (values, props) => {

        console.log('form submit');

        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phone,
            type: 'admin',            
            status: true

        }
        
        const response = await postRequest('register', userData);        
        console.log(response);
        if (response.data.status) {
            showSnakkebar('success', response.data.message);
        } else {
            showSnakkebar('error', response.data.message);
        }

        props.resetForm();

        props.setSubmitting(false);
    }
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Paper sx={{ padding: '1em .5em' }}>
                            <Typography variant="h5"> Ny Bruger </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ padding: '1em .5em' }}>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={AdminRegisterValidationSchema}>
                                {(props) => (
                                    <Form style={{ width: '100%' }}>
                                        <Field as={TextField} label='Name' name="name"
                                            placeholder='Enter your full name' fullWidth style={{ marginTop: '-1px' }}
                                            helperText={<ErrorMessage name="name" />}
                                        />


                                        <Field as={TextField} label='Email' name="email"
                                            placeholder='Enter your email address' fullWidth style={{ marginTop: '8px' }}
                                            helperText={<ErrorMessage name="email" />}
                                        />

                                        <Field as={TextField} label='Phone' name="phone"
                                            placeholder='Enter your phone number' fullWidth style={{ marginTop: '8px' }}                                            

                                        />

                                        <Field as={TextField} label='Password' name="password" style={{ marginTop: '8px' }}
                                            placeholder='Enter password' type='password' fullWidth
                                            helperText={<ErrorMessage name="password" />} />

                                        <Field as={TextField} label='Confirm Password' name="confirmPassword" style={{ marginTop: '8px' }}
                                            placeholder='Confirm password' type='password' fullWidth
                                            helperText={<ErrorMessage name="confirmPassword" />} />

                                        <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting} style={{ marginTop: '8px' }}
                                        >{props.isSubmitting ? "Loading" : "Sign up"}</Button>

                                    </Form>
                                )}
                            </Formik>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />
        </React.Fragment>
    );
}
