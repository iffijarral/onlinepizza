import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CartContext = createContext();
const { Provider } = CartContext;

const CartProvider = ({ children }) => {

    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem("products");
        const storedValue = JSON.parse(saved);
        return storedValue || [];
    });

    const selectedProductsCount = () => {
        let count = 0;

        products.forEach((x) => count += x.quantity);

        return count;
    }

    const setProductQuantity = (id, quantity) => {
        setProducts(
            products.map((x) => {

                if (x.id === id) {

                    return {
                        ...x,
                        quantity: quantity,
                    };
                }
                return x;
            })
        );
    }

    const addToCart = (product) => {

        let counter = 0;

        setProducts(
            products.map((x) => {
                if (x.id === product.id) {
                    counter++;
                    return {
                        ...x,
                        quantity: parseInt(x.quantity) + parseInt(product.quantity),
                    };
                }
                return x;
            })
        );

        if (counter === 0) {
            setProducts([...products, product]);
        }
    }

    const removeFromCart = (id) => {
       
        const index = products.findIndex(prod => prod.id === id); //use id instead of index
       
        if (index > -1) { //make sure you found it

            const product = products[index];

            if (product.quantity > 1) {

                // 1. Make a shallow copy of the array
                let temp_state = [...products];

                // 2. Make a shallow copy of the element you want to mutate
                let temp_element = { ...temp_state[index] };

                // 3. Update the property you're interested in
                temp_element.quantity = temp_element.quantity - 1;

                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                temp_state[index] = temp_element;

                // 5. Set the state to our new copy
                setProducts(temp_state);
                console.log(temp_state);
            } else {
                var array = [...products];
                array.splice(index, 1);
                setProducts(array);
            }

        }
        
        if(selectedProductsCount() === 1) {
            localStorage.removeItem('products');            
        }
            

    }

    const clearCart = () => {
        setProducts([]);
    }

    const getCart = () => {
        return products;
    }

    return (
        <Provider
            value={{
                products,
                addToCart,
                removeFromCart,
                clearCart,
                getCart,
                selectedProductsCount,
                setProductQuantity
            }}
        >
            {children}
        </Provider>
    );
};

export { CartContext, CartProvider };