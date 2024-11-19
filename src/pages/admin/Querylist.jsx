import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component

const Querylist = () => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "userName", headerName: "User Name",filter: 'agTextColumnFilter' },
    { field: "email", headerName: "Email",filter: 'agTextColumnFilter' },
    { field: "mobile", headerName: "Subject",filter: 'agTextColumnFilter' },
    { field: "blood", headerName: "Query",filter: 'agTextColumnFilter' },
    { field: "pan", headerName: "Response",filter: 'agTextColumnFilter' },
    { field: "skills", headerName: "Status",filter: 'agTextColumnFilter' },
    {
      headerName: "Action",
      cellRenderer: (params) => <ButtonRenderer toggleTextarea={toggleTextarea} />,
      width: 250,
    },
  ]);




  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const toggleTextarea = () => {
    setIsTextareaVisible(!isTextareaVisible);
  };

  return (
    <>
      <div hidden={isTextareaVisible} className="container mx-auto overflow-x-auto rounded-lg shadow-lg">
      <div
        className="ag-theme-quartz"
        style={{ height: 500 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          All Employees
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
      {isTextareaVisible && (
        <div className=" w-full h-[80vh] grid place-content-center ">
          <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-lg w-[400px] mx-auto">
            <textarea
              id="comments"
              placeholder="Enter your comments..."
              className="w-full h-40 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-none placeholder-gray-400 text-gray-700 mb-4"
            ></textarea>

            <div className="flex justify-between w-full">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-semibold hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 focus:outline-none shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5">
                Submit
              </button>
              <button
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:to-red-600 focus:outline-none shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5"
                onClick={toggleTextarea}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ButtonRenderer = ({ toggleTextarea }) => {
  const handleClick = () => {
    toggleTextarea(true);
  };
  return (
    <>
      <button className="btn bg-green-800 text-white" onClick={toggleTextarea}>
        Reply
      </button>
      {/* <button className="btn bg-red-800 ml-2">Delete</button> */}
    </>
  );
};
export default Querylist;
