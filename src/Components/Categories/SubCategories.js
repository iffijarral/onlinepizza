import React, { useState, useEffect, useContext } from "react";
import { postRequest } from 'AxiosClient';

import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";

import { Items } from "Components/Items/Items";

import { CategoriesContext } from "Components/Contexts/CategoriesContext";

export const SubCategories = (props) => {
    const [subCategories, setSubCategories] = useState([]);

    const [currentIndex, setCurrentIndex] = useState('');

    const catContext = useContext(CategoriesContext);

    const catID = catContext.catID;

    const handleChange = (event, newAlignment) => {
        
        setCurrentIndex(newAlignment);

        catContext.setSubCatID(newAlignment); //newAlignment contains the subcatid
    };

    useEffect(() => {

        loadSubCategories(catID); // this catID is coming from context


    }, [catID]);

    const loadSubCategories = async(catID) => {
        const formData = new FormData();

        formData.append(
            'action', 'get'
        );
        formData.append('catID', catID);

        const response = await postRequest('subCategory', formData);

        if (response.data.status) {

            const subCategories = Array.from(response.data.subCategories);

            setSubCategories(subCategories);
            setCurrentIndex(subCategories[0].id);
            catContext.setSubCatID(subCategories[0].id);
        } else {
            setSubCategories([]);
        }
    }

    return (
        <React.Fragment>
            <Box width='100%' display='flex' justifyContent='center' p={4}>
                {subCategories.length > 0 ?
                    <ToggleButtonGroup
                        color="primary"
                        value={currentIndex}
                        exclusive
                        onChange={handleChange}
                    >
                        {subCategories.map((subCategory, index) => {
                            return (
                                <ToggleButton key={index} value={subCategory.id}>{subCategory.name}</ToggleButton>
                            )
                        })}
                        
                    </ToggleButtonGroup>
                    :
                    ''
                }
            </Box>
           
        </React.Fragment>
    )

}