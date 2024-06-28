import { ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import { theme } from "./layouts/Theme";
import Home from "./pages/Home";
import Loans from "./pages/Loans";

function App() {
  console.log("app made");
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="loans" element={<Loans />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
