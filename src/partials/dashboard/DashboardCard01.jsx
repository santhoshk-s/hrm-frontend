import React from 'react';
import { Link } from 'react-router-dom';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard01() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Leave Details</h2>
            <div className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">Overview of leave details for the current period.</div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Total Leave:</span>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">24 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Sick Leave:</span>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">12 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Casual Days:</span>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">12 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Balance Leave:</span>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">0 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
