import React from "react";
import Nav from "./Nav";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav">
      <p className="nav__logo">POS</p>
      <Nav />
    </div>
  );
}
