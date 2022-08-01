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
    Select, MenuItem, InputLabel, Stack, TextareaAutosize,

} from '@mui/material';


import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';
import { ProductValidationSchema } from 'Components/Dashboard/Validation/ProductValidationSchema';

import SnackBar from 'Util/Snackbar';
import { postRequest } from 'AxiosClient';
import { grey } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const NewProductDialog = forwardRef((props, ref) => {

    const [selectedCategory, setSelectedCategory] = React.useState(0);
    const [categories, setCategories] = useState([]);

    const [selectedSubCategory, setSelectedSubCategory] = React.useState(0);
    const [subCategories, setSubCategories] = useState([]);

    const [action, setAction] = React.useState('');

    const [snackbarState, setSnackbarState] = useState(false);

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("");

    const image = props.product && 'http://vitaliapizza.dk/vitalia/uploads/' + props.product.image;

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



    useEffect(() => {        
        loadCategories(); // loadSubCategories() is called from inside loadCategories


    }, [props.open]);

    const loadCategories = async () => {


        const formData = new FormData();

        formData.append(
            'action', 'get'
        );
        const response = await postRequest('category', formData);

        if (response.data.status) {

            const categories = Array.from(response.data.categories);

            setCategories(categories);
            if(selectedCategory === 0 ) {
                setSelectedCategory(categories[0].id);

                loadSubCategories(categories[0].id);
            } else {
                loadSubCategories(selectedCategory);
            }
               
        }
    }

    const loadSubCategories = async (catID) => {
        const formData = new FormData();
        
        formData.append(
            'action', 'get'
        );


        formData.append('catID', catID);

        const response = await postRequest('subCategory', formData);

        if (response.data.status) {

            const subCategories = Array.from(response.data.subCategories);

            setSubCategories(subCategories);
            setSelectedSubCategory(subCategories[0].id);

        } else {

            setSubCategories([]);
            setSelectedSubCategory('');

        }
    }


    const initialValues = {
        id: action === 'edit' ? props.product.id : undefined,
        category: action === 'edit' ? props.product.catID : selectedCategory,
        subCategory: action === 'edit' ? subCategories.length > 0 ? props.product.subCatID : selectedSubCategory : selectedSubCategory,
        name: action === 'edit' ? props.product.name : '',
        description: action === 'edit' ? props.product.description : '',
        image: action === 'edit' ? props.product.image : '',
        price: action === 'edit' ? props.product.price : '',
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
            "cat_id", selectedCategory
        );

        if (subCategories.length > 0) {
            formData.append(
                "sub_cat_id", values.subCategory
            );
        } 
        // else {
        //     formData.append(
        //         "sub_cat_id", ''
        //     );
        // }

        formData.append(
            "name", values.name
        );
        formData.append(
            "description", values.description
        );
        formData.append(
            "price", values.price
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
        const response = await postRequest('product', formData);
        
        if (response.data.status) {
            props.resetForm();
            props.setSubmitting(false);
            showSnakkebar('success', response.data.msg);

        } else {
            showSnakkebar('error', response.data.error);
        }
    }

    const handleCategoryChange = (event) => {

        setSelectedCategory(event.target.value);
        
        loadSubCategories(event.target.value);
    };
   
    return (
        <div>

            <Dialog open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>{action === 'edit' ? 'Edit Product' : 'New Product'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ProductValidationSchema}>
                        {(props) => (
                            <Form style={{ width: '100%' }}>
                                <Stack direction='row' justifyContent={subCategories.length > 0 ? 'space-between' : 'flex-start'} alignItems='center'>
                                    <InputLabel id="select-category-label" style={{marginRight: '.5em'}}>Category</InputLabel>
                                    <Field
                                        as={Select}
                                        labelId="category"
                                        id="category"
                                        name='category'
                                        value={selectedCategory}
                                        label="Select Category"
                                        defaultValue=""
                                        onChange={handleCategoryChange}
                                        sx={{ width: '10em' }}
                                    >
                                        {
                                            categories.map(category => {
                                                return (
                                                    <MenuItem key={category.id} value={category.id}> <em>{category.name}</em> </MenuItem>
                                                )
                                            })
                                        }


                                    </Field>
                                    {
                                        subCategories.length > 0 ?
                                            <React.Fragment>
                                                <InputLabel id="select-SubCategory-label">Sub-Category</InputLabel>
                                                <Field
                                                    as={Select}
                                                    labelId="subCategory"
                                                    id="subCategory"
                                                    name='subCategory'
                                                    // value={selectedCategoryId}
                                                    label="Select Sub Category"
                                                    defaultValue=""
                                                    // onChange={handleChange}
                                                    sx={{ width: '10em' }}
                                                >
                                                    {
                                                        subCategories.map(subCategory => {
                                                            return (
                                                                <MenuItem key={subCategory.id} value={subCategory.id}> <em>{subCategory.name}</em> </MenuItem>
                                                            )
                                                        })
                                                    }

                                                </Field>
                                            </React.Fragment>
                                            :
                                            ''
                                    }
                                </Stack>
                                <Field as={TextField} label='Product name' name="name"
                                    placeholder='Enter product name' fullWidth margin="normal"
                                    helperText={<ErrorMessage name="name" />}
                                />

                                <Field
                                    as={TextareaAutosize}
                                    label='Description'
                                    name="description"
                                    placeholder='Enter description'

                                    style={{ width: '100%', padding: '1em', height: 120, borderColor: 'lightGrey' }}

                                />
                                <Field as={TextField} label='Price' name="price"
                                    placeholder='Enter price' fullWidth margin="normal"
                                    helperText={<ErrorMessage name="price" />}
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
