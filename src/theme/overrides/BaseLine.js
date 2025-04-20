// ----------------------------------------------------------------------

export default function MuiCssBaseline(theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${theme.palette.primary.main} ${theme.palette.secondary.main}`,
          mr: 1,
          fontFamily: "'Ubuntu', sans-serif",

          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: theme.palette.primary.main,
            scrollBarWidth: "thin",
            minHeight: 24,
            maxWidth: "1px",
            border: "none",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          //   "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
          //     backgroundColor: "#2b2b2b",
          //   },
        },
      },
    },
  };
}
