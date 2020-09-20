import React from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

const data = [
  { id: 1, name: "Administrator", description: "The owner i guess" },
  { id: 2, name: "Employee", description: "An employee i guess" },
  { id: 1, name: "Sales", description: "The owner i guess" },
  { id: 2, name: "Items", description: "An employee i guess" },
  { id: 1, name: "Customers", description: "The owner i guess" },
  { id: 2, name: "Reports", description: "An employee i guess" },
];

export default function Roles() {
  return (
    <div className="roles__container">
      <ReactTable
        showPagination={false}
        minRows={0}
        data={data}
        defaultPageSize={10}
        style={
          {
            // height: "45vh" // This will force the table body to overflow and scroll, since there is not enough room
          }
        }
        loadingText="Loading Products ..."
        noDataText="No products found"
        className="-highlight -striped rt-rows-height ReactTable"
        columns={[
          {
            Header: "Role Name",
            accessor: "name",
          },
          {
            Header: "Role Description",
            accessor: "description",
          },
        ]}
      />
    </div>
  );
}
