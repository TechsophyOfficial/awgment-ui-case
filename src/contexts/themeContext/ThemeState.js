import React, { useReducer } from 'react';
// import { INITIAL_THEME, UPDATE_THEME } from 'constants/actions';
import ThemeContext from './theme-context';
import themeReducer from './theme-reducer';
import { colors,createTheme } from '@material-ui/core';

export const UPDATE_THEME = 'UPDATE_THEME';

function shadeColor(color, percent) {

  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

export const INITIAL_THEME = createTheme({
    overrides: {
      MuiButton : {
        containedPrimary :  {
          color : colors.common.white
        }
      },
        MuiCheckbox : {
          root : {
            color : '#201e45'
          }
        },
        MuiMenuItem: {
          root : {
            '&:hover': { 
              backgroundColor: '#201e45', 
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
            backgroundColor : '#201e45',
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
            main: '#f17b7b',
            light: shadeColor('#201e45' , 500),
        },
        secondary: {
            main: '#201e45'
        },
        error: {
            main: '#f17b7b'
        },
        text: {
          primary: colors.blueGrey[900],
          secondary: colors.blueGrey[600],
          header: '#ffffff',
        },
        icons : {
          menu :  shadeColor('#201e45' , 70),
          page : '#000'
        },
        tooltip : {
          main : shadeColor('#201e45' , 70)
        }
      }
})

const ThemeState = ({ children }) => {
    const [themeState, dispatch] = useReducer(themeReducer, INITIAL_THEME);
    const updateTheme = (data) => {
        let newTheme = INITIAL_THEME;
        // if (data) {
        //     newTheme = createTheme({
        //         palette: {
        //             type: "light",
        //             primary: {
        //                 main: data.colors.textColor,
        //                 light: '#95CBF7',
        //             },
        //             secondary: {
        //                 main: data.colors.headerColor
        //             },
        //             error: {
        //                 main: '#f65656'
        //             }
        //         }
        //     })
        // }

        dispatch({ type: UPDATE_THEME, payload: newTheme });
    };

    return (
        <ThemeContext.Provider value={{ theme: themeState, updateTheme: updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeState;
