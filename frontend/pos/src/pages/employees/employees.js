import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { ActionModal } from '../../components';
import Swal from 'sweetalert2'

import './employees.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  { id: 1, name: 'Mark', phoneNumber: '123456789', role: 'Manager' },
  { id: 2, name: 'Paul', phoneNumber: '123456999', role: 'Employee' },
  { id: 3, name: 'Peter', phoneNumber: '123455589', role: 'Cleaner' },
  { id: 4, name: 'Jack', phoneNumber: '123444489', role: 'Marketer' },
];

const Employees = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [employees, setEmployees] = useState(data)
  const [editModal, setEditModalVisible] = useState(false)
  const [selectionUser, setSelectionUser] = useState(null)

  useEffect(() => {}, [employees])

  const handleSearchInput = () => {
    console.log('input');
  }

  const handleNameInput = event => {
    setName(event.target.value)
  }

  const handlePhoneInput = event => {
    setPhone(event.target.value)
  }

  const handleRoleInput = event => {
    setRole(event.target.value)
  }

  const deleteAlert = (employee) => {
    let index = employees.findIndex((u) => u.id === employee.id);
    if (index >= 0) {
      employees.splice(index, 1);
    }
    
    Swal.fire(
      'Deleted!',
      `${employee.name} was successfully deleted`,
      'success'
    )
  }

  const editEmplyee = (employee) => {
    setSelectionUser(employee);
    setEditModalVisible(true);
  }

  return (
    <div className="container">
      <div className="row ml-0 my-3 d-flex justify-content-start align-items-center">
        <div className="w-50 d-flex justify-content-start align-items-center employees-header">
          <div className="mr-3 ml-3"><span className="h6">Name</span></div>
          <div className="w-50">
            <input type="text" onChange={handleSearchInput} placeholder="search" name="searchInput" className={"form-control input"} />
          </div>
        </div>
        <div className="">
          <button onClick={() => setIsModalVisible(true)} className="btn btn-primary btn-block mx-3"><PeopleAltIcon style={{ position: 'relative', bottom: '2' }} /><span className="h5 ml-3">New Employee</span></button>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <table className="table table-striped w-75">
          <thead className="items-table-header">
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Name</th>
              <th className="text-center">Phone Number</th>
              <th className="text-center">Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, key) => {
              return (
                <tr key={key} className="table-row">
                  <td className="text-center text">{employee.id}</td>
                  <td className="text-center text">{employee.name}</td>
                  <td className="text-center text">{employee.phoneNumber}</td>
                  <td className="text-center text">{employee.role}</td>
                  <td className="text-center">
                    <div>
                      <span onClick={() => editEmplyee(employee)} className="mr-4 table-icons"><Create style={{ fontSize: 20 }} /></span>
                      <span onClick={() => deleteAlert(employee)} className="table-icons"><DeleteIcon style={{ fontSize: 20 }} /></span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {
        editModal && (
          <EditEmplyee setEditModalVisible={() => setEditModalVisible(false)} editModal={editModal} user={selectionUser} />
        )
      }  

      <ActionModal isVisible={isModalVisible} setIsVisible={() => setIsModalVisible(false)} title="New Employee">
        <div className="mx-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div><span className="w-25 text h6">Name</span></div>
            <input name="username" placeholder="username" value={name} onChange={handleNameInput} type="text" className={"w-75 form-control input"} />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div><span className="text h6 w-25">Phone #</span></div>
            <input name="username" placeholder="username" value={phone} onChange={handlePhoneInput} type="text" className={"w-75 form-control input"} />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div><span className="text h6 w-25">Roles</span></div>
            <div className="d-flex justify-content-center align-items-center w-75">
              <input name="username" placeholder="username" value={role} onChange={handleRoleInput} type="text" className={"w-75 form-control input"} />
              <button className="btn btn-primary ml-3 px-5 w-25 text-center"><span className="h6">Add</span></button>
            </div>
          </div>

          <div className="row ml-1">
            <table className="table table-striped" style={{ height: '5px' }}>
              <thead className="items-table-header custom-table">
                <tr>
                  <th className="text-center">Delete</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody style={{ height: '10px' }}>
                <tr className="custom-table" style={{ height: '5px' }}>
                  <td className="text-center text">Armand</td>
                  <td onClick={() => console.log('hello')} className="text-center text trash-icon"><DeleteIcon style={{ fontSize: 20 }} /></td>
                </tr>
                <tr className="custom-table">
                  <td className="text-center text">Bill</td>
                  <td className="text-center text trash-icon"><DeleteIcon style={{ fontSize: 20 }} /></td>
                </tr>
                <tr className="custom-table">
                  <td className="text-center text">Abdoul</td>
                  <td className="text-center text trash-icon"><DeleteIcon style={{ fontSize: 20 }} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-4 mx-5">
          <button className="btn btn-danger mr-2"><span className="h5 px-2">Cancel</span></button>
          <button onClickBtn={() => setIsModalVisible(false)} className="btn btn-success mr-2"><span className="h5 px-2">Sumit</span></button>
        </div>
      </ActionModal>
    </div>
  )
}

export default Employees;

const EditEmplyee = (props) => {
  const {setEditModalVisible, editModal, user} = props;
  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [role, setRole] = useState(user.role);

  const handleNameInput = (event) => setName(event.target.value);
  const handlePhoneInput = (event) => setPhoneNumber(event.target.value);
  const handleRoleInput = (event) => setRole(event.target.value);

  return (
    <ActionModal isVisible={editModal} setIsVisible={() => setEditModalVisible(false)} title="New Employee">
        <div className="mx-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div><span className="w-25 text h6">Name</span></div>
            <input name="username" placeholder="username" value={name} onChange={handleNameInput} type="text" className={"w-75 form-control input"} />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div><span className="text h6 w-25">Phone #</span></div>
            <input name="username" placeholder="username" value={phoneNumber} onChange={handlePhoneInput} type="text" className={"w-75 form-control input"} />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div><span className="text h6 w-25">Roles</span></div>
            <div className="d-flex justify-content-center align-items-center w-75">
              <input name="username" placeholder="username" value={role} onChange={handleRoleInput} type="text" className={"w-75 form-control input"} />
              <button className="btn btn-primary ml-3 px-5 w-25 text-center"><span className="h6">Add</span></button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-4 mx-5">
          <button onClick={() => setEditModalVisible(false)} className="btn btn-danger mr-2"><span className="h5 px-2">Cancel</span></button>
          <button onClick={() => setEditModalVisible(false)} className="btn btn-success mr-2"><span className="h5 px-2">Save</span></button>
        </div>
      </ActionModal>
  )
}