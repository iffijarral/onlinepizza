import React from "react";
import { Grid, Paper, Typography, IconButton, InputAdornment, TextField, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { CustomersTable } from "./SubComponents/CustomersTable";

export const Customers = () => {
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Paper sx={{ padding: '1em .5em' }}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography variant="h5"> Kunder</Typography>
                                {/* <TextField
                                    label="Find en kund"
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
                        <CustomersTable />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}