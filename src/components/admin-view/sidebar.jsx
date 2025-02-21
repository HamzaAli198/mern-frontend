import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import pic1 from "../../images/pic1.jpg";

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <FaHome size={30} />, path: "/admin/dashboard" },
    {
      name: "Products",
      icon: <FaShoppingBag size={30} />,
      path: "/admin/products",
    },
    { name: "Orders", icon: <FaTableList size={30} />, path: "/admin/orders" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  return (
    <>
      <aside
        className={`fixed md:relative inset-y-0 left-0 bg-gray-800 text-white w-64 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button for Mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 md:hidden">
          <h2 className="text-lg text-white font-semibold">Admin Panel</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <IoIosCloseCircle size={24} className="text-white" />
          </button>
        </div>

        <div className="flex items-center justify-center mt-5">
          <img
            className="w-[150px] h-[150px] rounded-full"
            src={pic1}
            alt="sidebar image"
          />
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <div
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-700 cursor-pointer"
                >
                  {item.icon}
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
