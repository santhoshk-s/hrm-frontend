import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component

function LeaveList() {
  const [rowData, setRowData] = useState([
    {
      Name: "Audi",
      email: "A6",
      date: 76543,
      reason: 76543,
    },
    {
      Name: "Chevrolet",
      email: "Malibu",
      date: 65432,
      reason: 65432,
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "Name", headerName: "Name",filter: 'agTextColumnFilter' },
    { field: "email", headerName: "Email",filter: 'agTextColumnFilter' },
    { field: "date", headerName: "Date",filter: 'agDateColumnFilter' },
    { field: "reason", headerName: " Reason" },
    {
      headerName: "Action",
      cellRenderer: (params) => <ButtonRenderer onClick={() => alert("rty")} />,
      width: 250,
    },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Leave List
      </h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={20}
        className="bg-white dark:bg-gray-800 shadow-sm rounded-xl"
      />
    </div>
  );
}
const ButtonRenderer = ({ onClick }) => {
  return (
    <>
      <button className="btn bg-green-800 text-white" onClick={onClick}>
        Approve
      </button>
      <button className="btn bg-red-800 ml-2" onClick={onClick}>
        Rejected
      </button>
    </>
  );
};
export default LeaveList;
