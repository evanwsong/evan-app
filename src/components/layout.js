import React from "react";

import Header from "./header";
import Footer from "./footer";
import Navigation from "./nav";

const Layout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <div className="route-body">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout