import { Palette } from '@mui/icons-material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { withThemeCreator } from '@mui/styles';
import { hover } from '@testing-library/user-event/dist/hover';

let theme = createTheme({
    palette: {
        primary: {
            main: '#e60729'
        },
        secondary: {
            main: '#73a600'
        },
        pale: {
            main: '#f1f4f1',
            contrastText: '#383838',
        }
    },

});

theme = responsiveFontSizes(theme);
export default theme;