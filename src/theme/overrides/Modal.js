// ----------------------------------------------------------------------

export default function Modal(theme) {
  return {
    MuiModal: {
      styleOverrides: {
        root: {
          //   top: "50%",
          //   left: "50%",
          //   transform: "translate(-50%, -50%)",
          //   width: 400,
          //   backgroundColor: "#fff",
          //   border: "2px solid #000",
          //   boxShadow: 24,
          //   pt: 2,
          //   px: 4,
          //   pb: 3,
          //   zIndex: 1000,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
        },
      },
    },
  };
}
