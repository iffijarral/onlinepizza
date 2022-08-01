import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";
import { keyframes, css } from 'styled-components';

export const TxtAnimation = keyframes`

    0% {
      opacity: 0;
    }
    50% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
`
const txtStyles = css`
  animation: ${TxtAnimation} 1s ease 0s;
`

export const HeroWrapper = styled(Box)`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 0 0 50% 50% / 100% 100%;
        transform: scaleX(1.5);
        background: url(${props => props.bgImage}) no-repeat center center fixed;
        transition: background-image 3s ease-in-out;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;         
        background-size: cover;
        
    } 
`;

export const HeroHeading = styled(Typography)`
    text-shadow: 2px 2px 8px #FF0000;       
    color: white;
    
    ${props => props.theme.breakpoints.down("md")} {
        text-align: center;
    }

    
`;
export const HeroSubHeading = styled(HeroHeading)`
    font-size: 2rem;
    font-weight: 500;
    ${props => props.theme.breakpoints.down("md")} {
        text-align: center;
    }
`;
export const HeroCaption = styled(HeroHeading)`    
    ${props => props.theme.breakpoints.down("md")} {
        text-align: center;
    }
    font-weight: 900;    
`;



