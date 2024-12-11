import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { IoEyeSharp } from "react-icons/io5";

import { getAllTask } from './../../redux/slices/taskSlice';





const TaskList = () => {
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.task.getAllTask.data);

  const [rowData, setRowData] = useState([]);
  const [selectedTaskList, setSelectedTaskList] = useState(null); // To store selected query details
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  const [colDefs, setColDefs] = useState([
    {
      field: "userId.userName",
      headerName: "User Name",
      filter: "agTextColumnFilter",
      valueGetter: (params) => params.data.userId?.userName || "N/A",
    },
    {
      field: "userId.email",
      headerName: "Email",
      filter: "agTextColumnFilter",
      valueGetter: (params) => params.data.userId?.email || "N/A",
      width: 300,
    },
    { field: "subject", headerName: "Subject", filter: "agTextColumnFilter", width: 300, },
    {
      headerName: "TaskList",
      cellRenderer: (params) => (
        <div onClick={() => handleQueryDetails(params.data)}> 
        <IoEyeSharp
          className="absolute text-blue-600 text-lg cursor-pointer ml-[30%] mt-[13px]"
        />
        </div>
      ),
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      filter: "agTextColumnFilter",
      valueGetter: (params) =>
        params.data.status ? "Resolved" : "Pending",
    },
  ]);

  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch]);

  useEffect(() => {
    if (taskData && Array.isArray(taskData)) {
      setRowData(taskData);
    }
  }, [taskData]);

  const handleQueryDetails = (task) => {
    setSelectedAllTask(task);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedQuery(null);
  };

  return (
    <>
      <div className="container mx-auto overflow-x-auto rounded-lg shadow-lg">
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            All TaskList
          </h2>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={20}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-xl"
          />
        </div>
      </div>

      {isModalVisible && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Task List
            </h3>
            <p>
              <strong>Emp Name:</strong> {selectedTask.userId?.userName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {selectedTask.userId?.email || "N/A"}
            </p>
            <p>
              <strong>Subject:</strong> {selectedTask.subject || "N/A"}
            </p>
            <p>
              <strong>Task:</strong> {selectedTask.task || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedTask.status ? "Resolved" : "Pending"}
            </p>

            <div className="flex justify-end mt-4">
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
