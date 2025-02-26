import AddnewProductForm from "@/components/AddnewProductForm";
import React, { Fragment, useState } from "react";

const AdminProducts = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Fragment>
        <div>
          {/* Add Product Button */}
          <div className="mb-5 w-full flex justify-end">
            <button
              onClick={openDrawer}
              className="cursor-pointer text-white bg-gray-700 hover:bg-green-600 px-4 py-2 rounded-md"
            >
              Add New Productsss
            </button>
          </div>

          {/* Sliding Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-[400px] bg-gray-50 shadow-lg transition-transform duration-600 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-bold">Add New Product</h2>
              <button
                onClick={closeDrawer}
                className="text-black text-xl font-bold"
              >
                ✖
              </button>
            </div>

            {/* Product Form */}
            <AddnewProductForm />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      </Fragment>
    </>
  );
};

export default AdminProducts;
