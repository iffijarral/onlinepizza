import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate, useLocation } from "react-router-dom";
import { Orders } from './Orders';
import { Customers } from './Customers';
import { Categories } from './Categories';
import { SubCategories } from './SubCategories';
import { Products } from './Products';
import { LoginAdmin } from './Auth/Login';
import { ChangeAdminPassword } from './Auth/ChangePassword';
import { NewAdminUser } from './NewAdminUser';

import { AuthContext } from 'Components/Contexts/AuthContext';


const drawerWidth = 240;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [listOpen, setListOpen] = React.useState(false);

    const handleListClick = () => {
        setListOpen(!listOpen);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navigate = useNavigate();

    const handleClick = (target) => {
        switch (target) {
            case 'Orders':
                navigate('/admin/orders');
                break;
            case 'Categories':
                navigate('/admin/categories');
                break;
            case 'SubCategories':
                navigate('/admin/subcategories');
                break;
            case 'Products':
                navigate('/admin/products');
                break;
            case 'Customers':
                navigate('/admin/customers');
                break;
            case 'Change Password':
                navigate('/admin/changepassword');
                break;
            case 'New AdminUser':
                navigate('/admin/newadminuser');
                break;
            case 'Log out':
                authContext.logout();
                break;
            default:
                navigate('/');
        }
    }
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button onClick={() => handleClick('Orders')}>
                    <ListItemIcon>
                        <ListAltOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Orders' />
                </ListItem>
                <ListItem button onClick={() => handleClick('Categories')}>
                    <ListItemIcon>
                        <SummarizeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Categories' />
                </ListItem>
                <ListItem button onClick={() => handleClick('SubCategories')}>
                    <ListItemIcon>
                        <SummarizeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Sub Categories' />
                </ListItem>
                <ListItem button onClick={() => handleClick('Products')}>
                    <ListItemIcon>
                        <LocalPizzaOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Products' />
                </ListItem>
                <ListItem button onClick={() => handleClick('Customers')}>
                    <ListItemIcon>
                        <PersonOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Customers' />
                </ListItem>
                <ListItem button onClick={() => handleClick('New AdminUser')}>
                    <ListItemIcon>
                        <PersonAddAltIcon />
                    </ListItemIcon>
                    <ListItemText primary='New Admin User' />
                </ListItem>
                <ListItem button onClick={() => handleClick('Change Password')}>
                    <ListItemIcon>
                        <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText primary='Change Password' />
                </ListItem>
                <ListItem button onClick={() => handleClick('Log out')}>
                    <ListItemIcon>
                        <LockOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Log out' />
                </ListItem>
            </List>
            {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const { pathname } = useLocation();

    const authContext = useContext(AuthContext);            
    
    const checkLoggedStatus = () => {
        return authContext.authenticate();

        
    }

    useEffect(() => {
        const status = checkLoggedStatus();
        if(!status) {
           
            navigate('/admin/login');
            
        }

    }, []);
   
   
    return (
        <div style={{ backgroundColor: '#f9fafc', minHeight: '100vh' }}>


            <Box sx={{ display: 'flex', }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        backgroundColor: '#fff',
                        color: '#000'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Vitalia Pizza Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, }}

                > 
                    <Toolbar />
                    {
                        (pathname == '/admin') || (pathname == '/admin/orders') ? <Orders />
                            :
                            (pathname == '/admin/customers') ? <Customers />
                                :
                                (pathname == '/admin/categories') ? <Categories />
                                    :
                                    (pathname == '/admin/subcategories') ? <SubCategories />
                                        :
                                        (pathname == '/admin/changepassword') ? <ChangeAdminPassword />
                                            :
                                            (pathname == '/admin/products') ? <Products />
                                            :
                                            (pathname == '/admin/newadminuser') ? <NewAdminUser />
                                                :
                                                'not found'
                    }

                </Box>
            </Box>
        </div>
    );
}

export default Dashboard;
