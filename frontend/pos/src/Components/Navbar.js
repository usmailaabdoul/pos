import React from "react";
import "./Navbar.css";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from "@material-ui/icons/Settings";

export default function Navbar() {
  return (
    <div className="nav">
      <p className="nav__logo">POS</p>
      <ul className="nav__container">
        <li className="nav__item">
          <LibraryBooksIcon />
          <p className="nav__text">Items</p>
        </li>
        <li className="nav__item">
          <ShoppingCartIcon />
          <p className="nav__text">Sales</p>
        </li>
        <li className="nav__item">
          <PeopleAltIcon />
          <p className="nav__text">Customers</p>
        </li>
        <li className="nav__item">
          <ShowChartIcon />
          <p className="nav__text">Reports</p>
        </li>
        <li className="nav__item">
          <GroupAddIcon />
          <p className="nav__text">Employees</p>
        </li>
        <li className="nav__item">
          <SettingsIcon />
          <p className="nav__text">Settings</p>
        </li>
      </ul>
    </div>
  );
}
