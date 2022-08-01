import styled from "styled-components";
import { Button } from "@mui/material";

export const AddToCart = styled(Button)`

    background-color: ${props => props.theme.palette.primary.main};
    color: white;    

    &:hover {
        background-color: ${props => props.theme.palette.secondary.main};
        cursor: pointer;
    }
`;

export const TextBox = styled.input.attrs({type: 'text'})`
    text-align: center;
    width: 5em;
    margin: 0;
    
    &:focus-visible {        
        outline-color: green;
    };
    &:focus {        
        outline-color: green;
    };
    &:active {
        outline-color: green !important;        
    };
`;