import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";
import CloseIcon from "@material-ui/icons/Close";
import "./Items.css";
import ItemsTable from "./ItemsTable";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Items() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    console.log("the modal should open");
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="container">
      <div className="ml-0 my-3 band-header align-items-center">
        <div className="d-flex justify-content-end align-items-center">
          <button className="btn btn-primary ml-3 mr-5">Bulk Delete</button>
          <div>
            <span className="mr-3">Filter</span>
          </div>
          <div>
            <input type="text" className="form-control"/>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <div className="ml-2">
              <button className="btn btn-primary">New Item</button>
            </div>
            <div className="ml-2">
              <button className="btn btn-primary">Import Excel</button>
            </div>
            <div className="ml-2">
              <button className="btn btn-primary">Export</button>
            </div>
          </div>
        </div>
      </div>

      <ItemsTable/>

      <Modal
        isOpen={openModal}
        onRequestClose={handleClose}
        contentLabel="Example Modal"
        className="modal__container"
      >
        <div className="modal__head">
          <p>New Item</p>
          <CloseIcon onClick={handleClose} />
        </div>
        <div className="modal__body">
          <form className="modal_form">
            <div className="modal__formControl">
              <label for="barcode">Bar Code</label>
              <input type="text" name="barcode" />
            </div>
            <div className="modal__formControl">
              <label for="name">
                Item Name
                <span style={{ color: "red", margin: ".1rem" }}>*</span>
              </label>
              <input type="text" name="name" required />
            </div>
            <div className="modal__formControl">
              <label for="category" required>
                Category
                <span style={{ color: "red", margin: ".1rem" }}>*</span>
              </label>
              <select class="custom-select" id="category" required>
                <option selected>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="modal__formControl">
              <label for="name">
                Cost Price
                <span style={{ color: "red", margin: ".1rem" }}>*</span>
              </label>
              <input type="text" name="cp" placeholder="0.00" />
            </div>
            <div className="modal__formControl">
              <label for="name">Retail Price</label>
              <input type="text" name="retail" placeholder="0.00" />
            </div>
          </form>
          <div className="modal__Action">
            <button class="btn btn-danger" onClick={handleClose}>
              Cancel
            </button>
            <button class="btn btn-success" type="submit">
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
