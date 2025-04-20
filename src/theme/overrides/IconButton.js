// ----------------------------------------------------------------------

export default function IconButton(theme) {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          // border: '1px solid rgba(0, 0, 0, 0.23)',
          // borderRadius: '8px',
          // backgroundColor: '#ffffff',
          // padding: theme.spacing(1),
        },
      },
    },
    variants: [
      {
        props: { variant: 'primary' },
        style: {
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    ],
  };
}
