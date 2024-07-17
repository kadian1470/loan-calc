import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoanOptionProvider } from "./context/LoanOptionsProvider";
import { queryClient } from "./context/QueryClient";
import { theme } from "./layouts/Theme";
import Home from "./pages/Home";
import Loans from "./pages/Loans";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="/loans/*"
              element={
                <LoanOptionProvider>
                  <Loans />
                </LoanOptionProvider>
              }
            ></Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
