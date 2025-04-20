// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          // height: "61px",
          textTransform: 'none',
          boxShadow: 'none',
          // color: theme.palette.background.light,
          fontFamily: "'Ubuntu', sans-serif",
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
      variants: [
        {
          props: { variant: 'primary' },
        },
        {
          props: { variant: 'pagination' },
          style: {
            // border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '100%',
            backgroundColor: theme.palette.primary.action,
            color: theme.palette.text.secondary,
            fontWeight: 600,
            padding: '0px',
            margin: '0px',
            fontSize: '18px',
            // height: "50px",
            // width: "50px",
            fontFamily: "'Ubuntu', sans-serif",
          },
        },
      ],
    },
  };
}
