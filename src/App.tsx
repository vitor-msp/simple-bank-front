import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import { MyAccountPage } from "./pages/MyAccountPage";
import { Layout } from "./pages/Layout";
import { AccountProvider } from "./context/AccountProvider";
import { CreditPage } from "./pages/CreditPage";
import { DebitPage } from "./pages/DebitPage";
import { TransferPage } from "./pages/TransferPage";

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
            <Route path="/credit" element={<Layout child={<CreditPage />} />} />
            <Route path="/debit" element={<Layout child={<DebitPage />} />} />
            <Route
              path="/transfer"
              element={<Layout child={<TransferPage />} />}
            />
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </>
  );
}

export default App;
