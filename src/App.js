import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LinkInput from "./components/link/LinkInput";
import Login from "./components/user/Login";
import { ThemeModeProvider } from "./components/context/ThemeContext";
import { AuthProvider } from "./components/context/AuthContext";
import NotFound from "./components/layout/NotFound";
import Layout from "./components/layout/Layout";
import FirstPage from "./components/FirstPage";
import Account from "./components/user/Account";
import ChangePassword from "./components/user/ChangePassword";
import { SnackbarProvider } from "notistack";

function App() {
  let location = useLocation();

  function RequireAuth({ children }) {
    const storedData = JSON.parse(localStorage.getItem("userDetails"));
    if (storedData === null) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }

  return (
    <ThemeModeProvider>
      <AuthProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          autoHideDuration={3000}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <FirstPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <LinkInput />
                  </RequireAuth>
                }
              />
              <Route
                path="/user/account"
                element={
                  <RequireAuth>
                    <Account />
                  </RequireAuth>
                }
              />
              <Route
                path="/user/password"
                element={
                  <RequireAuth>
                    <ChangePassword />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SnackbarProvider>
      </AuthProvider>
    </ThemeModeProvider>
  );
}

export default App;
