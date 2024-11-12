import React from 'react'

const Employeequery = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-lg max-w-lg mx-auto">
    <textarea
      id="comments"
      placeholder="Enter your comments..."
      className="w-full h-40 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-none placeholder-gray-400 text-gray-700 mb-4"
    ></textarea>
  
    <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-semibold hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 focus:outline-none shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5">
      Submit
    </button>
  </div>
  
  )
}

export default Employeequery
