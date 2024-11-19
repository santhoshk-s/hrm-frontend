import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { getAllUser } from "../../redux/slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserModel from "../../components/UserModel";

function ShowEmployees() {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.employee.getAllUser);

  const [showModel, setShowModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [colDefs, setColDefs] = useState([
    { field: "image", headerName: "Profile",filter:"", },
    {
      field: "userName",
      headerName: "User Name",
      filter: "",
    },
    {
      field: "role",
      headerName: "Role",
      filter: "",
    },
   
    {
      field: "address",
      headerName: "Address",   
      filter: "",
    },
    {
      field: "employeecode",
      headerName: "Employeecode",
      filter: "",
    },
    {
      field: "position",
      headerName: "Position",
      filter: "",
    },
    {
      field: "bloode group",
      headerName: "Blood Group",
      filter: "",
    },
    {
      field: "mobile number",
      headerName: "Mobile Number",
      filter: "",
    },
    {
      field: "aadhaar",
      headerName: "Aadhaar",
      filter: "",
    },
    {
      field: "pan",
      headerName: "Pan",
      filter: "",
    },
    { field: "email", headerName: "Email", filter: "agTextColumnFilter" },
    {
      headerName: "Action",
      cellRenderer: (params) => (
        <ButtonRenderer
          data={params.data}
          setShowModel={setShowModel}
          setSelectedUser={setSelectedUser}
        />
      ),
      width: 250,
    },
  ]);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  return (
    <>
      <div
        hidden={showModel}
        className="ag-theme-quartz"
        style={{ height: 500 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          All Employees
        </h2>
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-xl"
        />
      </div>
      {showModel && (
        <UserModel user={selectedUser} onClose={() => setShowModel(false)} />
      )}
    </>
  );
}

const ButtonRenderer = ({ data, setShowModel, setSelectedUser }) => {
  const handleClick = () => {
    setSelectedUser(data); // Set the selected user data
    setShowModel(true);
  };

  return (
    <>
      <button className="btn bg-green-800 text-white" onClick={handleClick}>
        View
      </button>
      <button className="btn bg-red-800 ml-2">Delete</button>
    </>
  );
};

export default ShowEmployees;
