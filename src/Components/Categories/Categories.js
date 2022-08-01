import React, { useState, useEffect, useContext } from "react";
import { postRequest } from 'AxiosClient';

import { Container, List, ListItem, ListItemButton, Stack, Typography } from "@mui/material";

import { Category, ImgWrapper, StyledList } from "Components/Categories/Categories.styles";

import { SubCategories } from "Components/Categories/SubCategories";

import { CategoriesContext } from "Components/Contexts/CategoriesContext";

export const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const catContext = useContext(CategoriesContext);

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

            setCategories(categories);
        }
    }

    const handleClick = (index) => {
        setCurrentIndex(index);
        catContext.setCatID(categories[index].id);
    }

   
 
    return (
        <React.Fragment>
            <Container maxWidth='lg' >
                <Stack
                    margin={0}
                    spacing={2}
                    direction='row'     
                    sx={{
                        display: 'flex',                        
                        justifyContent: 'center',
                        position: "relative",
                        marginTop: "-1em"

                    }}
                >
                    <StyledList>
                        {
                            categories.map((category, index) => {
                                return (
                                    <ListItem key={index} style={{ padding: 0 }}>
                                        <ListItemButton onClick={() => handleClick(index)}>
                                            <Category elevation={category.id === catContext.catID ? 24 : 0} style={{ borderWidth: category.id === catContext.catID ? 1.5 : .5 }}  >
                                                <Stack alignItems='center'>
                                                    <ImgWrapper>
                                                        <img src={`http://vitaliapizza.dk/vitalia/uploads/${category.image}`}  />
                                                    </ImgWrapper>
                                                    <Typography variant="h6" fontWeight={600}>
                                                        {category.name}
                                                    </Typography>
                                                </Stack>
                                            </Category>
                                        </ListItemButton>
                                    </ListItem>

                                )
                            })
                        }
                    </StyledList>
                </Stack>
                                
            </Container>
            
        </React.Fragment>
    );
}