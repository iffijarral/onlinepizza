import React, { useContext, useEffect } from "react";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import LoginIcon from '@mui/icons-material/Login';
import { grey } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { AuthContext } from 'Components/Contexts/AuthContext';
import { requirePropFactory } from "@mui/material";

import { useNavigate } from 'react-router-dom';

export const Settings = (props) => {

    const authContext = useContext(AuthContext);

    const isLoggedIn = authContext.authState.status;

    const navigate = useNavigate();

    return (
        <React.Fragment>
            {!isLoggedIn ?
                <React.Fragment>
                    <MenuItem onClick={() => { props.handleCloseUserMenu();  navigate('/login') }}>
                        <Link to='/login' style={{ textDecoration: 'none', color: grey[900] }}>
                            <Typography textAlign="center">Log på</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={() => { props.handleCloseUserMenu();  navigate('/register') }}>                       
                            <Typography textAlign="center">Tilmeld</Typography>                        
                    </MenuItem>
                </React.Fragment>

                :

                <React.Fragment>
                    <MenuItem onClick={() => { props.handleCloseUserMenu();  navigate('/history') }}>
                         <Typography textAlign="center">Ordrehistorik</Typography> 
                    </MenuItem>
                    <MenuItem onClick={() => {props.handleCloseUserMenu(); navigate('/changepassword') }}>
                        <Typography textAlign="center">Ændr adgangskode</Typography> 
                    </MenuItem>

                    <MenuItem onClick={() => {props.handleCloseUserMenu(); authContext.logout()}}>
                        <Typography textAlign="center">Log ud</Typography>
                    </MenuItem>
                </React.Fragment>
            }
        </React.Fragment>
    );
}