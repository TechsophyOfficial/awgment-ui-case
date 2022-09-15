import { UPDATE_THEME } from './ThemeState';

const themeReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_THEME:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default themeReducer;
