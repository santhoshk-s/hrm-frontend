import React, { useState } from "react";

// Example data: List of employees
const employeesData = [
  {
    id: 1,
    name: "John Doe",
    department: "HR",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
    dob: "1985-06-15",
    doj: "2015-04-12",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Finance",
    email: "jane.smith@example.com",
    mobile: "234-567-8901",
    dob: "1990-11-22",
    doj: "2017-03-09",
  },
  {
    id: 3,
    name: "Alice Johnson",
    department: "HR",
    email: "alice.johnson@example.com",
    mobile: "345-678-9012",
    dob: "1987-02-20",
    doj: "2016-01-17",
  },
  // Add more employees as needed
];

const EmployeeList = () => {
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null); // To hold selected employee details

  // Filter employees based on department and employee ID
  const filteredEmployees = employeesData.filter((employee) => {
    const departmentMatch =
      department === "" || employee.department.toLowerCase().includes(department.toLowerCase());
    const employeeIdMatch =
      employeeId === "" || employee.id.toString().includes(employeeId);
    return departmentMatch && employeeIdMatch;
  });

  return (
    <div className="flex justify-center items-center min-h-screen -mt-8">
      <div className="bg-white p-10 rounded-2xl w-full max-w-7xl transition-all duration-500 flex flex-col">
        {/* Search Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Employee Search</h2>
          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">Search by Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter department"
              className="w-full p-3 rounded-lg border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">Search by Employee ID</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter Employee ID"
              className="w-full p-3 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        {/* Employee List Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Employee List</h3>
          {filteredEmployees.length === 0 ? (
            <p>No employees found based on your search criteria.</p>
          ) : (
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex justify-between items-center p-4   rounded-lg"
                >
                  <div className="flex space-x-6">
                    <div><strong>{employee.name}</strong></div>
                    <div><strong>Emp ID:</strong> {employee.id}</div>
                    <div><strong>Dept:</strong> {employee.department}</div>
                  </div>
                  <button
                    onClick={() => setSelectedEmployee(employee)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Employee Details Section */}
        {selectedEmployee && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold">Employee Details</h4>
            <div className="mt-4">
              <p><strong>Name:</strong> {selectedEmployee.name}</p>
              <p><strong>Employee ID:</strong> {selectedEmployee.id}</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Mobile:</strong> {selectedEmployee.mobile}</p>
              <p><strong>Date of Birth:</strong> {selectedEmployee.dob}</p>
              <p><strong>Date of Joining:</strong> {selectedEmployee.doj}</p>
            </div>
            <button
              onClick={() => setSelectedEmployee(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Close Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
