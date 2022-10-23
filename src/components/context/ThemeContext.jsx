import { createContext, useContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext({ toggleColorMode: () => {} });

const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>createTheme({
    palette: {
      mode: mode,
    }
  }),
  [mode],
);

  return (
    <ThemeContext.Provider value={{ colorMode }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeModeProvider, useThemeContext };
