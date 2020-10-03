import React from "react";
import Nav from "./Nav";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="custom_nav">
      <p className="nav__logo">OCH Limbe</p>
      <Nav />
    </div>
  );
}
