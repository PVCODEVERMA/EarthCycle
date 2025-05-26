// src/component/layout/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";

import Footer from "./Footer.jsx";
import ScrollToTop from "../../components/common/ScrollToTop.jsx";
import ChatBot from "../../components/common/ChatBot.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <ScrollToTop />
       <Footer />
      <ChatBot />
     
    </>
  );
};

export default Layout;
