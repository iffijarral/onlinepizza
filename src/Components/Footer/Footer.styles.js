import { Box, Container } from "@mui/material";
import styled from "styled-components";
import BgFooter from 'Images/bgfooter.svg';
import Plant from 'Images/plant.svg';

export const FooterWrapper = styled(Container)(({theme}) => ({
    background: `url(${BgFooter})`,
    backgroundRepeat: 'no-repeat',
    marginTop: '3em',    

    [theme.breakpoints.down("md")]: {
        background: 'none',
       marginTop: '0',
       backgroundColor: theme.palette.pale.main
    }
    
}));

export const StyledUl = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;

    li {
        padding-bottom: .2em;
    }
`; 

const MyImg = styled.img `
    position: absolute;
    left: 15em;
    bottom: 0;
    ${props => props.theme.breakpoints.down("md")} {
        display: none;
    }
`;

export const StyledPlant = () => {
    return(
        <MyImg src={Plant} />
    );
}