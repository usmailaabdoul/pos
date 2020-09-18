import React, { useState } from 'react';
import {ActionModal} from "../../Components";

import 'bootstrap/dist/css/bootstrap.min.css';
import './sales.css';

const Sales = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearchInput = () => {
    console.log('input');
  }

  return (
    <div className="d-flex container">
      <div className="" style={{ width: '70%' }}>
        <div className="row ml-0 my-3 band-header align-items-center">
          <div className="d-flex justify-content-end align-items-center">
            <div className="mr-3 ml-3"><span>Find or Scan item</span></div>
            <div className="">
              <input type="text" onChange={handleSearchInput} placeholder="search" name="searchInput" className={"form-control input"} />
            </div>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <div className="ml-2">
              <button className="btn btn-primary">Print</button>
            </div>
            <div className="ml-2">
              <button className="btn btn-primary">Photocopy</button>
            </div>
            <div className="ml-2">
              <button className="btn btn-primary">Spiral</button>
            </div>
            <div className="ml-2">
              <button className="btn btn-primary">Scan</button>
            </div>
          </div>
        </div>

        <div className="row ml-1">
          <table className="table table-striped">
            <thead className="items-table-header">
              <tr>
                <th className="text-center">Delete</th>
                <th className="text-center">Name</th>
                <th className="text-center">Price</th>
                <th className="text-center">Qty</th>
                <th className="text-center">Discount %</th>
                <th className="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="text-center text">1</td>
                <td className="text-center text" >Mark</td>
                <td className="text-center">
                  <input className={"items-table-input input text"} type="text" onChange={handleSearchInput} />
                </td>
                <td className="text-center">
                  <input className={"items-table-input input text"} type="text" onChange={handleSearchInput} />
                </td>
                <td className="text-center">
                  <input className={"items-table-input input text"} type="text" onChange={handleSearchInput} />
                </td>
                <td className="text-center amt-text" >20,000 XAF</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="items-side-bar my-3 ml-5 pb-4">
        <div className="mx-5 my-3">
          <input className={"form-control input"} placeholder="name" type="text" />
          <button className="btn btn-primary btn-block mt-2"><span className="h5">New Customer</span></button>
        </div>
        <div className="separator"></div>
        <div className="d-flex justify-content-between align-items-center mx-4">
          <div className="text">Total</div>
          <div className="amt-text">55,005 XAF</div>
        </div>
        <div className="d-flex justify-content-between align-items-center mx-4 my-2">
          <div className="text">Paid</div>
          <input className={"input rounded w-50 px-2"} type="text" placeholder="amount" />
        </div>
        <div className="d-flex justify-content-between align-items-center mx-4">
          <div className="text">Change</div>
          <div className="amt-text">3,000 XAF</div>
        </div>
        <div className="separator"></div>
        <div className="mx-4">
          <div className="text mb-2">Comments</div>
          <textarea className="input rounded w-100 text-sm-left" rows="5" cols="50" onChange={handleSearchInput}></textarea>
        </div>
        <div className="mx-4 my-1 d-flex justify-content-start align-items-center">
          <input className="mr-2" type="checkbox" aria-label="Checkbox for following text input"></input>
          <span className="text">Print reciept</span>
        </div>
        <div className="d-flex justify-content-end align-items-center mr-3 mt-4" >
          <button className="btn btn-danger mr-2"><span className="h5">Cancel</span></button>
          <button onClick={() => setIsModalVisible(true)} className="btn btn-success mr-2"><span className="h5">Complete</span></button>
        </div>
      </div>

      <ActionModal isVisible={isModalVisible} setIsVisible={() => setIsModalVisible(false)}>
        <div className="modal-body-text d-flex justify-content-center align-items-center h5">
          Are you sure you want to confirm this sale?
        </div>
        <div className="d-flex justify-content-center align-items-center mr-3 mt-4">
          <button className="btn btn-danger mr-2"><span className="h5 px-2">No</span></button>
          <button onClickBtn={() => setIsModalVisible(false)} className="btn btn-success mr-2"><span className="h5 px-2">Yes</span></button>
        </div>
      </ActionModal>
    </div>
  );
};

export default Sales;
