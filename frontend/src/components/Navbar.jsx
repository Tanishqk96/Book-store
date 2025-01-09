import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import DarkModeToggle from './Darkmodetoggle';
import { FaRegPlusSquare } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 dark:bg-gray-700 text-white py-5">
      <div className="max-w-9xl mx-auto px-4 flex justify-between items-center">
        <div className='text-3xl font-bold flex gap-4'>
            <Link to={"/"}><h3>PRODUCT STORE</h3></Link>
            <MdOutlineLocalGroceryStore className='mt-1 text-yellow-500'/>
        </div>
        <div className='flex gap-4'>
            <Link to={"/create"}>
                <FaRegPlusSquare className='text-4xl mt-0.5'/>
            </Link>
            <DarkModeToggle/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
