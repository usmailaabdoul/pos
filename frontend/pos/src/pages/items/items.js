import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactTable from "react-table-v6";
import { ActionModal } from "../../components";
import BackupIcon from "@material-ui/icons/Backup";
import Swal from "sweetalert2";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./items.css";

const data = [];
const newData = [];
for (let i = 0; i < 100; i++) {
  data.push({
    _id: i + 1,
    name: "red pen" + i,
    qty: 100,
    barcode: "11229983",
    category: "General",
    costPrice: 100,
    retailPrice: 200,
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
  });
}

export default function Items() {
  const [isEditItemModalVisible, setEditItemModalVisible] = useState(false);
  const [isNewItemModalVisible, setNewItemModalVisible] = useState(false);
  const [isImportModalVisible, setImportModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setItems(data);
    setFilteredItems(data);
  }, []);

  const editItem = (item) => {
    setSelectedItem(item);
    setEditItemModalVisible(true);
  };

  const deleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          `${item.name} was successfully deleted`,
          "success"
        );
      }
    });
  };

  const handleSearchInput = (e) => {
    if (!e) {
      setFilteredItems([...items]);
      return;
    }
    let searchString = e.target.value.toLowerCase();
    let tmp = items.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(searchString) >= 0 ||
        item.barcode.toLowerCase().indexOf(searchString) >= 0 ||
        item.retailPrice.toString().toLowerCase().indexOf(searchString) >= 0 ||
        item.costPrice.toString().toLowerCase().indexOf(searchString) >= 0
      );
    });
    setFilteredItems(tmp);
  };

  const handleNewItemClick = () => {
    setNewItemModalVisible(true);
  };

  const handleImportClick = () => {
    setImportModalVisible(true);
  };

  return (
    <div>
      <div className="container">
        <div className="ml-0 my-3 band-header align-items-center">
          <div className="d-flex justify-content-end align-items-center">
            <button className="btn btn-primary ml-3 mr-5">Bulk Delete</button>
            <div>
              <span className="mr-3">Filter</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="search"
                onChange={handleSearchInput}
                className="form-control"
              />
            </div>
            <div className="col d-flex justify-content-end align-items-center">
              <div className="ml-2">
                <button
                  className="btn btn-primary"
                  onClick={handleNewItemClick}
                >
                  <AddIcon style={{ position: "relative", bottom: "2" }} />
                  <span className="ml-3">New Item</span>
                </button>
              </div>
              <div className="ml-2">
                <button className="btn btn-primary" onClick={handleImportClick}>
                  <AttachFileIcon
                    style={{ position: "relative", bottom: "2" }}
                  />
                  <span className="ml-3">Import Excel</span>
                </button>
              </div>
              <div className="ml-2">
                <button className="btn btn-primary btn-sm">
                  <GetAppIcon style={{ position: "relative", bottom: "2" }} />
                  <span className="ml-3">Download sample</span>
                </button>
              </div>
              <div className="ml-2">
                <button className="btn btn-primary">
                  <BackupIcon style={{ position: "relative", bottom: "2" }} />
                  <span className="ml-3">Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <ReactTable
          showPagination={true}
          showPageSizeOptions={false}
          minRows={0}
          data={filteredItems}
          defaultPageSize={10}
          style={{ textAlign: "center" }}
          loadingText="Loading Products ..."
          noDataText="No products found"
          className="-highlight -striped rt-rows-height ReactTable"
          columns={[
            {
              Header: "",
              id: "row",
              maxWidth: 50,
              filterable: false,
              Cell: (row) => {
                return <div>{row.index + 1}</div>;
              },
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
              Header: "Actions",
              id: "actions",
              Cell: (item) => {
                return (
                  <div>
                    <span
                      onClick={() => editItem(item.original)}
                      className="mr-4 table-icons"
                    >
                      <EditIcon style={{ fontSize: 20 }} />
                    </span>
                    <span
                      onClick={() => deleteItem(item.original)}
                      className="table-icons"
                    >
                      <DeleteIcon style={{ fontSize: 20 }} />
                    </span>
                  </div>
                );
              },
            },
          ]}
        />
        {isNewItemModalVisible && (
          <NewItem
            setNewItemModalVisible={() => setNewItemModalVisible(false)}
            isNewItemModalVisible={isNewItemModalVisible}
          />
        )}
        {isEditItemModalVisible && (
          <EditItem
            setEditItemModalVisible={() => setEditItemModalVisible(false)}
            isEditItemModalVisible={isEditItemModalVisible}
            item={selectedItem}
          />
        )}
        {isImportModalVisible && (
          <ImportFile
            setImportModalVisible={() => setImportModalVisible(false)}
            isImportModalVisible={isImportModalVisible}
            item={selectedItem}
          />
        )}
      </div>
    </div>
  );
}

const ImportFile = (props) => {
  const { setImportModalVisible, isImportModalVisible } = props;
  const [rows, setRows] = useState([]);
  const [isloading, setLoading] = useState(false);

  const handleCancleClick = () => {
    setImportModalVisible(false);
  };

  const validateNumber = (n, field) => {
    n = Number(n);
    if (Number.isNaN(n)) {
      return `${field} is required to be a number`;
    }
  };

  const validateNegative = (n, field) => {
    n = Number(n);
    if (n < 0) {
      return `${field} is required to be postive`;
    }
  };

  const validateRequired = (n, field) => {
    if (!n) {
      return `${field} is required`;
    }
  };

  const validateRequiredNumberNegative = (n, field) => {
    let err = validateRequired(n, field);
    if (err) return err;
    err = validateNumber(n, field);
    if (err) return err;
    return validateNegative(n, field);
  };

  const validateName = (name) => {
    return validateRequired(name, "Name");
  };

  const validateQty = (qty) => {
    return validateRequiredNumberNegative(qty, "Quantity");
  };

  const validateBarcode = (barcode) => {
    return validateRequired(barcode, "Barcode");
  };

  const validateCategory = (category) => {
    return validateRequired(category, "Category");
  };

  const validateCostPrice = (cp) => {
    return validateRequiredNumberNegative(cp, "Costprice");
  };

  const validateRetailPrice = (rp) => {
    return validateRequiredNumberNegative(rp, "Retailprice");
  };

  function sleep(n) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve();
      }, n * 1000);
    });
  }

  const handleSuccessClick = async (e) => {
    if (rows.length == 0) {
      return;
    }

    setLoading(true);
    await sleep(2);
    // api to update name

    let message;
    for (let i = 0; i < rows.length; i++) {
      let itemObj = {};
      itemObj.name = rows[i][0];
      let err = validateName(itemObj.name);
      if (err) {
        message = `${err} at row ${i} column ${0}`;
        break;
      }

      itemObj.qty = rows[i][1];
      err = validateQty(itemObj.qty);
      if (err) {
        message = `${err} at row ${i} column ${1}`;
        break;
      }

      itemObj.barcode = rows[i][2];
      err = validateBarcode(itemObj.barcode);
      if (err) {
        message = `${err} at row ${i} column ${2}`;
        break;
      }

      itemObj.category = rows[i][3];
      err = validateName(itemObj.category);
      if (err) {
        message = `${err} at row ${i} column ${3}`;
        break;
      }

      itemObj.costPrice = rows[i][4];
      err = validateName(itemObj.costPrice);
      if (err) {
        message = `${err} at row ${i} column ${4}`;
        break;
      }

      itemObj.retailPrice = rows[i][5];
      err = validateName(itemObj.retailPrice);
      if (err) {
        message = `${err} at row ${i} column ${5}`;
        break;
      }

      newData.push(itemObj);
    }

    if (message) {
      Swal.fire("Failure", `${message}`, "error");
      setImportModalVisible(false);
      return;
    }
    data.push(...newData);
    Swal.fire("Created!", `data uploaded succesfully`, "success");
    setImportModalVisible(false);
  };

  const handleFile = (event) => {
    let fileObj = event.target.files[0];

    console.log(fileObj);
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        Swal.fire("Error", `${err}`, "Failure");
      } else {
        console.log(resp);
        setRows(resp.rows);
      }
    });
  };

  return (
    <ActionModal
      isVisible={isImportModalVisible}
      setIsVisible={() => setImportModalVisible(false)}
      title="New Item"
    >
      {isloading ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="mx-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <span className="w-25 text h6">Import File</span>
              </div>
              <input
                name="name"
                placeholder="name"
                // value={name}
                onChange={handleFile}
                type="file"
                className={"w-75"}
                accept=".xls, .xlt, .xml, .xlsx, .xlsm "
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 mx-5">
            <button
              onClick={() => handleCancleClick(false)}
              className="btn btn-danger mr-2"
            >
              <span className="h5 px-2">Cancel</span>
            </button>
            <button
              onClick={() => handleSuccessClick()}
              className="btn btn-success mr-2"
            >
              <span className="h5 px-2">Import</span>
            </button>
          </div>
        </>
      )}
    </ActionModal>
  );
};

const NewItem = (props) => {
  const { setNewItemModalVisible, isNewItemModalVisible } = props;
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleNameInput = (e) => setName(e.target.value);
  const handleBarcodeInput = (e) => setBarcode(e.target.value);
  const handleCostPriceInput = (e) => setCostPrice(e.target.value);
  const handleRetailPriceInput = (e) => setRetailPrice(e.target.value);
  const handleQuantityInput = (e) => setQuantity(e.target.value);
  const handleCategoryInput = (e) => setCategory(e.target.value);

  const handleCancleClick = () => {
    setNewItemModalVisible(false);
  };

  const handleSuccessClick = (e) => {
    // api to update name
    // handle error
    Swal.fire("Created!", `item: ${name} created successfully`, "success");
    setNewItemModalVisible(false);
  };

  return (
    <ActionModal
      isVisible={isNewItemModalVisible}
      setIsVisible={() => setNewItemModalVisible(false)}
      title="New Item"
    >
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Name</span>
          </div>
          <input
            name="name"
            placeholder="name"
            value={name}
            onChange={handleNameInput}
            type="text"
            className={"w-75 form-control input"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Category</span>
          </div>
          <input
            name="category"
            placeholder="General"
            value={category}
            onChange={handleCategoryInput}
            type="number"
            className={"w-75 form-control input"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Barcode</span>
          </div>
          <input
            name="barcode"
            placeholder="barcode"
            value={barcode}
            onChange={handleBarcodeInput}
            type="text"
            className={"w-75 form-control input"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Cost Price</span>
          </div>
          <div class="input-group-prepend w-15">
            <div class="input-group-text">FCFA</div>
          </div>
          <input
            name="costPrice"
            placeholder="0"
            value={costPrice}
            onChange={handleCostPriceInput}
            type="number"
            className={"form-control input text"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Retail Price</span>
          </div>
          <div class="input-group-prepend w-15">
            <div class="input-group-text">FCFA</div>
          </div>
          <input
            name="retailPrice"
            placeholder="retailPrice"
            value={retailPrice}
            onChange={handleRetailPriceInput}
            type="number"
            className={"form-control input text"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Quantity</span>
          </div>
          <input
            name="qty"
            placeholder="1"
            value={quantity}
            onChange={handleQuantityInput}
            type="number"
            className={"w-75 form-control input"}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4 mx-5">
        <button
          onClick={() => handleCancleClick(false)}
          className="btn btn-danger mr-2"
        >
          <span className="h5 px-2">Cancel</span>
        </button>
        <button
          onClick={() => handleSuccessClick(false)}
          className="btn btn-success mr-2"
        >
          <span className="h5 px-2">Save</span>
        </button>
      </div>
    </ActionModal>
  );
};

const EditItem = (props) => {
  const { setEditItemModalVisible, isEditItemModalVisible, item } = props;
  const [name, setName] = useState(item.name);
  const [barcode, setBarcode] = useState(item.barcode);
  const [costPrice, setCostPrice] = useState(item.costPrice);
  const [retailPrice, setRetailPrice] = useState(item.retailPrice);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.qty);

  const handleNameInput = (e) => setName(e.target.value);
  const handleBarcodeInput = (e) => setBarcode(e.target.value);
  const handleCostPriceInput = (e) => setCostPrice(e.target.value);
  const handleRetailPriceInput = (e) => setRetailPrice(e.target.value);
  const handleQuantityInput = (e) => setQuantity(e.target.value);
  const handleCategoryInput = (e) => setCategory(e.target.value);

  const handleCancleClick = () => {
    setEditItemModalVisible(false);
  };

  const handleSuccessClick = (e) => {
    // api to update name
    // handle error
    Swal.fire("Created!", `item: ${name} updated successfully`, "success");
    setEditItemModalVisible(false);
  };

  return (
    <ActionModal
      isVisible={isEditItemModalVisible}
      setIsVisible={() => setEditItemModalVisible(false)}
      title="Edit Item"
    >
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Name</span>
          </div>
          <input
            name="name"
            placeholder="name"
            value={name}
            onChange={handleNameInput}
            type="text"
            className={"w-75 form-control input"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Category</span>
          </div>
          <input
            name="category"
            placeholder="General"
            value={category}
            onChange={handleCategoryInput}
            type="number"
            className={"w-75 form-control input"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Barcode</span>
          </div>
          <input
            name="barcode"
            placeholder="barcode"
            value={barcode}
            onChange={handleBarcodeInput}
            type="text"
            className={"w-75 form-control input"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Cost Price</span>
          </div>
          <div class="input-group-prepend w-15">
            <div class="input-group-text">FCFA</div>
          </div>
          <input
            name="costPrice"
            placeholder="0"
            value={costPrice}
            onChange={handleCostPriceInput}
            type="number"
            className={"form-control input text"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Retail Price</span>
          </div>
          <div class="input-group-prepend w-15">
            <div class="input-group-text">FCFA</div>
          </div>
          <input
            name="retailPrice"
            placeholder="retailPrice"
            value={retailPrice}
            onChange={handleRetailPriceInput}
            type="number"
            className={"form-control input text"}
          />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="w-25 text h6">Quantity</span>
          </div>
          <input
            name="qty"
            placeholder="1"
            value={quantity}
            onChange={handleQuantityInput}
            type="number"
            className={"w-75 form-control input"}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4 mx-5">
        <button
          onClick={() => handleCancleClick(false)}
          className="btn btn-danger mr-2"
        >
          <span className="h5 px-2">Cancel</span>
        </button>
        <button
          onClick={() => handleSuccessClick(false)}
          className="btn btn-success mr-2"
        >
          <span className="h5 px-2">Save</span>
        </button>
      </div>
    </ActionModal>
  );
};
