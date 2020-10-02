import React, { useEffect, useState } from 'react';
import { DateRangePicker } from '../../components'
import EditIcon from '@material-ui/icons/Edit';
import ReactTable from 'react-table';
import apis from "../../apis/apis";
import RefreshIcon from '@material-ui/icons/Refresh';


const SalesReport = props => {

  const currentDate = new Date()
  const startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
  const [startDate, setStartDate] = useState(startMonth)
  const [endDate, setEndDate] = useState(currentDate)
  const [rangeType, setRangeType] = useState("day")
  const [isDatePickerOPen, setDatePickerOpen] = useState(false)
  const [saleData, setSaleData] = useState([])

  const handleDatePickerSaved = (dates) => {
    let _startDate = new Date(dates.start);
    let _endDate = new Date(dates.end);
    if (dates.type === 'year') {
      _startDate = new Date(dates.start, 0)
      _endDate = new Date(dates.end, 12)
    }
    setStartDate(_startDate)
    setEndDate(_endDate)
    setRangeType(dates.type)
    setDatePickerOpen(false)
  }

  useEffect(() => {
    getSales()
  }, [])

  const getSales = async () => {
    const res = await apis.saleApi.sales()
    let sales = res.filter(sale => {
      let saleDate = new Date(sale.created_at)
      return startDate <= saleDate && saleDate <= endDate
    })
    sales = sales.map(sale => {
      let qty = 0
      let cost = 0
      sale.lineItems.forEach(li => {
        qty += li.qty
        cost += li.qty * li.item.purchasePrice
      })
      sale.qty = qty
      sale.cost = cost
      sale.profit = sale.total - sale.cost
      return sale
    })
    setSaleData(sales)
  }

  return (
    <div>
      <div className="text-center mt-2 mb-2">
        <h3>Sales summary report</h3>
        <div className="mt-2 mb-2">
          From {startDate.toLocaleDateString()} To:
                            {endDate.toLocaleDateString()}<button className="ml-2 btn btn-primary btn-sm" onClick={() => setDatePickerOpen(true)}><EditIcon style={{ fontSize: 20 }} /></button> &nbsp; <button className="btn btn-sm btn-primary" onClick={getSales}  ><RefreshIcon style={{ fontSize: 20 }}></RefreshIcon></button>
          {isDatePickerOPen && <DateRangePicker label="dashboard" default="week" onClose={() => setDatePickerOpen(false)} onSave={handleDatePickerSaved}></DateRangePicker>}
        </div>
      </div>

      <ReactTable
        showPagination={true}
        showPageSizeOptions={false}
        minRows={0}
        data={saleData}
        defaultPageSize={10}
        style={{ textAlign: "center" }}
        loadingText="Loading Products ..."
        noDataText="No products found"
        className="-highlight -striped rt-rows-height ReactTable"
        columns={[
          {
            Header: "#",
            id: "row",
            maxWidth: 50,
            filterable: false,
            Cell: (row) => {
              return <div>{row.index + 1}</div>;
            },
          },
          {
            Header: "Date",
            Cell: (row) => {
              return <div>{new Date(row.original.created_at).toLocaleString()}</div>;
            },
          },
          {
            Header: "Qty",
            maxWidth: 50,
            accessor: "qty",
          },
          {
            Header: "Total (XAF)",
            accessor: "total",
          },
          {
            Header: "Cost (XAF)",
            accessor: "cost",
          },
          {
            Header: "Profit (XAF)",
            accessor: "profit",
          },
        ]} />
    </div>
  );
};

export default SalesReport;
