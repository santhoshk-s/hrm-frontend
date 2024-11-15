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
  const [showModel, setShowModel] = useState(false);
  const [colDefs, setColDefs] = useState([
    { field: "image", headerName: "Profile" },
    { field: "userName", headerName: "User Name",filter: 'agTextColumnFilter' },
    { field: "email", headerName: "Email",filter: 'agTextColumnFilter' },
    { field: "mobile", headerName: "Mobile",filter: 'agNumberColumnFilter' },
    { field: "blood", headerName: "Blood Group",filter: 'agTextColumnFilter' },
    { field: "pan", headerName: "PAN",filter: 'agTextColumnFilter' },
    { field: "skills", headerName: "Skills",filter: 'agTextColumnFilter' },
    {
      headerName: "Action",
      cellRenderer: (params) => <ButtonRenderer setShowModel={setShowModel} />,
      width: 250,
    },
  ]);

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
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-xl"
        />
      </div>
      {showModel && <Model />}
    </>
  );
}

const ButtonRenderer = ({ setShowModel }) => {
  const handleClick = () => {
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

const Model = () => {
  return (
    <>
      <div className="flex items-center w-full justify-center">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
                alt="John Doe"
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                ....
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>Web Developer</p>
              </div>
              <div className=" w-full grid gap-6 grid-cols-2 ">
                <div className=" flex justify-between">
                  <h2 className="px-2 py-2 text-gray-500 font-semibold">Address</h2>
                  <span className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</span>
                </div>
                <div className=" flex justify-between">
                  <h2 className="px-2 py-2 text-gray-500 font-semibold">Phone</h2>
                  <span className="px-2 py-2">+977 9955221114</span>
                </div>
                <div className=" flex justify-between">
                  <h2 className="px-2 py-2 text-gray-500 font-semibold">Email</h2>
                  <span className="px-2 py-2">john@exmaple.com</span>
                </div>
                <div className=" flex justify-between">
                  <h2 className="px-2 py-2 text-gray-500 font-semibold">
                    Blood Group
                  </h2>
                  <span className="px-2 py-2">A1+</span>
                </div>
                <div className=" flex justify-between">
                  <h2 className="px-2 py-2 text-gray-500 font-semibold">
                    Pancard{" "}
                  </h2>
                  <button className="px-2 py-2 bg-blue-400 rounded-lg text-white">
                    View
                  </button>
                </div>
                <div className=" flex justify-between">
                  <h2 className="px-2 py-2 text-gray-500 font-semibold">
                    Aadharcard{" "}
                  </h2>
                  <button className="px-2 py-2 bg-blue-400 rounded-lg text-white">
                    View
                  </button>
                </div>
                <div className=" flex justify-between">
                  <h2 className="px-2 py-2 text-gray-500 font-semibold">
                    Passbook{" "}
                  </h2>
                  <button className="px-2 py-2 bg-blue-400 rounded-lg text-white">
                    View
                  </button>
                </div>
                <div className=" flex justify-between">
                  <h2 className="px-2 py-2 text-gray-500 font-semibold">Role </h2>
                  <div className="w-[150px]">
                    <div className="relative">
                      <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="hr">Hr</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default ShowEmployees;
