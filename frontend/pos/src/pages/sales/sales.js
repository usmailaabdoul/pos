import React, { useState, useEffect } from 'react';
import {ActionModal} from "../../components";
import Print from "@material-ui/icons/Print";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import DeleteIcon from '@material-ui/icons/Delete';
import { Form } from 'react-bootstrap';
import apis from "../../apis/apis";
import Swal from "sweetalert2";
import { Typeahead } from 'react-bootstrap-typeahead';

import 'bootstrap/dist/css/bootstrap.min.css';
import './sales.css';

const Sales = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [items, setItems] = useState([]);
  const [selectItem] = useState([]);
  const [products, setProducts] = useState([])

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      let res = await apis.itemApi.items();
      console.log(res);
      setItems(res);
  } catch (e) {
      Swal.fire({
          icon: "error",
          title: "error",
          text: e.message,
      });
  }
  }

  const handleSearchInput = (e) => {
    let _product = products;
    let _items = [...items];
    let newProduct = _items.find((d) => d._id === e[0]._id);

    newProduct.retailPrice = 0;
    newProduct.discount = 0;
    newProduct.qty = 1;
    newProduct.total = 0;

    _product.push(newProduct);

    setProducts([..._product]);
  }

  const handlePriceInput = (e, id) => {

    let index = products.findIndex(p => p._id === id);
    if (index > -1) {
      products[index].retailPrice = +e.target.value;
      let discount = products[index].discount;
      
      if (discount !== 0) {
        let total = +e.target.value * products[index].qty * discount;
        products[index].total = total;
      } else {
        let total = +e.target.value * products[index].qty;
        products[index].total = total;
      }
      
    };

    setPrice(e.target.value)
  }

  const handleQuantityInput = (e, id) => {

    let index = products.findIndex(p => p._id === id);
    if (index > -1) {
      products[index].qty = +e.target.value;
      let discount = products[index].discount;

      if (discount !== 0) {
        let total = +e.target.value * products[index].retailPrice * discount;
        products[index].total = total;
      } else {
        let total = +e.target.value * products[index].retailPrice;
        products[index].total = total;
      }
    };

    setQuantity(e.target.value)
  }

  const handleDiscountInput = (e, id) => {

    let index = products.findIndex(p => p._id === id);

    if (index > -1) {
      products[index].discount = +e.target.value;

      let price = products[index].retailPrice;
      let discount = +e.target.value;
      let qty = products[index].qty;

      if (discount <= price) {
        let total = (price * qty) - discount;
        products[index].total = total;
      }
  }

    setDiscount(e.target.value)
  }

  const deleteItem = (id) => {
    let index = products.findIndex(p => p._id === id);

    if (index > -1) {
      products.splice(index, 1);
    }

    setProducts([...products]);
  }

  return (
    <div>
    <div className="d-flex container">
      <div className="" style={{ width: '70%' }}>
        <div className="row ml-0 my-3 band-header align-items-center">
          <div className="d-flex justify-content-end align-items-center w-50">
            <div className="mr-3 ml-3"><span>Find or Scan item</span></div>
            <div className="" style={{flex: 1}}>
              <Form.Group  className="m-0">
                <Typeahead
                  labelKey="name"
                  onChange={handleSearchInput}
                  options={items}
                  placeholder="Search or select items"
                  selected={selectItem}
                />
              </Form.Group>
            </div>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
              <button className="btn btn-primary ml-2"><span className="mr-2"><Print style={{fontSize: 20}}/></span>Print</button>
              <button className="btn btn-primary ml-2"><span className="mr-2"><Print style={{fontSize: 20}}/></span>Photocopy</button>
              <button className="btn btn-primary ml-2"><span className="mr-2"><Print style={{fontSize: 20}}/></span>Spiral</button>
              <button className="btn btn-primary ml-2"><span className="mr-2"><Print style={{fontSize: 20}}/></span>Scan</button>
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
                <th className="text-center">Discount</th>
                <th className="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {
                products && products.map((product, key) => {
                  return (
                    <tr key={key} className="table-row">
                      <td onClick={() => deleteItem(product._id)} className="text-center text trash-icon"><DeleteIcon style={{fontSize: 20}} /></td>
                      <td className="text-center text" >{product.name}</td>
                      <td className="text-center">
                        <span className="mr-2">{product.minRetailPrice}</span>
                          <input className={"items-table-input input text"} value={product.retailPrice} min="1" max="5" type="number" onChange={(e) => handlePriceInput(e, product._id)} />
                        <span className="ml-2">{product.maxRetailPrice}</span>
                      </td>
                      <td className="text-center">
                        <input className={"items-table-input input text"} value={product.qty} min="1" type="number" onChange={(e) => handleQuantityInput(e, product._id)} />
                      </td>
                      <td className="text-center">
                        <input className={"items-table-input input text"} value={product.discount} min="0" type="number" onChange={(e) => handleDiscountInput(e, product._id)} />
                      </td>
                      <td className="text-center amt-text" >{product.total} XAF</td>
                    </tr>
                  )})
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="items-side-bar my-3 ml-5 pb-4">
        <div className="mx-5 my-3">
          <input className={"form-control input"} placeholder="name" type="text" />
          <button className="btn btn-primary btn-block mt-2"><PeopleAltIcon style={{position: 'relative', bottom: '2'}}/><span className="h5 ml-2">New Customer</span></button>
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

      <ActionModal isVisible={isModalVisible} setIsVisible={() => setIsModalVisible(false)} title="Confirm">
        <div className="modal-body-text d-flex justify-content-center align-items-center h5">
          Are you sure you want to confirm this sale?
        </div>
        <div className="d-flex justify-content-center align-items-center mr-3 mt-4">
          <button className="btn btn-danger mr-2"><span className="h5 px-2">No</span></button>
          <button onClickBtn={() => setIsModalVisible(false)} className="btn btn-success mr-2"><span className="h5 px-2">Yes</span></button>
        </div>
      </ActionModal>
    </div>
    </div>
  );
};

export default Sales;
