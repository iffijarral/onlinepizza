import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const StyledLink = styled(Link)`
          
    color: ${props => props.theme.palette.primary.main};
    text-decoration: none;
    &:hover{
     color: ${props => props.theme.palette.secondary.main}; 
    }
  
`;

export const StyledLink2 = styled.a`
          
    color: ${props => props.theme.palette.primary.main};
    text-decoration: none;
    &:hover{
     color: ${props => props.theme.palette.secondary.main}; 
    }
  
`;

export const Heading = styled(Typography)`
    font-size: 3rem;
    font-weight: 600;
    color: ${props => props.theme.palette.primary.main};
`;
