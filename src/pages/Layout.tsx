import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AccountContext } from "../context/AccountProvider";
import { Role } from "../core/domain/Role";
import { AdminPage } from "./AdminPage";

export type LayoutProps = {
  child: any;
};

export const Layout: React.FC<LayoutProps> = ({ child }) => {
  const [refreshCounter, setRefreshCounter] = useState<number>(0);
  const accountContext = useContext(AccountContext);

  useEffect(() => {
    (async () => {
      const isLogged = await accountContext.init();
      if (isLogged) setRefreshCounter(1);
    })();
  }, []);

  return (
    <>
      {(accountContext.role === Role.Admin && <AdminPage />) || (
        <div>
          <Navbar />
          <main>{refreshCounter === 0 && child}</main>
          <main>{refreshCounter === 1 && child}</main>
          <Footer />
        </div>
      )}
    </>
  );
};
