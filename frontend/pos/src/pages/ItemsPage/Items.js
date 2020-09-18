import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Button from "../../Components/Button";
import Tables from "../../Components/Table";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import "./Items.css";

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
    <div className="items">
      <div className="items__top">
        <div className="items__topLeft">
          <Button title="Bulk Delete" />
          <div className="form__field">
            <p>Search Items</p>
            <form>
              <input type="text" placeholder="Name, Category, Barcode" />
            </form>
          </div>
        </div>
        <div className="items__topRight">
          <Button title="New Item" onClick={handleOpen} />
          <Button title="Import Excel" />
          <Button title="Export" />
        </div>
      </div>

      <div className="items__table">
        <Tables />
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal__container">
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
                <label for="name">Item Name</label>
                <input type="text" name="name" required />
              </div>
              <div className="modal__formControl">
                <label for="category">Category</label>
                <input type="text" name="category" required />
              </div>
              <div className="modal__formControl">
                <label for="image">Image</label>
                <input type="text" name="image" placeholder="Select Image" />
              </div>
              <div className="modal__formControl">
                <label for="name">Cost Price</label>
                <input type="text" name="cp" placeholder="0.00" />
              </div>
              <div className="modal__formControl">
                <label for="name">Retail</label>
                <input type="text" name="retail" placeholder="0.00" />
              </div>
            </form>
            <div className="modal__Action">
              <button className="modal__buttonCancel" onClick={handleClose}>
                Cancel
              </button>
              <button className="modal__buttonAdd">Add</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
