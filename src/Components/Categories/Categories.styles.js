import styled from "styled-components";
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system";
import { List } from "@mui/material";

export const Category = styled(Paper)`
    width: 4em;
    border: .5px solid #ff0000;
    margin: 0;
    overflow: hidden;
    transition: transform .2s;

    ${props => props.theme.breakpoints.up("sm")} {
        width: 6em;
        &:hover {
            transform: scale(1.3);
            cursor: pointer;
        }
    }
`;

export const ImgWrapper = styled(Box)`
    width: 100%;
    padding: .5em 0;
    background-color: #f1f4f1; 
    display: flex; 
    justify-content: center; 
    align-items: center;

    img {
        width: 60%;

        ${props => props.theme.breakpoints.down("md")} {
            width: 40%;
        }
    }
`;

export const StyledList = styled(List)`
    display: flex; 
    flex-direction: row; 
    padding: 0;     
    
    ${props => props.theme.breakpoints.down("md")} {
        overflow-x: scroll;
       &::-webkit-scrollbar {
            display: none;
        }
    }
    /* width: max-content !important; */
   
`;