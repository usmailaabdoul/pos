import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactTable from "react-table-v6";
import Navbar from "../../components/Navbar";
import { ActionModal } from "../../components";
import BackupIcon from "@material-ui/icons/Backup";
import Swal from "sweetalert2";
import { ExcelRenderer } from "react-excel-renderer";
import CircularProgress from "@material-ui/core/CircularProgress";
import apis from "../../apis/apis";
import ReactExport from "react-export-excel";
import { connect } from 'react-redux';
import { setItems } from '../../redux/actions/itemActions';
import { bindActionCreators } from 'redux'
import store from '../../store/index'
import "./items.css";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Items(props) {
    const { items } = props
    const [isEditItemModalVisible, setEditItemModalVisible] = useState(false);
    const [isNewItemModalVisible, setNewItemModalVisible] = useState(false);
    const [isImportModalVisible, setImportModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [_items, setItems] = useState(items);
    const [categories, setCategories] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isloading, setLoading] = useState(false);

    useEffect(() => {
        getItems();
        getCategory()
    }, []);

    useEffect(() => { }, [_items, filteredItems, props])

    const getItems = async () => {
        setLoading(true);

        try {
            let res = await apis.itemApi.items();

            setItems(res);
            props.setItems(res)
            setFilteredItems(res);

            setLoading(false);
        } catch (e) {
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "error",
                text: e.message,
            });
        }
    };

    const getCategory = async () => {
        setLoading(true);

        try {
            let res = await apis.categoryApi.categories();

            setCategories(res);
            console.log(categories);
        } catch (e) {
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "error",
                text: e.message,
            });
        }
    }

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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let res = await apis.itemApi.deleteItem(item._id);
                    getItems()

                    Swal.fire(
                        'Deleted!',
                        `${item.name} was successfully deleted`,
                        'success'
                    )
                } catch (e) {
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                        text: 'Something unexpected happened'
                    })
                }
            }
        });
    };

    let nonRetiredItems = filteredItems.filter((item) => !item.isRetired);

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
            <Navbar />
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

                                <ExcelFile element={<button className="btn btn-primary">
                                    <BackupIcon style={{ position: "relative", bottom: "2" }} />
                                    <span className="ml-3">Export</span>
                                </button>}>
                                    <ExcelSheet data={_items} name="Items">
                                        <ExcelColumn label="Name" value="name" />
                                        <ExcelColumn label="Quantity" value="qty" />
                                        <ExcelColumn label="Barcode" value="barcode" />
                                        <ExcelColumn label="Category" value="category" />
                                        <ExcelColumn label="Cost Price" value="costPrice" />
                                        <ExcelColumn label="Retail Price" value="retailPrice" />
                                    </ExcelSheet>
                                </ExcelFile>
                            </div>
                        </div>
                    </div>
                </div>

                <ReactTable
                    showPagination={true}
                    showPageSizeOptions={false}
                    minRows={0}
                    data={nonRetiredItems}
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
                        categories={categories}
                        getItems={() => getItems()}
                    />
                )}
                {isEditItemModalVisible && (
                    <EditItem
                        setEditItemModalVisible={() => setEditItemModalVisible(false)}
                        isEditItemModalVisible={isEditItemModalVisible}
                        getItems={() => getItems()}
                        categories={categories}
                        item={selectedItem}
                    />
                )}
                {isImportModalVisible && (
                    <ImportFile
                        setImportModalVisible={() => setImportModalVisible(false)}
                        isImportModalVisible={isImportModalVisible}
                        getItems={() => getItems()}
                        item={selectedItem}
                    />
                )}
            </div>
        </div>
    );
}

const ImportFile = (props) => {
    const { setImportModalVisible, isImportModalVisible, getItems } = props;
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

    const validateName = (name) => {
        return validateRequired(name, "Name");
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

    const validateNegative = (n, field) => {
        n = Number(n);
        if (n < 0) {
            return `${field} is required to be postive`;
        }
    };

    const validateQty = (qty) => {
        return validateRequiredNumberNegative(qty, "Quantity");
    };

    const validateBarcode = (barcode) => {
        return validateRequired(barcode, "Barcode");
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

            try {

                let Quantity;
                let CostPrice = Number(itemObj.costPrice)
                let RetailPrice = Number(itemObj.retailPrice)
                let barcode = itemObj.barcode.toString()
                if (itemObj.qty) {
                    Quantity = Number(itemObj.qty)
                }
                let res = await apis.itemApi.addItem({
                    "name": itemObj.name,
                    "qty": Quantity,
                    "barcode": barcode,
                    "category": itemObj.category,
                    "costPrice": CostPrice,
                    "retailPrice": RetailPrice,
                    "isRetired": false
                });
                Swal.fire(
                    "Created!",
                    `Item: ${res.name} created successfully`,
                    "success"
                );
                getItems()
                setImportModalVisible(false)
            } catch (e) {
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "error",
                    text: e.message,
                });
            }

        }

        if (message) {
            Swal.fire("Failure", `${message}`, "error");
            setImportModalVisible(false);
            return;
        }
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

}


const NewItem = (props) => {
    const { setNewItemModalVisible, isNewItemModalVisible, getItems } = props;
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

    const validateNumber = (n, field) => {
        n = Number(n);
        if (Number.isNaN(n)) {
            return `${field} is required`;
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

    const validateCostPrice = (cp) => {
        return validateRequiredNumberNegative(cp, "Costprice");
    };

    const validateRetailPrice = (rp) => {
        return validateRequiredNumberNegative(rp, "Retailprice");
    };

    const validateQty = (qt, field) => {
        if (qt) {
            qt = Number(qt);
            if (qt < 0) {
                return `${field} is required to be postive`;
            }
        }
    }


    const handleSuccessClick = async () => {
        let message;
        let err = validateName(name);
        if (err) {
            message = `${err}`;
        }

        err = validateQty(quantity, "Quantity");
        if (err) {
            message = `${err} `;
        }

        err = validateCostPrice(costPrice);
        if (err) {
            message = `${err}`;
        }

        err = validateRetailPrice(retailPrice);
        if (err) {
            message = `${err} `;
        }

        if (message) {
            Swal.fire("Failure", `${message}`, "error");
            setNewItemModalVisible(false);
            return;
        }

        // handle error
        try {

            let Quantity;
            let CostPrice = Number(costPrice)
            let RetailPrice = Number(retailPrice)

            if (quantity) {
                Quantity = Number(quantity)
            }
            let res = await apis.itemApi.addItem({
                "name": name,
                "qty": Quantity,
                "barcode": barcode,
                "category": category,
                "costPrice": CostPrice,
                "retailPrice": RetailPrice,
                "isRetired": false
            });
            Swal.fire(
                "Created!",
                `Item: ${res.name} created successfully`,
                "success"
            );
            getItems()
            setNewItemModalVisible(false);
        } catch (e) {
            console.log(e);
            Swal.fire({
                icon: "error",
                title: "error",
                text: e.message,
            });
        }
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
                    <div class="categorySelect mb-3 w-75">
                        <select class="custom-select  " id="category" onChange={handleCategoryInput}>
                            {props.categories.map((Category) =>
                                <option value={category}>{Category.name}</option>
                            )}
                        </select>
                    </div>
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
                    onClick={() => handleSuccessClick()}
                    className="btn btn-success mr-2"
                >
                    <span className="h5 px-2">Save</span>
                </button>
            </div>
        </ActionModal >
    );
};

const EditItem = (props) => {
    const { setEditItemModalVisible, isEditItemModalVisible, item, getItems } = props;
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

    const validateNumber = (n, field) => {
        n = Number(n);
        if (Number.isNaN(n)) {
            return `${field} is required`;
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

    const validateCostPrice = (cp) => {
        return validateRequiredNumberNegative(cp, "Costprice");
    };

    const validateRetailPrice = (rp) => {
        return validateRequiredNumberNegative(rp, "Retailprice");
    };

    const validateQty = (qt, field) => {
        if (qt) {
            qt = Number(qt);
            if (qt < 0) {
                return `${field} is required to be postive`;
            }
        }
    }

    const handleSuccessClick = async (e) => {
        let message;
        let err = validateName(name);
        if (err) {
            message = `${err}`;
        }

        err = validateQty(quantity, "Quantity");
        if (err) {
            message = `${err} `;
        }

        err = validateCostPrice(costPrice);
        if (err) {
            message = `${err}`;
        }

        err = validateRetailPrice(retailPrice);
        if (err) {
            message = `${err} `;
        }

        if (message) {
            Swal.fire("Failure", `${message}`, "error");
            setEditItemModalVisible(false);
            return;
        }

        // handle error
        try {

            let qtty;
            let costprice = Number(costPrice)
            let retailprice = Number(retailPrice)

            if (quantity) {
                qtty = Number(quantity)
            }
            let res = await apis.itemApi.editItem(item._id, {
                "name": name,
                "qty": qtty,
                "barcode": barcode,
                "category": category,
                "costPrice": costprice,
                "retailPrice": retailprice,
                "isRetired": false
            });

            getItems()
            Swal.fire(
                "Updated!",
                `Item: ${res.name} created successfully`,
                "success"
            );
            setEditItemModalVisible(false);
        } catch (e) {
            console.log(e);
            Swal.fire({
                icon: "error",
                title: "error",
                text: e.message,
            });
        }
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
                    <div class="categorySelect mb-3 w-75">
                        <select class="custom-select  " id="category" onChange={handleCategoryInput}>
                            {props.categories.map((Category) =>
                                <option value={category}>{Category.name}</option>
                            )}
                        </select>
                    </div>
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

const mapStateToProps = ({ item }) => {
    return {
        items: item.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setItems }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
