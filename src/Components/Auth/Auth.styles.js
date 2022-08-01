import styled from "styled-components";
import BgImage from 'Images/sandwich.jpg';
import { Box } from "@mui/system";
import { Paper } from "@mui/material";

export const Wrapper = styled.div`
    /* width; 100vw;*/
    height: 100vh;     
    
    /* background: url(${BgImage}); */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const Container = styled(Box)`
    display: flex;
    justify-content: center; 
    width: 30em;
    height: 100%;
    ${props => props.theme.breakpoints.down("md")} {
        width: 100%;
        /* padding: .5em; */
    }
    /* height: 100%;     */
    margin: auto; 
    align-items: center; 
`;

export const AuthWrapper = (props) => {
    return (
        <Wrapper>
            <Container >
                <Paper 
                    elevation={24} 
                    style=
                        {{
                            margin: 'auto', 
                            padding: '1em', 
                            width: {md: '25em'}, 
                            alignItems: 'center', 
                            display: 'flex', 
                            flexDirection: 'column',
                            // height: '100vh',                            
                            justifyContent: 'center',
                            overflow: 'auto'
                        }}
                >
                    {props.children}
                </Paper>
            </Container>
        </Wrapper>
    );
}

