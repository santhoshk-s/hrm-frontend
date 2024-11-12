import React from "react";

const Querylist = () => {
  return (
    <div class="container mx-auto my-6 max-w-4xl overflow-x-auto rounded-lg shadow-lg">
      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="bg-green-500 text-white">
            <th>S.NO</th>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Query</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100">
            <td>1</td>
            <td class="border-b px-4 py-3">John Doe</td>
            <td class="border-b px-4 py-3">john@example.com</td>
            <td class="border-b px-4 py-3">
              Hi, I have a question about the product.
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td>2</td>

            <td class="border-b px-4 py-3">John Doe</td>
            <td class="border-b px-4 py-3">john@example.com</td>
            <td class="border-b px-4 py-3">
              Hi, I have a question about the product.
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td>3</td>

            <td class="border-b px-4 py-3">John Doe</td>
            <td class="border-b px-4 py-3">john@example.com</td>
  <td class="border-b px-4 py-3">
              Hi, I have a question about the product.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Querylist;
