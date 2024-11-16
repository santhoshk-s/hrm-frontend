import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CandidateTable = () => {
  const [rowData, setRowData] = useState([
    {
      id: 1,
      candidateName: "Muthuraja",
      candidateEmail: "john.doe@example.com",
      mobile: 1234567890,
      position: "Software Engineer",
      experience: "5 years",
      date: "2024-05-10",  // Adding the missing date field
      skills: "JavaScript, React, Node.js",
      resume: "https://example.com/resume1.pdf",
      status: "Pending",
    },
    {
      id: 2,
      candidateName: "Jane Smith",
      candidateEmail: "jane.smith@example.com",
      mobile: 9876543210,
      position: "Product Manager",
      experience: "3 years",
      date: "2024-06-15",  // Adding the missing date field
      skills: "Agile, Roadmapping",
      resume: "https://example.com/resume2.pdf",
      status: "Pending",
    },
  ]);

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [editCandidateData, setEditCandidateData] = useState(null);

  const colDefs = [
    { field: "candidateName", headerName: "Name", filter: "agTextColumnFilter" },
    { field: "candidateEmail", headerName: "Email", filter: "agTextColumnFilter" },
    { field: "mobile", headerName: "Mobile", filter: "agNumberColumnFilter" },
    { field: "position", headerName: "Position", filter: "agTextColumnFilter" },
    { field: "experience", headerName: "Experience" },
    { field: "skills", headerName: "Skills", filter: "agTextColumnFilter" },
    { field: "status", headerName: "Status", filter: "agTextColumnFilter" },
    {
      headerName: "Action",
      cellRenderer: (params) => (
        <ActionRenderer
          data={params.data}
          setResumeLink={setResumeLink}
          setShowResumeModal={setShowResumeModal}
          setEditCandidateData={setEditCandidateData}
          setShowEditModal={setShowEditModal}
        />
      ),
    },
  ];

  const handleUpdate = () => {
    setRowData((prev) =>
      prev.map((row) =>
        row.id === editCandidateData.id ? editCandidateData : row
      )
    );
    setShowEditModal(false);
  };

  return (
    <div className="m-5">
      <h1 className="text-xl font-bold mb-4">Candidate Table</h1>

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
        <div className="bg-white rounded-lg shadow-lg w-3/4 h-3/4 p-4 overflow-y-scroll">
          <h2 className="text-lg font-semibold mb-4">Candidate Resume</h2>
          <div className="relative w-full h-auto overflow-auto">
            <iframe
              src={resumeLink}
              title="Resume Viewer"
              className="w-full h-auto border rounded"
            />
          </div>
          <div className="flex justify-self-end mt-4">
            <a
              href={resumeLink}
              download
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
            >
              Download Resume
            </a>
            <button
              onClick={() => setShowResumeModal(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
      )}

      {/* Edit Modal */}
      {showEditModal && editCandidateData && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg shadow-lg w-2/3 col-auto p-4">
            <h2 className="text-lg font-semibold mb-4">Edit Candidate</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              className="grid grid-cols-3 gap-4"
            >
              {/* Left Column */}
              <div className="mb-3">
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  value={editCandidateData.candidateName}
                  onChange={(e) =>
                    setEditCandidateData({
                      ...editCandidateData,
                      candidateName: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  value={editCandidateData.candidateEmail}
                  onChange={(e) =>
                    setEditCandidateData({
                      ...editCandidateData,
                      candidateEmail: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium">Mobile</label>
                <input
                  type="number"
                  value={editCandidateData.mobile}
                  onChange={(e) =>
                    setEditCandidateData({
                      ...editCandidateData,
                      mobile: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium">Position</label>
                <input
                  type="text"
                  value={editCandidateData.position}
                  onChange={(e) =>
                    setEditCandidateData({
                      ...editCandidateData,
                      position: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium">Experience</label>
                <input
                  type="text"
                  value={editCandidateData.experience}
                  onChange={(e) =>
                    setEditCandidateData({
                      ...editCandidateData,
                      experience: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium">Date</label>
                <input
                  type="date"
                  value={editCandidateData.date}
                  onChange={(e) =>
                    setEditCandidateData({
                      ...editCandidateData,
                      date: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Right Column */}
              <div className="mb-3">
                <label className="block font-medium">Skills</label>
                <input
                  type="text"
                  value={editCandidateData.skills}
                  onChange={(e) =>
                    setEditCandidateData({
                      ...editCandidateData,
                      skills: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium">Resume Link</label>
                <input
                  type="url"
                  value={editCandidateData.resume}
                  onChange={(e) =>
                    setEditCandidateData({
                      ...editCandidateData,
                      resume: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium">Status</label>
                <select
                  value={editCandidateData.status}
                  onChange={(e) =>
                    setEditCandidateData({
                      ...editCandidateData,
                      status: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}

      {/* AG-Grid Table */}
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

const ActionRenderer = ({
  data,
  setResumeLink,
  setShowResumeModal,
  setEditCandidateData,
  setShowEditModal,
}) => {
  const handleViewResume = () => {
    setResumeLink(data.resume);
    setShowResumeModal(true);
  };

  const handleEdit = () => {
    setEditCandidateData(data);
    setShowEditModal(true);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleViewResume}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Resume
      </button>
      <button
        onClick={handleEdit}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Edit
      </button>
    </div>
  );
};

export default CandidateTable;
