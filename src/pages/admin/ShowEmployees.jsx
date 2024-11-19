import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { getAllUser } from "../../redux/slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import UserModel from "../../components/UserModel";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function ShowEmployees() {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.employee.getAllUser);

  const [showModel, setShowModel] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [colDefs, setColDefs] = useState([
    { field: "image", headerName: "Profile", filter: "" },
    { field: "userName", headerName: "User Name", filter: "" },
    { field: "role", headerName: "Role", filter: "" },
    { field: "address", headerName: "Address", filter: "" },
    { field: "employeecode", headerName: "Employeecode", filter: "" },
    { field: "position", headerName: "Position", filter: "", 
      cellRenderer: (params) => (
        <EditButtonRenderer
          data={params.data}
          setShowEditForm={setShowEditForm}
          setSelectedUser={setSelectedUser}
        />
      ),
    },
    { field: "bloode group", headerName: "Blood Group", filter: "" },
    { field: "mobile number", headerName: "Mobile Number", filter: "" },
    { field: "aadhaar", headerName: "Aadhaar", filter: "" },
    { field: "pan", headerName: "Pan", filter: "" },
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
        hidden={showModel || showEditForm}
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
      {showEditForm && (
        <EditPositionForm
          user={selectedUser}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}

const ButtonRenderer = ({ data, setShowModel, setSelectedUser }) => {
  const handleClick = () => {
    setSelectedUser(data);
    setShowModel(true);
  };

  return (
    <>
      <button onClick={handleClick}>
        <IoEyeSharp size={20} />
      </button>
      <button className="ml-3">
        <FaTrashAlt size={16} />
      </button>
    </>
  );
};

const EditButtonRenderer = ({ data, setShowEditForm, setSelectedUser }) => {
  const handleEditClick = () => {
    setSelectedUser(data);
    setShowEditForm(true);
  };

  return (
    <button onClick={handleEditClick}>
      <FaEdit size={20} />
    </button>
  );
};

const EditPositionForm = ({ user, onClose }) => {
  const [position, setPosition] = useState(user.position);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the save logic here (e.g., dispatch an action to update the position)
    console.log("Updated position for user:", user.userName, position);
    onClose(); // Close the form
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Edit Position for {user.userName}
        </h2>
        <form onSubmit={handleSubmit}>
           <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Position
          </label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
          >
            <option >Select Position</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowEmployees;
