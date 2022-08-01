import React, { useState, useEffect, useContext } from "react";

import { postRequest } from 'AxiosClient';

import { Container, Grid } from "@mui/material";

import { Item } from "Components/Items/Item";

import { CategoriesContext } from "Components/Contexts/CategoriesContext";

export const Items = () => {

    const [products, setProducts] = useState([]);

    const catContext = useContext(CategoriesContext);

    useEffect(() => {

        loadProducts();


    }, [catContext.catID, catContext.subCatID]);

    const loadProducts = async () => {
        // console.log(props);
        const formData = new FormData();

        formData.append('action', 'get');

        formData.append('cat_id', catContext.catID);

        formData.append('sub_cat_id', catContext.subCatID);

        // for (var p of formData) {
        //     let name = p[0];
        //     let value = p[1];

        //     console.log(name, value)
        // }
        const response = await postRequest('product', formData);

        if (response.data.status) {
            
            const products = Array.from(response.data.products);
            
            setProducts(products);

        } else {

            setProducts([]);
        }
    }


    return (
        <React.Fragment>
            <Container maxWidth='lg' style={{ padding: '1em', border: '.5px solid #eee', borderRadius: 8, backgroundColor: 'beige' }}>
                <Grid container spacing={3} alignItems='center' direction='row' justifyContent='center'>
                    {
                        products.map(product => {
                            return (
                                <Grid item key={product.id}>
                                    <Item key={product.id} {...product} />
                                </Grid>
                            );
                        })
                    }

                    {/* <Grid item>
                        <Item />
                    </Grid>
                    <Grid item>
                        <Item />
                    </Grid>
                    <Grid item>
                        <Item />
                    </Grid> */}
                </Grid>
            </Container>
        </React.Fragment>
    );
}