import { colors, createTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const primary = '#2c98f0';
const txtPrimary = '#fff';
const secondary = '#000'

const theme = createTheme({
  overrides: {
    MuiCheckbox : {
      root : {
        color : primary
      }
    },
    MuiMenuItem: {
      root : {
        '&:hover': { 
          backgroundColor: primary, 
        }, 
      }
    },
    MuiDialogActions: {
      root : {
        display : 'block',
        textAlign: 'center'
      }
    },
    MuiDialogTitle: {
      root : {
        backgroundColor : primary,
        color : colors.common.white
      }
    }
  },
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      // main: colors.indigo[500],
      main: primary,
      light : '#95CBF7',
    },
    secondary: {
      // main: colors.indigo[500]
      main: '#000'
    },
    error : {
      main : '#ff0033'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
      header: '#ffffff',
    },
    icons : {
      menu : '#fff',
      page : '#000'
    },
    tooltip : {
      main : '#DB3434'
    }
  },
  shadows,
  typography
});

export default theme;
