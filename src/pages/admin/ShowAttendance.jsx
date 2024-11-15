import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

function ShowAttendance() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { userName: "Tesla", email: "email Y", arrivalDate: 64950, departureDate: 64950, remarks: 'true' },
    { userName: "Ford", email: "F-Series", arrivalDate: 33850, departureDate: 64950, remarks: 'false' },
    { userName: "Toyota", email: "Corolla", arrivalDate: 29600, departureDate: 64950, remarks: 'false' },
    { userName: "Honda", email: "Civic", arrivalDate: 12345, departureDate: 12345, remarks: 'true' },
    { userName: "BMW", email: "X5", arrivalDate: 24567, departureDate: 24567, remarks: 'false' },
    { userName: "Audi", email: "A6", arrivalDate: 76543, departureDate: 76543, remarks: 'true' },
    { userName: "Chevrolet", email: "Malibu", arrivalDate: 65432, departureDate: 65432, remarks: 'false' },
    { userName: "Honda", email: "Civic", arrivalDate: 12345, departureDate: 12345, remarks: 'true' },
    { userName: "BMW", email: "X5", arrivalDate: 24567, departureDate: 24567, remarks: 'false' },
    { userName: "Audi", email: "A6", arrivalDate: 76543, departureDate: 76543, remarks: 'true' },
    { userName: "Chevrolet", email: "Malibu", arrivalDate: 65432, departureDate: 65432, remarks: 'false' },
    { userName: "Honda", email: "Civic", arrivalDate: 12345, departureDate: 12345, remarks: 'true' },
    { userName: "BMW", email: "X5", arrivalDate: 24567, departureDate: 24567, remarks: 'false' },
    { userName: "Audi", email: "A6", arrivalDate: 76543, departureDate: 76543, remarks: 'true' },
    { userName: "Chevrolet", email: "Malibu", arrivalDate: 65432, departureDate: 65432, remarks: 'false' },
    { userName: "Honda", email: "Civic", arrivalDate: 12345, departureDate: 12345, remarks: 'true' },
    { userName: "BMW", email: "X5", arrivalDate: 24567, departureDate: 24567, remarks: 'false' },
    { userName: "Audi", email: "A6", arrivalDate: 76543, departureDate: 76543, remarks: 'true' },
    { userName: "Chevrolet", email: "Malibu", arrivalDate: 65432, departureDate: 65432, remarks: 'false' },
    { userName: "Honda", email: "Civic", arrivalDate: 12345, departureDate: 12345, remarks: 'true' },
    { userName: "BMW", email: "X5", arrivalDate: 24567, departureDate: 24567, remarks: 'false' },
    { userName: "Audi", email: "A6", arrivalDate: 76543, departureDate: 76543, remarks: 'true' },
    { userName: "Chevrolet", email: "Malibu", arrivalDate: 65432, departureDate: 65432, remarks: 'false' },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "userName",filter: 'agTextColumnFilter' },
    { field: "email",filter: 'agTextColumnFilter' },
    { field: "arrivalDate",filter: 'agTextColumnFilter' },
    { field: "departureDate",filter: 'agTextColumnFilter' },
    { field: "remarks" }
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        All Attendances
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

export default ShowAttendance;
