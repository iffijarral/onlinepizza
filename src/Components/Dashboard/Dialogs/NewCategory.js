import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react';

import {
    Portal,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack
} from '@mui/material';


import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';
import { CategoryValidationSchema } from 'Components/Dashboard/Validation/CategoryValidationSchema';

import SnackBar from 'Util/Snackbar';
import { postRequest } from 'AxiosClient';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const NewCategoryDialog = forwardRef((props, ref) => {

    

    const [action, setAction] = React.useState('');

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

    const image = props.categories && 'http://vitaliapizza.dk/vitalia/uploads/' + props.categories.image;

    const categories = props.categories && props.categories;

    useImperativeHandle(ref, () => ({

        handleAction(action) {
            setAction(action);
        }

    }));
    
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarState(false);

        if (snackbarSeverity === 'success') {

            props.handleClose();

        }        
    }

    const showSnakkebar = (severity, message) => {

        setSnackbarState(true);

        setSnackbarSeverity(severity);

        setSnackbarMsg(message);
        
    }

    const initialValues = {
        id: action === 'edit' ? props.categories.id : undefined,
        name: action === 'edit' ? props.categories.name : '',
        image: action === 'edit' ? props.categories.image : '',
        file: ''
    }


    const onSubmit = async (values, props) => {

        const formData = new FormData();

        if (values.file) {
            formData.append(
                "file", values.file
            );
        }

        formData.append(
            "category", values.name
        );
        if (action === 'edit') {
            formData.append(
                "id", values.id
            );
        }
        formData.append(
            "action", action
        );
        // for (var p of formData) {
        //     let name = p[0];
        //     let value = p[1];
        
        //     console.log(name, value)
        // }
       const response = await postRequest('category', formData);
        
        if (response.data.status) {
            props.resetForm();
            props.setSubmitting(false);
            showSnakkebar('success', response.data.msg);

        } else {
            showSnakkebar('error', response.data.error);
        }




    }


    return (
        <div>

            <Dialog open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <DialogTitle>New Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={CategoryValidationSchema}>
                        {(props) => (
                            <Form style={{ width: '100%' }}>

                                <Field as={TextField} label='category name' name="name"
                                    placeholder='Enter category name' fullWidth margin="normal"
                                    helperText={<ErrorMessage name="name" />}
                                />

                                <FormControl>

                                    <input id="file" name="file" type="file" onChange={(event) => {
                                        props.setFieldValue("file", event.currentTarget.files[0]);
                                    }} className="form-control" />

                                    <FormHelperText><ErrorMessage name="file" /></FormHelperText>
                                </FormControl>

                                <input type='text' name='id' hidden />
                                <img src={image} width={50} style={{ display: image ? 'block' : 'none', margin: '0 auto' }} />
                                <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                    fullWidth>{props.isSubmitting ? "Loading" : "Send"}</Button>

                            </Form>
                        )}
                    </Formik>

                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.handleClose}>Subscribe</Button>
                </DialogActions> */}
            </Dialog>
            <Portal>
                <SnackBar open={snackbarState} severity={snackbarSeverity} msg={snackbarMsg} handleClose={handleSnackbarClose} />
            </Portal>
        </div>
    );
})
