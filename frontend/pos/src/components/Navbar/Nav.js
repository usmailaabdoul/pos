import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import CategoryIcon from '@material-ui/icons/Category';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from "react-redux";

import EditProfileModal from '../editProfileModal/editProfileModal';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import "./Navbar.css";

function Nav(props) {
  const {user} = props;
  const [editModal, setEditModal] = useState(false);

  const popover = (
    <Popover id="popover-basic" className="w-25">
      <Popover.Title as="h3">Profile information</Popover.Title>
      <Popover.Content>
        <div className="">
          <div className="my-3">
            <h3 className="card-title m-0" >John Doe</h3>
            <p className="card-text m-0">( john )</p>
          </div>
          <div className="my-2">
            <h6 className="m-0 font-weight-bolder">Role(s)</h6>
            <p className="card-text m-0">Manager, Settings, Sales</p>
          </div>
          <div className="my-2 d-flex justify-content-between align-items-center">
            <h6 className="m-0 font-weight-bolder" style={{ flex: 1 }}>PhoneNumber:</h6>
            <p className="card-text m-0" style={{ flex: 2.5 }}>   +237 691212173</p>
          </div>
          <div style={{ borderBottom: 'solid 1px #cccccc8a', margin: '2rem 0' }}></div>
          <div className="d-flex justify-content-center align-items-center">
            <button onClick={() => setEditModal(true)} className="btn btn-success"><span className="mr-2"><EditIcon style={{ fontSize: 20 }} /></span>Edit</button>
            <button className="btn btn-danger ml-3"><span className="mr-2"><ExitToAppIcon style={{ fontSize: 20 }} /></span>Log out</button>
          </div>

          <EditProfileModal 
            editModal={editModal}
            setEditModal={() => setEditModal(false)}
            user={user}
          />
        </div>
      </Popover.Content>
    </Popover>
  );

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
      <div>
        <OverlayTrigger trigger="click" placement="bottom-start" overlay={popover}>
          <div className="nav__item mx-4" >
            <AccountCircle />
            <p className="nav__text">Profile</p>
          </div>
        </OverlayTrigger>
      </div>
    </nav>
  );
}

const mapStatesToProps = ({auth}) => {
  console.log(auth)
  return {
    user: auth.user,
  }
}

export default connect(mapStatesToProps, null)(Nav);
