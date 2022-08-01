import React, { useEffect, useState, useRef } from 'react';
import { Grid, Paper, Typography, IconButton, InputAdornment, Button, Stack, Select, MenuItem, InputLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { CustomersTable } from "./SubComponents/CustomersTable";

import { postRequest } from 'AxiosClient';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NewProductDialog } from './Dialogs/NewProductDialog';
import { ProductsTable } from './SubComponents/ProductsTable';

export const Products = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    const [open, setOpen] = React.useState(false);
    
    const formData = new FormData();

    formData.append(
        'action', 'get'
    );

    const handleCategoryChange = (event) => {

        setSelectedCategory(event.target.value);

        loadSubCategories(event.target.value);
    };
    const handleSubCategoryChange = (event) => {
        setSelectedSubCategory(event.target.value);
    };

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        const response = await postRequest('category', formData);
        
        if (response.data.status) {

            const categories = Array.from(response.data.categories);

            setCategories(categories);
            setSelectedCategory(categories[0].id);

            loadSubCategories(categories[0].id);
        }
    }

    const loadSubCategories = async (catID) => {

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
    
    const handleClickOpen = () => { //opens dialog
        childRef.current.handleAction('save');
        setOpen(true);
    };

    const childRef = useRef(); 

   

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Paper sx={{ padding: '1em .5em' }}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography variant="h5"> Produkter </Typography>
                                {/* <TextField
                                    label="Find en category"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton>
                                                    <SearchIcon>search</SearchIcon>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                /> */}
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction='row' spacing={3} alignItems='center' justifyContent='space-between'>

                            <div>
                            <InputLabel id="select-category-label">Category</InputLabel>
                            <Select

                                labelId="select-category-label"
                                id="category"
                                name="category"
                                label="category"
                                sx={{ width: '15em' }}
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                {
                                    categories.map((category, index) => {
                                        return (
                                            <MenuItem key={category.id} value={category.id}> <em>{category.name}</em> </MenuItem>
                                        )
                                    })
                                }

                            </Select>
                            </div>
                            {subCategories.length > 0 ?
                                <React.Fragment>
                                    <InputLabel id="select-subcategory-label">Subcategory</InputLabel>
                                    <Select

                                        labelId="select-category-label"
                                        id="subCategory"
                                        name="subCategory"
                                        label="Sub-category"
                                        sx={{ width: '15em' }}
                                        value={selectedSubCategory}
                                        onChange={handleSubCategoryChange}
                                    >
                                        {
                                            subCategories.map((category, index) => {
                                                return (
                                                    <MenuItem key={category.id} value={category.id}> <em>{category.name}</em> </MenuItem>
                                                )
                                            })
                                        }

                                    </Select>
                                </React.Fragment>
                                :
                                ''
                            }
                            <div>
                                <Button color='primary' variant="contained" onClick={handleClickOpen} >
                                    New Product
                                </Button>
                            </div>
                        </Stack>

                    </Grid>
                    <Grid item xs={12}>                        
                        <ProductsTable catId={selectedCategory} subCatId={selectedSubCategory} dialogState={open} />
                    </Grid>
                </Grid>
            </Grid>
            <NewProductDialog ref={childRef} open={open} handleClose={handleClose} />
        </React.Fragment>
    );
}
 