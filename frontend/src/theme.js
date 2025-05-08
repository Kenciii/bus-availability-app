import { createTheme } from '@mui/material/styles';
import { blueGrey, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blueGrey[300],
    },
    background: {
      default: '#e6e6e6',
      paper: '#f9f9f9',
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        margin: 'normal',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: blueGrey[800], 
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: blue[300], 
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: blue[500], 
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: blue[700], 
          },
        },
        input: {
          color: blueGrey[800], 
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: blueGrey[800], 
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: blueGrey[800],
        },
      },
    },
  },
});

export default theme;
