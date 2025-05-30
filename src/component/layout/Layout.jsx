import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "../../components/common/ScrollToTop.jsx";
import ChatBot from "../../components/common/ChatBot.jsx";

const Layout = () => {
  const location = useLocation();

  // Routes where layout components (Navbar, Footer, ChatBot) should be hidden
  const hideLayoutOnPaths = [
    "/admin/dashboard",
    "/team/dashboard",
  ];

  const shouldHideLayout = hideLayoutOnPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <main>
        <Outlet />
      </main>
      <ScrollToTop />
      {!shouldHideLayout && <Footer />}
      {!shouldHideLayout && <ChatBot />}
    </>
  );
};

export default Layout;
