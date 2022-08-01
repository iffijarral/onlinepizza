import React, { useRef } from "react";
import { Grid, Paper, Typography, IconButton, InputAdornment, TextField, Stack, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { CustomersTable } from "./SubComponents/CustomersTable";
import { NewCategoryDialog } from "./Dialogs/NewCategory";
import { CategoriesTable } from "./SubComponents/CategoriesTable";

export const Categories = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        childRef.current.handleAction('save');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const childRef = useRef();

    return (
        <React.Fragment>

            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <Paper sx={{ padding: '1em .5em' }}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Typography variant="h5"> Categories </Typography>
                            <TextField
                                label="Find en category"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton>
                                                <SearchIcon>search</SearchIcon>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <div style={{ textAlign: 'right' }}>
                        <Button color='primary' variant="contained" onClick={handleClickOpen} >
                            New Category
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <CategoriesTable dialogState={open} />
                </Grid>
            </Grid>
            <NewCategoryDialog ref={childRef} open={open} handleClose={handleClose} />
        </React.Fragment>
    );
}