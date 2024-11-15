import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

function AuditLog() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    {
      userName: "Tesla",
      action: "email Y",
      Resource: 64950,
      description: 64950,
      date: "true",
    },
    {
      userName: "Ford",
      action: "F-Series",
      Resource: 33850,
      description: 64950,
      date: "false",
    },
    {
      userName: "Toyota",
      action: "Corolla",
      Resource: 29600,
      description: 64950,
      date: "false",
    },
    {
      userName: "Honda",
      action: "Civic",
      Resource: 12345,
      description: 12345,
      date: "true",
    },
    {
      userName: "BMW",
      action: "X5",
      Resource: 24567,
      description: 24567,
      date: "false",
    },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "userName",filter: 'agTextColumnFilter' },
    { field: "action",filter: 'agTextColumnFilter' },
    { field: "Resource",filter: 'agTextColumnFilter' },
    { field: "description",filter: 'agTextColumnFilter' },
    { field: "date",filter: 'agDateColumnFilter' },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Audit Log
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

export default AuditLog;
