import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { FooterWrapper, StyledPlant, StyledUl } from "./Footer.styles";

import Logo from 'Images/logo.png';

import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArticleIcon from '@mui/icons-material/Article';
import PolicyIcon from '@mui/icons-material/Policy';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { StyledLink, StyledLink2 } from "Styles/Common.styles";
import Cards from 'Images/cards.jpeg';
import { Data } from "Data/Data";


export const Footer = () => {

    const schedule = Data.timeTable;
    const currentHour = new Date().toLocaleTimeString('da-DK', { hour: '2-digit' });
    const day = new Date().toLocaleString('da-DK', { weekday: 'long' });
    
    const timeTable = Object.keys(schedule).map(function (keyName, keyIndex) {
        // use keyName to get current key's name
        // and a[keyName] to get its value
        return (
            <Typography key={keyName} variant="body2" color={day === keyName ? 'primary' : 'GrayText'} >
                {keyName}: {schedule[keyName].open} - {schedule[keyName].close}
            </Typography>
        )
    });



    return (
        <React.Fragment>
            <FooterWrapper maxWidth='lg' style={{ position: 'relative' }} >
                <Grid container pt={8} spacing={2} direction={{ xs: 'column', md: 'row' }} justifyContent='space-between'>
                    <Grid item>
                        <Stack spacing={4} alignItems='center'>
                            <img src={Logo} alt='logo' width={100} />
                            <StyledUl>
                                <li>
                                    <Stack spacing={1} direction='row' alignItems='center'>
                                        <HomeIcon style={{ fontSize: '1em' }} />
                                        <Typography variant="body2">
                                            Ordrupvej 52, 2920 Charlottenlund.
                                        </Typography>
                                    </Stack>
                                </li>
                                <li>
                                    <Stack spacing={1} direction='row' alignItems='center'>
                                        <PhoneIcon style={{ fontSize: '1em' }} />
                                        <Typography variant="body2">
                                            39 64 23 49, 27 14 70 53
                                        </Typography>
                                    </Stack>
                                </li>
                                <li>
                                    <Stack spacing={1} direction='row' alignItems='center'>
                                        <EmailIcon style={{ fontSize: '1em' }} />
                                        <Typography variant="body2">
                                            <StyledLink to='#'>mira@vitaliapizza.dk</StyledLink>
                                        </Typography>
                                    </Stack>
                                </li>
                                <li>
                                    <Stack spacing={1} direction='row' alignItems='center'>
                                        <ArticleIcon style={{ fontSize: '1em' }} />
                                        <Typography variant="body2">
                                            <StyledLink to='/terms'>Handelsbetingelser</StyledLink>
                                        </Typography>
                                    </Stack>
                                </li>
                                <li>
                                    <Stack spacing={1} direction='row' alignItems='center'>
                                        <PolicyIcon style={{ fontSize: '1em' }} />
                                        <Typography variant="body2">
                                            <StyledLink to='/privacy'>Privatlivspolitik</StyledLink>
                                        </Typography>
                                    </Stack>
                                </li>
                            </StyledUl>
                        </Stack>
                    </Grid>

                    <Grid item>
                        <Stack spacing={1} alignItems='center'>
                            <AccessTimeIcon style={{ fontSize: '2.5em', paddingTop: '10px' }} />
                            <Stack spacing={.5} style={{textAlign: 'right'}}>
                                {timeTable}                            
                            </Stack>
                            
                        </Stack>
                    </Grid>
                    <Grid item display='flex' alignItems='center' justifyContent='center'>
                        <Stack spacing={1} mt={4}>
                            <Paper style={{ padding: '.5em', width: '6em' }}>
                                <StyledLink2 href='https://www.facebook.com/Vitalia-Pizzabar-104133172249955' target="_blank">
                                    <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-around'>
                                        <FacebookOutlinedIcon />
                                        <Typography variant="body1">Facebook</Typography>
                                    </Stack>
                                </StyledLink2>
                            </Paper>
                            <Paper style={{ padding: '.5em', width: '6em' }}>
                                <StyledLink2 href='https://wa.me/4539642349' target="_blank">
                                    <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-around'>
                                        <WhatsappOutlinedIcon />
                                        <Typography variant="body1">What's app</Typography>
                                    </Stack>
                                </StyledLink2>
                            </Paper>
                            <Paper style={{ padding: '.5em', width: '6em' }}>
                                <StyledLink to='#'>

                                    <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-around'>
                                        <YouTubeIcon />
                                        <Typography variant="body1">Youtube</Typography>
                                    </Stack>
                                </StyledLink>
                            </Paper>
                            {/* <div style={{paddingTop: '.3em'}}><img src={Cards} /></div> */}

                        </Stack>
                    </Grid>
                </Grid>
                <StyledPlant />
            </FooterWrapper>
        </React.Fragment>
    );
}

