import React, { useState } from "react";

const Querylist = () => {
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const toggleTextarea = () => {
    setIsTextareaVisible(!isTextareaVisible);
  };

  return (
    <>
      <div hidden={isTextareaVisible} className="container absolute mx-auto max-w-4xl overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-green-500 text-white">
              <th>S.NO</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Query</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td>1</td>
              <td className="border-b px-4 py-3">John Doe</td>
              <td className="border-b px-4 py-3">john@example.com</td>
              <td className="border-b px-4 py-3">
                Hi, I have a question about the product.
              </td>
              <td>
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
                  onClick={toggleTextarea}
                >
                  Reply
                </button>
              </td>
            </tr>      
            <tr className="hover:bg-gray-100">
              <td>1</td>
              <td className="border-b px-4 py-3">John Doe</td>
              <td className="border-b px-4 py-3">john@example.com</td>
              <td className="border-b px-4 py-3">
                Hi, I have a question about the product.
              </td>
              <td>
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
                  onClick={toggleTextarea}
                >
                  Reply
                </button>
              </td>
            </tr>      
            <tr className="hover:bg-gray-100">
              <td>1</td>
              <td className="border-b px-4 py-3">John Doe</td>
              <td className="border-b px-4 py-3">john@example.com</td>
              <td className="border-b px-4 py-3">
                Hi, I have a question about the product.
              </td>
              <td>
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
                  onClick={toggleTextarea}
                >
                  Reply
                </button>
              </td>
            </tr>      
          </tbody>
        </table>
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

export default Querylist;
