import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export type LayoutProps = {
  child: any;
};

export const Layout: React.FC<LayoutProps> = ({ child }) => {
  return (
    <div>
      <Navbar />
      <main>{child}</main>
      <Footer />
    </div>
  );
};
