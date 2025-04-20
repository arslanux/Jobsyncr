// ----------------------------------------------------------------------

export default function Check(theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          '& .MuiSvgIcon-root': {
            // fontSize: 70,
            borderRadius: 20,
          },
          padding: theme.spacing(1),
        },
      },
    },
  };
}
