import React, { useState, useEffect } from "react";

import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider } from "styled-components";

import theme from 'Styles/Theme';
import { GlobalStyle } from 'Styles/Global.styles';
import { Home } from "Components/Home/Home";
import { Login } from "Components/Auth/Login";
import { ForgotPassword } from "Components/Auth/ForgotPassword";
import { ChangePassword } from "Components/Auth/ChangePassword";
import { Register } from "Components/Auth/Register";
import { Checkout } from "Components/Checkout/Checkout";
import Dashboard from "Components/Dashboard/Dashboard";
import { LoginAdmin } from "Components/Dashboard/Auth/Login";

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ResetPassword } from "Components/Auth/RsetPassword";

function App() {

  return (
    <HelmetProvider>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Helmet>
            <meta charSet="utf-8" />
            <title>Vitalia Pizzabar</title>
            <link rel="canonical" href="http://vitaliapizza.dk" />
            <meta name="description" content="Byens bedste spisested" />
          </Helmet>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/terms" element={<Home />} />
            <Route path="/privacy" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Dashboard />} />
            <Route path="/admin/customers" element={<Dashboard />} />
            <Route path="/admin/categories" element={<Dashboard />} />
            <Route path="/admin/subcategories" element={<Dashboard />} />
            <Route path="/admin/products" element={<Dashboard />} />
            <Route path="/admin/changepassword" element={<Dashboard />} />
            <Route path="/admin/newadminuser" element={<Dashboard />} />
            <Route path="/admin/login" element={<LoginAdmin />} />
            
          </Routes>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
    </HelmetProvider>
  );
}

export default App;
