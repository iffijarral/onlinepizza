import React, { createContext, useEffect } from 'react';

import { postRequest } from 'AxiosClient';

const CategoriesContext = createContext();
const { Provider } = CategoriesContext;


const CategoriesProvider = ({ children }) => {

    const [catID, setCatID] = React.useState('');

    const [subCatID, setSubCatID] = React.useState('');

    useEffect(() => {

        loadCategories();


    }, []);

    const loadCategories = async () => {

        const formData = new FormData();

        formData.append(
            'action', 'get'
        );
        const response = await postRequest('category', formData);

        if (response.data.status) {

            const categories = Array.from(response.data.categories);

            setCatID(categories[0].id);
        }
    }

    return (
        <Provider
            value={{
                catID,
                subCatID,
                setCatID,
                setSubCatID               
            }}
        >
            {children}
        </Provider>
    );
};

export { CategoriesContext, CategoriesProvider };