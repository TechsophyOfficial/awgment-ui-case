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

const ContextProvider = ({ children }) => {
  const { theme, updateTheme } = useContext(ThemeContext);

  useEffect(() => {
    const setTheme = () => {
      // const selectedThemeRes = await getSelectedTheme();
      getPreferenceThemeId().then((response) => {
        getSelectedTheme(response.data).then((selectedThemeRes) => {
          if (selectedThemeRes.success) {
            const selectedTheme = selectedThemeRes.data;
            updateTheme(selectedTheme);
          }
        });
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
