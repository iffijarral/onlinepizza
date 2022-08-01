import React, { useState, useContext } from 'react';

import {
    Button,
    TextField,
    Grid,
    Paper,
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
import { Heading } from 'Styles/Common.styles';

export const ChangeAdminPassword = () => {

    // To get logged user data
    var contextUser = useContext(AuthContext);

    // const authState = contextUser.authState;

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

        // if (authState.status) {

        //     const userData = {
        //         userID: authState.id,
        //         email: authState.email,
        //         oldPassword: values.oldPassword,
        //         newPassword: values.newPassword
        //     }

        //     const response = await postRequest('newPassword', userData);
        //     console.log(response);
        //     if (response.data.status) {
        //         showSnakkebar('success', response.data.message);
        //     } else {
        //         showSnakkebar('error', response.data.message);
        //     }

        //     props.resetForm()

        //     props.setSubmitting(false)

        // } else {
        //     showSnakkebar('warning', 'Please be logged in to perform this operation');
        // }


    }

    return (
        <React.Fragment>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <Stack spacing={3}>


                        <Paper sx={{ padding: '1em .5em' }}>
                            <Typography variant="h5"> Change Password </Typography>
                        </Paper>

                        <Paper sx={{ padding: '1em .5em' }}>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ChangePasswordValidationSchema}>
                                {(props) => (
                                    <Form style={{ width: '100%' }}>
                                        <Field as={TextField} label='Current Password' name="oldPassword"
                                            placeholder='Current Password' type='password' fullWidth margin="normal"
                                            helperText={<ErrorMessage name="oldPasswords" />}
                                        />
                                        <Field as={TextField} label='New Password' name="newPassword"
                                            placeholder='New password' type='password' fullWidth margin="normal"
                                            helperText={<ErrorMessage name="newPassword" />} />

                                        <Field as={TextField} label='Confirm New Password' name="confirmPassword"
                                            placeholder='Confirm New password' type='password' fullWidth margin="normal"
                                            helperText={<ErrorMessage name="confirmPassword" />} />

                                        <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                            >{props.isSubmitting ? "Loading" : "Send"}</Button>

                                    </Form>
                                )}
                            </Formik>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
            <Portal>
                <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />
            </Portal>
        </React.Fragment>
    );
}