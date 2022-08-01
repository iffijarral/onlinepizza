import React, { useEffect, useState, useRef } from 'react';
import { Grid, Paper, Typography, IconButton, InputAdornment, TextField, Stack, Select, MenuItem, InputLabel, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { CustomersTable } from "./SubComponents/CustomersTable";

import { postRequest } from 'AxiosClient';
import { SubCategoriesTable } from './SubComponents/SubCategoriesTable';
import { NewSubCategoryDialog } from './Dialogs/NewSubCategoryDialog'; 

export const SubCategories = () => {
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(0);
    const [categories, setCategories] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => { //opens dialog
        childRef.current.handleAction('save');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        
        setSelectedCategoryId(event.target.value);


    }; 

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

    const childRef = useRef();    

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Paper sx={{ padding: '1em .5em' }}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography variant="h5"> Sub Categories </Typography>
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
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <div>
                                <InputLabel id="select-category-label">Category</InputLabel>
                                <Select
                                    labelId="select-category-label"
                                    id="select-category"
                                    value={selectedCategoryId || ''}
                                    label="Select Category"
                                    defaultValue=""
                                    onChange={handleChange}
                                    sx={{ width: '15em' }}
                                >
                                    {
                                        categories.map(category => {
                                            return (
                                                <MenuItem key={category.id} value={category.id}> <em>{category.name}</em> </MenuItem>
                                            )
                                        })
                                    }


                                </Select>
                            </div>
                            <div>
                                <Button color='primary' variant="contained" onClick={handleClickOpen} >
                                    New SubCategory
                                </Button>
                            </div>
                        </Stack>


                    </Grid>
                    <Grid item xs={12}>
                        <SubCategoriesTable categoryId={selectedCategoryId} dialogState={open} />                        
                    </Grid>
                </Grid>
            </Grid>
            <NewSubCategoryDialog ref={childRef} open={open} handleClose={handleClose} />
        </React.Fragment>
    );
}