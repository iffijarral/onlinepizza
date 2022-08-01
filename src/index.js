import ScrollToTop from 'Util/ScrollToTop';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { AuthProvider } from 'Components/Contexts/AuthContext';
import { CartProvider } from 'Components/Contexts/CartContext';
import { CheckoutProvider } from 'Components/Contexts/CheckoutContext';
import { CategoriesProvider } from 'Components/Contexts/CategoriesContext';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <CategoriesProvider>
            <ScrollToTop />
            <App />
            </CategoriesProvider>
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

