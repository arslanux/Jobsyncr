export default function FormLabel(theme) {
  return {
    MuiFormLabel: {
      defaultProps: {
        shrink: false,
      },
      styleOverrides: {
        root: {
          color: theme.palette.text.main,
          fontFamily: "'Ubuntu', sans-serif",
        },
      },
    },
  };
}
