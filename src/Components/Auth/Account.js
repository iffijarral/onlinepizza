import React, { useState, useContext, useRef, useEffect } from 'react';

import {
    Button,
    TextField,
    Box,
    Typography,
    Portal,
    Link,
    Stack,
    Backdrop
} from '@material-ui/core';

import ChangePassword from 'Components/Auth/ChangePassword';

import { AuthContext } from 'Components/Contexts/AuthContext';
import { postRequest } from 'AxiosClient';

import SnackBar from 'util/Snackbar';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AccountValidationSchema } from 'Components/Validation/AccountValidationSchema';
import { BeautyboxSection, BeautyboxContainer } from 'Components/BeautyBox/Beautybox.styles';
import { Container, Section } from 'Styles/App.styles';
import { useNavigate } from 'react-router-dom';

import Product1 from 'Images/products/p1.jpg';
import Product2 from 'Images/products/p3.jpg';
import Product4 from 'Images/products/p4.jpg';
import Product3 from 'Images/products/lip-gloss.jpg';
import { Banner2 } from 'Components/Banner/Banner2';

const Account = () => {

    const authContext = useContext(AuthContext);

    const [userData, setUserData] = React.useState({});

    const navigate = useNavigate();

    const [changePasswordDialogState, setChangePasswordDialogState] = React.useState(false);

    const openChangePasswordDialog = () => {

        setChangePasswordDialogState(true);
    };

    const closeChangePasswordDialog = () => {

        setChangePasswordDialogState(false);
    };


    //Following code snippet is to handle Snackbar
    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

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

    const avatarStyle = { backgroundColor: 'secondary.main' }
    const headerStyle = { margin: 0 }
    const postcodeCountryWrapper = { display: 'flex', justifyContent: 'space-between', width: '100%' };
    const buttonStyle = { marginTop: 10 }

    // const isMounted = useIsMounted();

    useEffect(async () => {



        if (authContext.authState.id != null) {

            const postData = {
                action: 'get',
                userID: authContext.authState.id
            }

            const response = await postRequest('userData', postData);
            console.log(response);
            if (response.data.status) {
                setUserData(response.data.userInfo);

            }

        } else {
            console.log('id not defined');
            navigate('/');
        }



    }, []);

    // Form Validation with Formik and Yup

    const onSubmit = async (values, props) => {
        const formData = {
            id: authContext.authState.id,
            name: values.name,
            phone: values.phone,
            address: values.address,
            postcode: values.postcode,
            city: values.city,
            action: 'update'
        }

        const response = await postRequest('userData', formData);
        console.log(response);
        if (response.data.status) {

            showSnakkebar('success', response.data.message);

            setUserData(formData);

        } else {
            showSnakkebar('error', response.data.message);
        }


        props.resetForm()
        props.setSubmitting(false)


    }

    return (
        <>
            {/* <BeautyboxSection>
                <BeautyboxContainer>
                    <Typography variant='h1' component='div'>Current Month Box</Typography>
                </BeautyboxContainer>
            </BeautyboxSection> */}
            <Box sx={{ width: '100%', pb:'2em' }}>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Box sx={{ width: '65%' }}>
                        <Banner2 />
                    </Box>

                </Box>
                <Stack direction='row' mt={4}>
                    <Box sx={{ flex: 1, }}>

                        <Stack paddingLeft={2} sx={{ opacity: '.5' }} height='100%' justifyContent='space-between' >
                            <img src={Product1}
                                style={{ width: '10em', transform: 'rotate3d(1, 1, 1, 26deg)' }}

                            />
                            <img src={Product2}
                                style={{ paddingLeft: '2em', width: '7em', transform: 'rotate3d(1, 1, 1, -26deg)' }}

                            />
                        </Stack>

                    </Box>


                    <Box sx={{ flex: 2, width: { lg: '50%', md: '75%', xs: '100%' }, textAlign: 'center' }}>
                        <Typography variant='h5'>Account Details</Typography>
                        <Typography variant='p' component='div' lineHeight='2'>
                            Here you can edit your given information
                        </Typography>


                        {/* <Grid align='center'>
                            <Avatar sx={avatarStyle}>
                                <AccountCircleIcon />
                            </Avatar>
                            <h2 style={headerStyle}>Account</h2>

                            <Typography variant='caption' gutterBottom>Following is you account detail</Typography>
                        </Grid> */}

                        <Formik initialValues={userData} enableReinitialize={true} onSubmit={onSubmit} validationSchema={AccountValidationSchema}>
                            {(props) => (
                                <Form >
                                    <Stack spacing={2}>
                                        <Field as={TextField} label='Name' name="name"
                                            placeholder='Enter your full name' fullWidth
                                            helperText={<ErrorMessage name="name" />}
                                            value={props.values.name != null ? props.values.name : ''}

                                        />


                                        <Field as={TextField} label='Phone' name="phone"
                                            placeholder='Enter your phone number' fullWidth
                                            value={props.values.phone != null ? props.values.phone : ''}

                                            helperText={<ErrorMessage name="phone" />}
                                        />

                                        <Field as={TextField} label='Address' name="address"
                                            placeholder='House no, street, mohallah or sector number' fullWidth
                                            value={props.values.address != null ? props.values.address : ''}

                                        />
                                        <Stack direction='row' spacing={2}>
                                            <Field as={TextField} label='Post Code' name="postcode"
                                                placeholder='Enter your post ode'
                                                value={props.values.postcode != null ? props.values.postcode : ''}

                                            />
                                            <Field as={TextField} label='City' name="city"
                                                placeholder='Entery your city name'
                                                value={props.values.city != null ? props.values.city : ''}

                                            />
                                        </Stack>

                                        <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                            fullWidth>{props.isSubmitting ? "Loading" : "Send"}</Button>
                                        <Link href="#" onClick={openChangePasswordDialog} style={{ textAlign: 'left' }} >
                                            Change Password
                                        </Link>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>


                        <ChangePassword changePasswordDialogState={changePasswordDialogState} closeChangePasswordDialog={closeChangePasswordDialog} />
                        <Portal>
                            <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />
                        </Portal>
                    </Box>

                    <Box sx={{ flex: 1, maxHeight: '100%' }}>
                        <Stack paddingRight={2} alignItems='flex-end' sx={{ opacity: '.5' }} height='100%' justifyContent='space-between' >
                            <img src={Product3}
                                style={{ marginRight: '2em', width: '10em', transform: 'rotate3d(1, 1, 1, -26deg)' }}

                            />
                            <img src={Product4}
                                style={{ marginRight: '3em', width: '5em', transform: 'rotate3d(1, 1, 1, 40deg)' }}

                            />
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </>
    );
}

export default Account;