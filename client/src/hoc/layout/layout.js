import React from "react";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import Home from "../../pages/home/home";

const Layout = props => {
  return (
    <div>
      <Navbar />
      <Home></Home>
      {props.children}
      <Footer />
    </div>
  );
};
export default Layout;
