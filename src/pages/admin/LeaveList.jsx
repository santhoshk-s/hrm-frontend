import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { useDispatch, useSelector } from "react-redux";
import { leavelist } from "../../redux/slices/leaveSlice";
import LeaveModal from "./LeaveModal"; // Import LeaveModal componentx


function LeaveList() {
  const dispatch = useDispatch();
  const { data: getAllData, error, loading } = useSelector(
    (state) => state.leave.leavelist
  );
 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [actionType, setActionType] = useState(""); // State to track modal action type

  const [colDefs, setColDefs] = useState([
    {
      field: "userId.userName",
      headerName: "Name",
      filter: "agTextColumnFilter",
    },
    {
      field: "userId.email",
      headerName: "Email",
      filter: "agTextColumnFilter",
    },
    { field: "dates", headerName: "Date", filter: "agDateColumnFilter" },
    { field: "reason", headerName: "Reason" },
    { field: "hrComments", headerName: "HR Comment" },
    { field: "managerComments", headerName: "Manager Comment" },
    { field: "status", headerName: "Status" },
    {
      headerName: "Action",
      cellRenderer: (params) => (
        <ButtonRenderer
          onApprove={() => handleApproveClick(params.data)}
          onReject={() => handleRejectClick(params.data)}
        />
      ),
      width: 250,
    },
  ]);

  useEffect(() => {
    dispatch(leavelist());
  }, [dispatch]);

  const handleApproveClick = (rowData) => {
    setModalData(rowData); // Pass the row data to the modal
    setActionType("approve"); // Set action type to 'approve'
    setIsModalOpen(true); // Open the modal
  };

  const handleRejectClick = (rowData) => {
    setModalData(rowData); // Pass the row data to the modal
    setActionType("reject"); // Set action type to 'reject'
    setIsModalOpen(true); // Open the modal
};


  const handleModalSubmit = (modalInputs, modalData) => {
    setIsModalOpen(false); // Close the modal
    dispatch(leavelist());


  };



  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

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

      {/* Modal */}
      <LeaveModal
        isOpen={isModalOpen}
        modalData={modalData}
        closeModal={closeModal}
        handleSubmit={handleModalSubmit}
        actionType={actionType} // Pass action type to modal
      />
    </div>
  );
}

const ButtonRenderer = ({ onApprove, onReject }) => {
  return (
    <>
      <button className="btn bg-green-800 text-white" onClick={onApprove}>
        Approve
      </button>
      <button className="btn bg-red-800 ml-2 text-white" onClick={onReject}>
        Reject
      </button>
    </>
  );
};

export default LeaveList;
