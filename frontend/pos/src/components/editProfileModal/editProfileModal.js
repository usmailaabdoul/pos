import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import apis from '../../apis/apis';

import { setUser } from '../../redux/actions/authActions';
import { ActionModal } from '../';

const EditProfileModal = (props) => {
  const { editModal, setEditModal, user, setUser } = props;
  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)

  useEffect(() => {
    setUsername(user.username)
    setName(user.name);
    setPhoneNumber(user.phoneNumber);

  }, [user])

  const handleNameInput = (event) => setName(event.target.value);
  const handleUserNameInput = (event) => setUsername(event.target.value);
  const handlePhoneNumberInput = (event) => setPhoneNumber(event.target.value);

  const handleCancleClick = () => {
    setName('')
    setEditModal(false)
  }

  const handleSuccessClick = async () => {

    let obj = { name, username, phoneNumber }

    try {
      let updatedUser = await apis.employeeApi.editEmployee(user._id, obj);
      Swal.fire(
        'Updated!',
        `employee: ${updatedUser.name} updated successfully`,
        'success'
      )
      let userRoles = user.roles
      updatedUser.roles = userRoles
      setUser(updatedUser)
      setEditModal(false)
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Something unexpected happened'
      })
    }
  }

  return (
    <ActionModal isVisible={editModal} setIsVisible={() => setEditModal(false)} title="Edit information">
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Name <span className="text-danger">*</span></span></div>
          <input name="name" placeholder="name" value={name} onChange={handleNameInput}
            type="text" className={"w-75 form-control input"} />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Username <span className="text-danger">*</span></span></div>
          <input name="username" placeholder="username" value={username} onChange={handleUserNameInput}
            type="text" className={"w-75 form-control input"} />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Phone # <span className="text-danger">*</span></span></div>
          <input name="phonenumber" placeholder="phone number" value={phoneNumber} onChange={handlePhoneNumberInput}
            type="text" className={"w-75 form-control input"} />
        </div>
      </div>

      <div className="d-flex justify-content-around align-items-center mt-4 mx-5">
        <button onClick={() => handleCancleClick()} className="btn btn-danger mr-2"><span className="h5 px-2">Cancel</span></button>
        <button onClick={() => handleSuccessClick()} className="btn btn-success mr-2"><span
          className="h5 px-2">Sumit</span></button>
      </div>
    </ActionModal>
  )
}

const mapStatesToProps = ({ auth }) => {
  return {
    user: auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUser }, dispatch);
};

export default connect(mapStatesToProps, mapDispatchToProps)(EditProfileModal);