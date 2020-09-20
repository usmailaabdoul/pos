import React from "react";
import { NavLink } from "react-router-dom";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import CategoryIcon from '@material-ui/icons/Category';
import "./Navbar.css";

function Nav() {
  return (
    <nav className="nav__container">
      <NavLink className="nav__item" to="/sales" activeClassName="is-active">
        <ShoppingCartIcon />
        <p className="nav__text">Sales</p>
      </NavLink>
      <NavLink className="nav__item" to="/items" activeClassName="is-active">
        <LibraryBooksIcon />
        <p className="nav__text">Items</p>
      </NavLink>
      <NavLink className="nav__item" to="/categories" activeClassName="is-active">
        <CategoryIcon />
        <p className="nav__text">Categories</p>
      </NavLink>
      <NavLink
        className="nav__item"
        to="/customers"
        activeClassName="is-active"
      >
        <PeopleAltIcon />
        <p className="nav__text">Customers</p>
      </NavLink>
      <NavLink className="nav__item" to="/reports" activeClassName="is-active">
        <ShowChartIcon />
        <p className="nav__text">Reports</p>
      </NavLink>
      <NavLink
        className="nav__item"
        to="/employees"
        activeClassName="is-active"
      >
        <GroupAddIcon />
        <p className="nav__text">Employees</p>
      </NavLink>
      <NavLink className="nav__item" to="/settings" activeClassName="is-active">
        <SettingsIcon />
        <p className="nav__text">Settings</p>
      </NavLink>
    </nav>
  );
}

export default Nav;
