import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2'
import { ActionModal } from '../../components';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReactTable from 'react-table-v6'

import "./customers.css";

const data = []
for (let i = 0; i < 50; i++) {
  data.push({ id: i + 1, name: 'Mary Johnson ' + i, phoneNumber: '679883344', lastTransaction: new Date().toDateString(), debt: i % 4 === 0 ? 100 : 0 })
}

const data2 = []
for (let i = 0; i < 5; i++) {
  data2.push({ id: i + 1, date: new Date().toDateString(), total: i + 1000 })
}

const data3 = {
  total: 9000,
  date: new Date(),
  balance: 1000,
  paid: 10000,
  cashier: 'Silvia Ann',
  basketDetails: [
    { id: 1, name: 'red pen', qty: 4, price: 200, total: 800, discountPer: 0 },
    { id: 2, name: 'school bag', qty: 1, price: 8000, total: 8000, discountPer: 0 },
    { id: 3, name: 'ruler', qty: 1, price: 300, total: 300, discountPer: 0 }
  ]
}

export default function CustomersPage() {

  const [isNewCustomerModalVisible, setNewCustomerModalVisible] = useState(false)
  const [isEditCustomerModalVisible, setEditCustomerModalVisible] = useState(false)
  const [isPayDebtModalVisible, setPayDebtModalVisibile] = useState(false)
  const [isBasketDetailModalVisible, setBasketDetailModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilterdCustomers] = useState([])
  const [transactions, setTransactions] = useState([])
  const [basket, setBasket] = useState(null)


  useEffect(() => {
    setCustomers(data)
    setFilterdCustomers(data)
  }, [])

  const handleSearchInput = e => {
    if (!e) {
      setFilterdCustomers([...customers])
      return
    }
    let searchString = e.target.value.toLowerCase()
    let tmp = customers.filter(customer => {
      return customer.name.toLowerCase().indexOf(searchString) >= 0
    })
    setFilterdCustomers(tmp)
  }

  const editCustomer = (customer) => {
    setSelectedCustomer(customer);
    setEditCustomerModalVisible(true);
  }

  const viewTransactions = (customer) => {
    setSelectedCustomer(customer)
    setTransactions(data2)
  }

  const viewBasketDetail = () => {
    setBasket(data3)
    setBasketDetailModalVisible(true)
  }

  const payDebt = (customer) => {
    setSelectedCustomer(customer)
    setPayDebtModalVisibile(true)
  }

  return (
    <div>
      <Navbar />
      <div className="my-container-sm">
        <div className="row">
          <div className="col-md-7">
            <div className="row ml-0 my-3 d-flex justify-content-start align-items-center">
              <div className="w-50 d-flex justify-content-start align-items-center employees-header">
                <div className="mr-3 ml-3"><span className="h6">Name</span></div>
                <div className="w-50">
                  <input type="text" onChange={handleSearchInput} placeholder="search" name="search"
                    className={"form-control input"} />
                </div>
              </div>
              <div className="">
                <button onClick={() => setNewCustomerModalVisible(true)} className="btn btn-primary btn-block mx-3">
                  <AddIcon style={{ position: 'relative', bottom: '2' }} /><span className="h5 ml-3">New Customer</span>
                </button>
              </div>
            </div>

            <ReactTable
              showPagination={true}
              showPageSizeOptions={false}
              minRows={0}
              data={filteredCustomers}
              defaultPageSize={10}
              style={{
                // height: "45vh" // This will force the table body to overflow and scroll, since there is not enough room
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
                  headerStyle: { textAlign: 'left' }

                },
                {
                  Header: "Phone",
                  accessor: "phoneNumber",
                  headerStyle: { textAlign: 'left' }
                },
                {
                  Header: "Last Transaction",
                  accessor: "lastTransaction",
                  headerStyle: { textAlign: 'left' }
                },
                {
                  Header: "Debt (XAF)",
                  id: "debt",
                  headerStyle: { textAlign: 'left' },
                  maxWidth: 150,
                  Cell: customer => {
                    return (
                      <div>
                        <span>{customer.original.debt}</span>
                        {customer.original.debt > 0 && (<button onClick={() => payDebt(customer.original)} className="btn btn-success btn-sm ml-2">pay</button>)}
                      </div>
                    )
                  }
                },
                {
                  Header: '',
                  maxWidth: 100,
                  id: "actions",
                  Cell: customer => {
                    return (
                      <div>
                        <span onClick={() => viewTransactions(customer.original)} className="mr-4 table-icons"><VisibilityIcon style={{ fontSize: 20 }} /></span>
                        <span onClick={() => editCustomer(customer.original)} className="mr-4 table-icons"><EditIcon style={{ fontSize: 20 }} /></span>
                      </div>
                    )
                  }
                }
              ]}
            />
            {isNewCustomerModalVisible && (
              <NewCustomer setNewCustomerModalVisible={() => setNewCustomerModalVisible(false)} isNewCustomerModalVisible={isNewCustomerModalVisible} />
            )}
            {isEditCustomerModalVisible && (
              <EditCustomer setEditCustomerModalVisible={() => setEditCustomerModalVisible(false)} isEditCustomerModalVisible={isEditCustomerModalVisible} customer={selectedCustomer} />
            )}
            {isPayDebtModalVisible && (
              <PayDebt setPayDebtModalVisibile={() => setPayDebtModalVisibile(false)} isPayDebtModalVisible={isPayDebtModalVisible} customer={selectedCustomer} />
            )}
            {isBasketDetailModalVisible && (
              <BasketDetail setBasketDetailModalVisible={() => setBasketDetailModalVisible(false)} isBasketDetailModalVisible={isBasketDetailModalVisible} basket={basket} />
            )}
          </div>
          <div className="col-md-5">
            <div className="pd">
              {!selectedCustomer && (<span>Transactions for selected customer will show here</span>)}
              {selectedCustomer && (<span>Transactions for: {selectedCustomer.name} </span>)}

              <ReactTable
                showPagination={true}
                showPageSizeOptions={false}
                minRows={0}
                data={transactions}
                defaultPageSize={10}
                style={{
                  // height: "45vh" // This will force the table body to overflow and scroll, since there is not enough room
                }}
                loadingText='Loading transactions ...'
                noDataText='No transactions found'
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
                    Header: "Date",
                    accessor: "date",
                    headerStyle: { textAlign: 'left' }
                  },
                  {
                    Header: "Total (XAF)",
                    accessor: "total",
                    headerStyle: { textAlign: 'left' }
                  },
                  {
                    Header: '',
                    maxWidth: 100,
                    id: "actions",
                    Cell: customer => {
                      return (
                        <div>
                          <span onClick={() => viewBasketDetail(customer.original)} className="mr-4 table-icons"><VisibilityIcon style={{ fontSize: 20 }} /></span>
                        </div>
                      )
                    }
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const NewCustomer = (props) => {
  const { setNewCustomerModalVisible, isNewCustomerModalVisible } = props;
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleNameInput = (e) => setName(e.target.value)
  const handlePhoneInput = (e) => setPhoneNumber(e.target.value)

  const handleCancleClick = () => {
    setName('')
    setNewCustomerModalVisible(false)
  }
  const handleSuccessClick = (e) => {
    // api to update name
    // handle error
    Swal.fire(
      'Created!',
      `customer: ${name} created successfully`,
      'success'
    )
    setNewCustomerModalVisible(false)
  }

  return (
    <ActionModal
      isVisible={isNewCustomerModalVisible}
      setIsVisible={() => setNewCustomerModalVisible(false)}
      title="New Customer">
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Name</span></div>
          <input name="name" placeholder="name" value={name} onChange={handleNameInput} type="text" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">PhoneNumber</span></div>
          <input name="phoneNumber" placeholder="" value={phoneNumber} onChange={handlePhoneInput} type="text" className={"w-75 form-control input"} />
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


const EditCustomer = (props) => {
  const { setEditCustomerModalVisible, isEditCustomerModalVisible, customer } = props;
  const [name, setName] = useState(customer.name)
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber)

  const handleNameInput = (e) => setName(e.target.value)
  const handlePhoneInput = (e) => setPhoneNumber(e.target.value)

  const handleCancleClick = () => {
    setName('')
    setEditCustomerModalVisible(false)
  }
  const handleSuccessClick = (e) => {
    // api to update name
    // handle error
    Swal.fire(
      'Created!',
      `customer: ${name} updated successfully`,
      'success'
    )
    setEditCustomerModalVisible(false)
  }

  return (
    <ActionModal
      isVisible={isEditCustomerModalVisible}
      setIsVisible={() => setEditCustomerModalVisible(false)}
      title="New Customer">
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">Name</span></div>
          <input name="name" placeholder="name" value={name} onChange={handleNameInput} type="text" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text h6">PhoneNumber</span></div>
          <input name="phoneNumber" placeholder="" value={phoneNumber} onChange={handlePhoneInput} type="text" className={"w-75 form-control input"} />
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

const PayDebt = (props) => {
  const { setPayDebtModalVisibile, isPayDebtModalVisible, customer } = props;
  const [name, setName] = useState(customer.name)
  const [debt] = useState(customer.debt)
  const [amount, setAmount] = useState(0)
  const [balance, setBalance] = useState(0)

  const handleAmountInput = (e) => {
    setAmount(e.target.value)
    setBalance(debt - Number(e.target.value))
  }

  const handleCancleClick = () => {
    setName('')
    setPayDebtModalVisibile(false)
  }
  const handleSuccessClick = (e) => {
    // api to update name
    // handle error
    Swal.fire(
      'Payed!',
      `Payment successful`,
      'success'
    )
    setPayDebtModalVisibile(false)
  }


  return (
    <ActionModal
      isVisible={isPayDebtModalVisible}
      setIsVisible={() => setPayDebtModalVisibile(false)}
      title="Pay Debt">
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="w-25 text">Name:</span>
          <span>{name}</span>
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="w-25 text">Debt:</span>
          <span>{debt} XAF</span>
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div><span className="w-25 text">Amount</span></div>
          <input name="amount" placeholder="" value={amount} onChange={handleAmountInput} type="number" className={"w-75 form-control input"} />
        </div>
      </div>
      <div className="mx-5">
        <div><span className="w-25 text">Balance: {balance} XAF</span></div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4 mx-5">
        <button onClick={() => handleCancleClick(false)} className="btn btn-danger mr-2"><span
          className="h5 px-2">Cancel</span></button>
        <button onClick={() => handleSuccessClick(false)} className="btn btn-success mr-2"><span
          className="h5 px-2">Pay</span></button>
      </div>
    </ActionModal >
  )
}

const BasketDetail = (props) => {
  const { setBasketDetailModalVisible, isBasketDetailModalVisible, basket } = props;
  const { date, total, cashier, basketDetails, paid, balance } = basket
  return (
    <ActionModal
      isVisible={isBasketDetailModalVisible}
      setIsVisible={() => setBasketDetailModalVisible(false)}
      title="Basket Details">
      <ReactTable
        showPagination={false}
        showPageSizeOptions={false}
        minRows={0}
        data={basketDetails}
        defaultPageSize={10}
        style={{
          // height: "45vh" // This will force the table body to overflow and scroll, since there is not enough room
        }}
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
            Header: "Item",
            accessor: "name",
            headerStyle: { textAlign: 'left' }

          },
          {
            Header: "Price",
            accessor: "price",
            headerStyle: { textAlign: 'left' }
          },
          {
            Header: "Qty",
            accessor: "qty",
            headerStyle: { textAlign: 'left' }
          },
          {
            Header: "Discount %",
            accessor: "discountPer",
            headerStyle: { textAlign: 'left' }
          },
          {
            Header: "Total (XAF)",
            accessor: "total",
            headerStyle: { textAlign: 'left' },
          }
        ]}
      />
      <div className="mx-5 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="w-25 text">Date:</span>
          <span>{date.toDateString()}</span>
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="w-25 text">Total:</span>
          <span>{total} XAF</span>
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="w-25 text">Cash:</span>
          <span>{paid} XAf</span>
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="w-25 text">Balance:</span>
          <span>{balance}</span>
        </div>
      </div>
      <div className="mx-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="w-25 text">Cashier:</span>
          <span>{cashier}</span>
        </div>
      </div>
    </ActionModal >
  )
}