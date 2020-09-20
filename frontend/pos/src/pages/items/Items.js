import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactTable from 'react-table-v6'
import Navbar from "../../components/Navbar";
import { ActionModal } from '../../components';
import Swal from 'sweetalert2'

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

const data = [
]
for (let i = 0; i < 100; i++) {
  data.push({ _id: i + 1, name: 'red pen' + i, qty: 100, barcode: '11229983', category: 'General', costPrice: 100, retailPrice: 200, created_at: new Date().toDateString(), updated_at: new Date().toDateString() },
  )
}

export default function Items() {
  const [isEditItemModalVisible, setEditItemModalVisible] = useState(false);
  const [isNewItemModalVisible, setNewItemModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);



  useEffect(() => {
    setItems(data)
    setFilteredItems(data)
  }, [])

  const editItem = (item) => {
    setSelectedItem(item)
    setEditItemModalVisible(true)
  }

  const deleteItem = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          `${item.name} was successfully deleted`,
          'success'
        )
      }
    })
  }


  const handleSearchInput = e => {
    if (!e) {
      setFilteredItems([...items])
      return
    }
    let searchString = e.target.value.toLowerCase()
    let tmp = items.filter(item => {
      return item.name.toLowerCase().indexOf(searchString) >= 0 ||
        item.barcode.toLowerCase().indexOf(searchString) >= 0 ||
        item.retailPrice.toString().toLowerCase().indexOf(searchString) >= 0 ||
        item.costPrice.toString().toLowerCase().indexOf(searchString) >= 0
    })
    setFilteredItems(tmp)
  }

  const handleNewItemClick = () => {
    setNewItemModalVisible(true)
  }


  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="ml-0 my-3 band-header align-items-center">
          <div className="d-flex justify-content-end align-items-center">
            <button className="btn btn-primary ml-3 mr-5">Bulk Delete</button>
            <div>
              <span className="mr-3">Filter</span>
            </div>
            <div>
              <input type="text" placeholder="search" onChange={handleSearchInput} className="form-control" />
            </div>
            <div className="col d-flex justify-content-end align-items-center">
              <div className="ml-2">
                <button className="btn btn-primary" onClick={handleNewItemClick}>New Item</button>
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

        <ReactTable
          showPagination={true}
          showPageSizeOptions={false}
          minRows={0}
          data={data}
          defaultPageSize={10}
          style={{
          }}
          loadingText='Loading Products ...'
          noDataText='No products found'
          className="-highlight -striped rt-rows-height ReactTable"
          columns={[
            {
              Header: "",
              id: "row",
              maxWidth: 50,
              filterable: false,
              Cell: (row) => {
                return <div>{row.index + 1}</div>;
              }
            },
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "Quantity",
              accessor: "qty",
            },
            {
              Header: "Barcode",
              accessor: "barcode",
            },
            {
              Header: "Category",
              accessor: "category",
            },
            {
              Header: "Cost Price",
              accessor: "costPrice",
            },
            {
              Header: "Retail Price",
              accessor: "retailPrice",
            },
            {
              Header: 'Actions',
              id: "actions",
              Cell: item => {
                return (
                  <div>
                    <span onClick={() => editItem(item.original)} className="mr-4 table-icons"><EditIcon style={{ fontSize: 20 }} /></span>
                    <span onClick={() => deleteItem(item.original)} className="table-icons"><DeleteIcon style={{ fontSize: 20 }} /></span>
                  </div>
                )
              }
            }
          ]}
        />
        {isNewItemModalVisible && (
          <NewItem setNewItemModalVisible={() => setNewItemModalVisible(false)} isNewItemModalVisible={isNewItemModalVisible}/>
        )}
                {isEditItemModalVisible && (
          <EditItem setEditItemModalVisible={() => setEditItemModalVisible(false)} isEditItemModalVisible={isEditItemModalVisible} item={selectedItem}/>
        )}
      </div>
    </div>
  );
}


const NewItem = (props) => {
  const { setNewItemModalVisible, isNewItemModalVisible } = props;
  const [name, setName] = useState('')
  const [barcode, setBarcode] = useState('')
  const [costPrice, setCostPrice] = useState(0)
  const [retailPrice, setRetailPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleNameInput = (e) => setName(e.target.value)
  const handleBarcodeInput = (e) => setBarcode(e.target.value)
  const handleCostPriceInput = (e) => setCostPrice(e.target.value)
  const handleRetailPriceInput = (e) => setRetailPrice(e.target.value)
  const handleQuantityInput = (e) => setQuantity(e.target.value)
  const handleCategoryInput = (e) => setCategory(e.target.value)


  const handleCancleClick = () => {
    setNewItemModalVisible(false)
  }

  const handleSuccessClick = (e) => {
    // api to update name
    // handle error
    Swal.fire(
      'Created!',
      `item: ${name} created successfully`,
      'success'
    )
    setNewItemModalVisible(false)
  }

  return (
    <ActionModal
      isVisible={isNewItemModalVisible}
      setIsVisible={() => setNewItemModalVisible(false)}
      title="Edit Category">
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Name</span></div>
          <input name="name" placeholder="name" value={name} onChange={handleNameInput} type="text" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Category</span></div>
          <input name="category" placeholder="General" value={category} onChange={handleCategoryInput} type="number" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Barcode</span></div>
          <input name="barcode" placeholder="barcode" value={barcode} onChange={handleBarcodeInput} type="text" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Cost Price</span></div>
         <div class="input-group-prepend w-15">
          <div class="input-group-text">FCFA</div>
        </div>
          <input name="costPrice" placeholder="0" value={costPrice} onChange={handleCostPriceInput} type="number" className={"form-control input text"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Retail Price</span></div>
         <div class="input-group-prepend w-15">
          <div class="input-group-text">FCFA</div>
        </div>
          <input name="retailPrice" placeholder="retailPrice" value={retailPrice} onChange={handleRetailPriceInput} type="number" className={"form-control input text"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Quantity</span></div>
          <input name="qty" placeholder="1" value={quantity} onChange={handleQuantityInput} type="number" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4 mx-5">
        <button onClick={() => handleCancleClick(false)} className="btn btn-danger mr-2"><span
          className="h5 px-2">Cancel</span></button>
        <button onClick={() => handleSuccessClick(false)} className="btn btn-success mr-2"><span
          className="h5 px-2">Save</span></button>
      </div>
    </ActionModal>
  )
}


const EditItem = (props) => {
  const { setEditItemModalVisible, isEditItemModalVisible, item } = props;
  const [name, setName] = useState(item.name)
  const [barcode, setBarcode] = useState(item.barcode)
  const [costPrice, setCostPrice] = useState(item.costPrice)
  const [retailPrice, setRetailPrice] = useState(item.retailPrice)
  const [category, setCategory] = useState(item.category)
  const [quantity, setQuantity] = useState(item.qty)

  const handleNameInput = (e) => setName(e.target.value)
  const handleBarcodeInput = (e) => setBarcode(e.target.value)
  const handleCostPriceInput = (e) => setCostPrice(e.target.value)
  const handleRetailPriceInput = (e) => setRetailPrice(e.target.value)
  const handleQuantityInput = (e) => setQuantity(e.target.value)
  const handleCategoryInput = (e) => setCategory(e.target.value)


  const handleCancleClick = () => {
    setEditItemModalVisible(false)
  }

  const handleSuccessClick = (e) => {
    // api to update name
    // handle error
    Swal.fire(
      'Created!',
      `item: ${name} updated successfully`,
      'success'
    )
    setEditItemModalVisible(false)
  }

  return (
    <ActionModal
      isVisible={isEditItemModalVisible}
      setIsVisible={() => setEditItemModalVisible(false)}
      title="Edit Category">
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Name</span></div>
          <input name="name" placeholder="name" value={name} onChange={handleNameInput} type="text" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Category</span></div>
          <input name="category" placeholder="General" value={category} onChange={handleCategoryInput} type="number" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Barcode</span></div>
          <input name="barcode" placeholder="barcode" value={barcode} onChange={handleBarcodeInput} type="text" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Cost Price</span></div>
         <div class="input-group-prepend w-15">
          <div class="input-group-text">FCFA</div>
        </div>
          <input name="costPrice" placeholder="0" value={costPrice} onChange={handleCostPriceInput} type="number" className={"form-control input text"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Retail Price</span></div>
         <div class="input-group-prepend w-15">
          <div class="input-group-text">FCFA</div>
        </div>
          <input name="retailPrice" placeholder="retailPrice" value={retailPrice} onChange={handleRetailPriceInput} type="number" className={"form-control input text"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Quantity</span></div>
          <input name="qty" placeholder="1" value={quantity} onChange={handleQuantityInput} type="number" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4 mx-5">
        <button onClick={() => handleCancleClick(false)} className="btn btn-danger mr-2"><span
          className="h5 px-2">Cancel</span></button>
        <button onClick={() => handleSuccessClick(false)} className="btn btn-success mr-2"><span
          className="h5 px-2">Save</span></button>
      </div>
    </ActionModal>
  )
}