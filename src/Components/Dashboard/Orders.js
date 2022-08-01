import React, { useEffect } from 'react';
import { Grid, Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { OrdersTable } from "./SubComponents/OrdersTable";
import { OrderSelections } from "./SubComponents/OrderSelection";

export const Orders = () => {

    const [todaySale, setTodaySale] = React.useState(0);
    const [currentIndex, setCurrentIndex] = React.useState('current');

    const handleChange = (event, newAlignment) => {
        setCurrentIndex(newAlignment);              
    };
    
    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {/* <Grid item xs={12}> 
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Paper sx={{ padding: '1em .5em' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <Typography variant="body2" component='span'>
                                                Total Customers
                                            </Typography>
                                            <Typography variant="h4">
                                                100
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} display='flex' justifyContent='flex-end'>
                                        <Avatar><PersonIcon /></Avatar>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Paper sx={{ padding: '1em .5em' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <Typography variant="body2" component='span'>
                                                Total Customers
                                            </Typography>
                                            <Typography variant="h4">
                                                100
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} display='flex' justifyContent='flex-end'>
                                        <Avatar><PersonIcon /></Avatar>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Paper sx={{ padding: '1em .5em' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <Typography variant="body2" component='span'>
                                                Total Customers
                                            </Typography>
                                            <Typography variant="h4">
                                                100
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} display='flex' justifyContent='flex-end'>
                                        <Avatar><PersonIcon /></Avatar>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Paper sx={{ padding: '1em .5em' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <Typography variant="body2" component='span'>
                                                Total Customers
                                            </Typography>
                                            <Typography variant="h4">
                                                100
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} display='flex' justifyContent='flex-end'>
                                        <Avatar><PersonIcon /></Avatar>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                */}
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <OrderSelections currentIndex={currentIndex} handleChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <OrdersTable orderSelection={currentIndex} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>



        </React.Fragment>
    );
}