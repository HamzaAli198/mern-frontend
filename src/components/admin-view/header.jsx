import React from "react";
import { IoIosMenu } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";

const AdminHeader = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <>
      <header className="flex items-center justify-between bg-white shadow-md p-4 md:p-6">
        {/* Sidebar Toggle Button */}
        <button
          className="text-gray-700 md:hidden"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <IoIosMenu size={28} />
        </button>

        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
          Admin Panel
        </h1>

        {/* Logout Button */}
        <button className="flex items-center gap-2 text-red-600 font-medium hover:text-red-800">
          <RiLogoutBoxLine size={20} />
          Logout
        </button>
      </header>
    </>
  );
};

export default AdminHeader;
