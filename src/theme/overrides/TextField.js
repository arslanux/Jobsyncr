export default function MuiOutlinedInput() {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: 1,
          // padding: 0,
          '& .MuiOutlinedInput-root': {
            fontFamily: "'Ubuntu', sans-serif",
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: "'Ubuntu', sans-serif",
          },
          '& .MuiInputBase-input': {
            fontFamily: "'Ubuntu', sans-serif",
          },
        },
      },
    },
  };
}
