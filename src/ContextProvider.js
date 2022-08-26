import React, { useContext, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core";
import ThemeContext from "./contexts/themeContext/theme-context";
import {
  getPreferenceThemeId,
  getSelectedTheme,
} from "./services/ThemeService";
import { PREFERENCE_ENDPOINT, THEME_ENDPOINT } from '../src/constants/endpoints'

const ContextProvider = ({ children, config }) => {
  const { theme, updateTheme } = useContext(ThemeContext);


  useEffect(() => {
    const setTheme = () => {
      // const selectedThemeRes = await getSelectedTheme();
      const PREFERENCE_API_ENDPOINT = `${config.apiGatewayUrl}${PREFERENCE_ENDPOINT}`;
      const THEME_API_ENDPOINT = `${config.apiGatewayUrl}${THEME_ENDPOINT}`;
      getPreferenceThemeId(PREFERENCE_API_ENDPOINT).then((response) => {
        if (response.success) {
          getSelectedTheme(response?.data, THEME_API_ENDPOINT).then((selectedThemeRes) => {
            if (selectedThemeRes.success) {
              const selectedTheme = selectedThemeRes.data;
              updateTheme(selectedTheme);
            }
          });
        }
      });
    };
    setTheme();
    // eslint-disable-next-line
  }, []);

  const generateClassName = createGenerateClassName({
    productionPrefix: "app-container-",
    seed: "caseInbox",
  });

  return (
    <div>
      <CssBaseline />
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StylesProvider>
    </div>
  );
};

export default ContextProvider;
