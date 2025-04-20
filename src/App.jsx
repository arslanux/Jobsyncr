import "./App.css";
import Router from "./routes";
// import AuthGuard from './components/guards/AuthGuard';
// import { UserProvider } from './context/UserContext';
import ThemeProvider from "./theme";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
      >
        {/* <UserProvider> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router />
        </LocalizationProvider>
        {/* </UserProvider> */}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
