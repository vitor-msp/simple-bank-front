import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import { MyAccountPage } from "./pages/MyAccountPage";
import { Layout } from "./pages/Layout";
import { AccountProvider } from "./context/AccountProvider";

function App() {
  return (
    <>
      <AccountProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout child={<LoginPage />} />} />
            <Route path="/login" element={<Layout child={<LoginPage />} />} />
            <Route
              path="/sign-up"
              element={<Layout child={<SignupPage />} />}
            />
            <Route path="/home" element={<Layout child={<HomePage />} />} />
            <Route
              path="/my-account"
              element={<Layout child={<MyAccountPage />} />}
            />
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </>
  );
}

export default App;
