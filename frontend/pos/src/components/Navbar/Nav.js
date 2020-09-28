import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import CategoryIcon from '@material-ui/icons/Category';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Overlay } from 'react-bootstrap';
import { connect } from "react-redux";
import { setUser } from '../../redux/actions/authActions';
import { bindActionCreators } from 'redux';

import EditProfileModal from '../editProfileModal/editProfileModal';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import "./Navbar.css";

function Nav(props) {
  const { user } = props;
  const [editModal, setEditModal] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);


  useEffect(() => {
  }, [props])


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
      <div className="x" ref={target} onClick={() => setShow(!show)}>
        <div className="nav__item mx-4" >
          <AccountCircle />
          <p className="nav__text">Profile</p>
        </div>
        <OverlayComponent
          show={show}
          target={target.current}
          setShow={() => setShow(false)}
          setEditModal={() => setEditModal(true)}
          user={user}
        />
        <EditProfileModal
          editModal={editModal}
          setEditModal={() => setEditModal(false)}
        />
      </div>
    </nav>
  );
}

const mapStatesToProps = ({ auth }) => {
  return {
    user: auth.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUser }, dispatch);
};

export default connect(mapStatesToProps, mapDispatchToProps)(Nav);

const OverlayComponent = (props) => {
  const { show, target, setShow, setEditModal, user } = props;

  useEffect(() => {
  }, [])

  return (
    <Overlay target={target} show={show} placement="bottom">
      {({ placement, arrowProps, show: _show, popper, ...props }) => (
        <div {...props}>
          <div className="bg-white pb-2 mt-1" style={{ border: 'solid 1px #ccc', borderRadius: '5px' }}>
            <div className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: 'solid 1px #cccccc8a' }}>
              <div className="px-3">Profile information</div>
              <div onClick={() => setShow(false)} className="x px-3 font-weight-bold h5">x</div>
            </div>
            <div className="">
              <div className="my-3 px-3">
                <h3 className="card-title m-0" >{user.name}</h3>
                <p className="card-text m-0">( {user.username} )</p>
              </div>
              <div className="my-2 px-3">
                <h6 className="m-0 font-weight-bolder">Role(s)</h6>

                {user.roles.map((role) => {
                  return (
                    <span key={role._id} className="card-text m-0">
                      {role.name}, &nbsp;
                    </span>
                  );
                })}
              </div>
              <div className="my-2 px-3 d-flex justify-content-between align-items-center">
                <h6 className="m-0 font-weight-bolder" style={{ flex: 1 }}>PhoneNumber:</h6>
                <p className="card-text m-0" style={{ flex: 2.5 }}>{user.phoneNumber}</p>
              </div>
              <div className="mt-4 mb-2" style={{ borderBottom: 'solid 1px #cccccc8a' }}></div>
              <div className="d-flex px-3 justify-content-center align-items-center">
                <button onClick={() => setEditModal()} className="btn btn-success"><span className="mr-2"><EditIcon style={{ fontSize: 20 }} /></span>Edit</button>
                <button className="btn btn-danger ml-3"><span className="mr-2"><ExitToAppIcon style={{ fontSize: 20 }} /></span>Log out</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Overlay>
  )
}
