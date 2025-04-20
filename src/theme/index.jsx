import PropTypes from "prop-types";
import { useMemo } from "react";
// material
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import palette from "./palette";
import componentsOverride from "./overrides";
// import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography: {
        fontFamily: "'Ubuntu', sans-serif",
        h1: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 700,
        },
        h2: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 600,
        },
        h3: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 600,
        },
        h4: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 500,
        },
        h5: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 500,
        },
        h6: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 500,
        },
        subtitle1: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 400,
        },
        subtitle2: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 400,
        },
        body1: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 400,
        },
        body2: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 400,
        },
        button: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 500,
          textTransform: 'none',
        },
        caption: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 400,
        },
        overline: {
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 400,
        },
      },
      //   shadows,
      //   customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
