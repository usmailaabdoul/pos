import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tables from "../../Components/Table/Table";
import Modal from "react-modal";
import CloseIcon from "@material-ui/icons/Close";
import "./Items.css";

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
    <div className="items container">
      <div className="items__top">
        <div className="items__topLeft">
          <button class="btn btn-primary custom" type="submit">
            Bulk Delete
          </button>

          <div className="form__field">
            <p>Search Items</p>
            <form>
              <input type="text" placeholder="Name, Category, Barcode" />
            </form>
          </div>
        </div>
        <div className="items__topRight">
          <button
            class="btn btn-primary"
            color=""
            type="submit"
            onClick={handleOpen}
          >
            New Item
          </button>
          <button class="btn btn-primary" type="submit" onClick={handleOpen}>
            Import Excel
          </button>
          <button class="btn btn-primary" type="submit" onClick={handleOpen}>
            Export
          </button>
        </div>
      </div>

      <div className="items__table">
        <Tables />
      </div>

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
