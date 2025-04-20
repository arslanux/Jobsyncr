export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Ubuntu', sans-serif",
        },
        paragraph: {
          marginBottom: theme.spacing(2),
          fontFamily: "'Ubuntu', sans-serif",
        },
        body1: {
          fontSize: '14px',
          color: theme.palette.grey[600],
          fontFamily: "'Ubuntu', sans-serif",
        },
        body2: {
          fontSize: '12px',
          color: theme.palette.grey[600],
          fontFamily: "'Ubuntu', sans-serif",
        },
        h6: {
          fontSize: '16px',
          color: theme.palette.grey[600],
          fontFamily: "'Ubuntu', sans-serif",
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
          fontFamily: "'Ubuntu', sans-serif",
        },
        allVariants: {
          color: '#101828',
          fontFamily: "'Ubuntu', sans-serif",
        },
      },
    },
  };
}
