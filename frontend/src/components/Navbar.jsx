import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import DarkModeToggle from './Darkmodetoggle';
import { FaRegPlusSquare } from "react-icons/fa";
import product from '../../../models/product.model';
import logo from '../images/logo.webp'
const Navbar = () => {
  return (
    <nav className="bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-200 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="flex items-center gap-3 hover:text-yellow-400 transition-all duration-300">
            <img src={logo} alt="Book Byte Logo" className="w-14 h-14 object-cover rounded-full border-2 border-yellow-500" />
            <h3 className="text-2xl font-semibold tracking-wide">Book Byte</h3>
          </Link>
          <MdOutlineLocalGroceryStore className="mt-1 text-yellow-500 text-4xl" />
        </div>
        <div className="flex gap-6 items-center">
          <Link to={"/create"}>
            <FaRegPlusSquare className="text-4xl hover:text-yellow-400 transition-all duration-300" />
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
