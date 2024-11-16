import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { useDispatch, useSelector } from "react-redux";
import { leavelist } from "../../redux/slices/leaveSlice";

function LeaveList() {
const dispatch=useDispatch()
const{data:getAllData,error,loading}=useSelector((state)=>state.leave.leavelist)

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
    { field: "userId.userName", headerName: "Name",filter: 'agTextColumnFilter' },
    { field: "userId.email", headerName: "Email",filter: 'agTextColumnFilter' },
    { field: "dates", headerName: "Date",filter: 'agDateColumnFilter' },
    { field: "reason", headerName: "Reason" },
    { field: "hrComments", headerName: "Hr Comment" },
    { field: "managerComments", headerName: "Manager Comment" },
    { field: "status", headerName: "Status" },
    {
      headerName: "Action",
      cellRenderer: (params) => <ButtonRenderer onClick={() => alert("rty")} />,
      width: 250,
    },
  ]);

  useEffect(() => {
    dispatch(leavelist())
  }, [dispatch])
  
console.log(getAllData,error)
  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Leave List
      </h2>
      <AgGridReact
        rowData={getAllData}
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
