import { createContext } from 'react';
import {INITIAL_THEME} from './ThemeState'

// export interface ThemeContextProps {
//     theme: ThemeProps;
//     updateTheme: (data: ThemeProps) => void;
// }

const ThemeContext = createContext({theme : INITIAL_THEME , updateTheme : (data) => {}});

export default ThemeContext;
