import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { IoEyeSharp } from "react-icons/io5";
import { getAllQuery } from "../../redux/slices/querySlice";

const Querylist = () => {
  const dispatch = useDispatch();
  const queryData = useSelector((state) => state.query.getAllQuery.data);

  const [rowData, setRowData] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null); // To store selected query details
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
      headerName: "Query",
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
    dispatch(getAllQuery());
  }, [dispatch]);

  useEffect(() => {
    if (queryData && Array.isArray(queryData)) {
      setRowData(queryData);
    }
  }, [queryData]);

  const handleQueryDetails = (query) => {
    setSelectedQuery(query);
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
            All Queries
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

      {isModalVisible && selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Query Details
            </h3>
            <p>
              <strong>User Name:</strong> {selectedQuery.userId?.userName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {selectedQuery.userId?.email || "N/A"}
            </p>
            <p>
              <strong>Subject:</strong> {selectedQuery.subject || "N/A"}
            </p>
            <p>
              <strong>Query:</strong> {selectedQuery.query || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedQuery.status ? "Resolved" : "Pending"}
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

export default Querylist;
