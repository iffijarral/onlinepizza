import React, { useState, useEffect } from "react";
import { postRequest } from 'AxiosClient';

import { Box, ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import { Items } from "Components/Items/Items";

export const OrderSelections = (props) => {           

    return (
        <React.Fragment>
            <Box width='100%' display='flex'>

                <ToggleButtonGroup
                    color="primary"
                    value={props.currentIndex}
                    exclusive
                    onChange={props.handleChange}
                >
                    <ToggleButton value="current" aria-label="left aligned">
                        <Typography variant="h4">
                            Aktuel
                        </Typography>
                    </ToggleButton>
                    <ToggleButton value="all" aria-label="left aligned">
                        <Typography variant="h4">
                            Alle
                        </Typography>
                    </ToggleButton>
                    
                </ToggleButtonGroup>

            </Box>
           
        </React.Fragment>
    )

}