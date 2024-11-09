import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component

function ShowEmployees() {
  const [rowData, setRowData] = useState([
    {
      userName: "Tesla",
      email: "email Y",
      mobile: 64950,
      blood: 64950,
      image: "true",
      address: "address address sfdgdg",
      pan: "6783t8ucyr",
      skills: "java, css , react , js",
    },
    {
      userName: "Ford",
      email: "F-Series",
      mobile: 33850,
      blood: 64950,
      image: "false",
      address: "address address sfdgdg",
      pan: "6783t8ucyr",
      skills: "java, css , react , js",
    },
    {
      userName: "Toyota",
      email: "Corolla",
      mobile: 29600,
      blood: 64950,
      image: "false",
      address: "address address sfdgdg",
      pan: "6783t8ucyr",
      skills: "java, css , react , js",
    },
    {
      userName: "Honda",
      email: "Civic",
      mobile: 12345,
      blood: 12345,
      image: "true",
      address: "address address sfdgdg",
      pan: "6783t8ucyr",
      skills: "java, css , react , js",
    },
    {
      userName: "BMW",
      email: "X5",
      mobile: 24567,
      blood: 24567,
      image: "false",
      address: "address address sfdgdg",
      pan: "6783t8ucyr",
      skills: "java, css , react , js",
    },
    {
      userName: "Audi",
      email: "A6",
      mobile: 76543,
      blood: 76543,
      image: "true",
      address: "address address sfdgdg",
      pan: "6783t8ucyr",
      skills: "java, css , react , js",
    },
    {
      userName: "Chevrolet",
      email: "Malibu",
      mobile: 65432,
      blood: 65432,
      image: "false",
      address: "address address sfdgdg",
      pan: "6783t8ucyr",
      skills: "java, css , react , js",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "userName", headerName: "User Name" },
    { field: "image", headerName: "Profile" },
    { field: "email", headerName: "Email" },
    { field: "mobile", headerName: "Mobile" },
    { field: "blood", headerName: "Blood Group" },
    { field: "address", headerName: "Address" },
    { field: "pan", headerName: "PAN" },
    { field: "skills", headerName: "Skills" },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        All Employees
      </h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={15}
        className="bg-white dark:bg-gray-800 shadow-sm rounded-xl"
      />
    </div>
  );
}

export default ShowEmployees;
