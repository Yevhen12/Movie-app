import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});


// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "fieldset": {
              borderColor: "rgba(31, 41, 55, 0.6)",
            },
            // "&:hover fieldset": {
            //   borderColor: "red",
            // },
            // "&.Mui-focused fieldset": {
            //   borderColor: "red",
            // },
          },
        },
      },
      defaultProps: {
        inputProps: {
          style: {
            color: 'white',
            borderColor: 'white',
            backgroundColor: "rgb(8 10 26)",
            borderRadius: '3px',
            fontSize: '14px',
            // fontSize: "11.8px",
            // height: '.85rem',
          },
        },
      },
      variants: [
        {
          props: { variant: 'standard' },
          style: {
            borderColor: 'white',
            color: 'white',
          },
        },
      ]
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;