import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react';

import {
    Portal,
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    FormControl,
    Select, MenuItem, InputLabel,

} from '@mui/material';


import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';
import { CategoryValidationSchema } from 'Components/Dashboard/Validation/CategoryValidationSchema';

import SnackBar from 'Util/Snackbar';
import { postRequest } from 'AxiosClient';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const NewSubCategoryDialog = forwardRef((props, ref) => {

    const [selectedCategoryId, setSelectedCategoryId] = React.useState(0);
    const [categories, setCategories] = useState([]);

    const [action, setAction] = React.useState('');

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

    const image = props.categories && 'http://vitaliapizza.dk/vitalia/uploads/' + props.categories.image;

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

    useEffect(async () => {

        const formData = new FormData();

        formData.append(
            'action', 'get'
        );

        const response = await postRequest('category', formData);

        if (response.data.status) {

            const categories = Array.from(response.data.categories);
            setCategories(categories);

            setSelectedCategoryId(categories[0].id);
        }
        
    }, []);

    const initialValues = {
        id: action === 'edit' ? props.categories.id : undefined,
        category: action === 'edit' ? props.categories.categoryId : selectedCategoryId,
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
            "categoryId", values.category
        );

        formData.append(
            "subCategory", values.name
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
        const response = await postRequest('subCategory', formData);
        console.log(response);
        if (response.data.status) {
            props.resetForm();
            props.setSubmitting(false);
            showSnakkebar('success', response.data.msg);

        } else {
            showSnakkebar('error', response.data.error);
        }
    }

    const handleChange = (event) => {
        setSelectedCategoryId(event.target.value);
    };

    return (
        <div>

            <Dialog open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <DialogTitle>New SubCategory</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={CategoryValidationSchema}>
                        {(props) => (
                            <Form style={{ width: '100%' }}>
                                <InputLabel id="select-category-label">Category</InputLabel>                               
                                <Field
                                    as={Select}
                                    labelId="category"
                                    id="category"
                                    name='category'
                                    // value={selectedCategoryId}
                                    label="Select Category"
                                    defaultValue=""
                                    // onChange={handleChange}
                                    fullWidth
                                >
                                    {
                                        categories.map(category => {
                                            return (
                                                <MenuItem key={category.id} value={category.id}> <em>{category.name}</em> </MenuItem>
                                            )
                                        })
                                    }


                                </Field>
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
