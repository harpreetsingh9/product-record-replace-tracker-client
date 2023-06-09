import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/compressor.png"

const Navbar = () => {
  return (
    <div
      className="w-full flex justify-between items-center bg-white sm:px-8 
    px-4 py-4 border-b border-b-[#e6ebf4]"
    >
      <Link to="/" className="flex items-center gap-1">
        <img className=" w-[32px] h-[32px]" src={logo} alt="comp logo" />
        Compressor Record
        </Link>
      <div className="gap-1 flex">
        <Link
          to="/"
          className="
          font-inter font-medium bg-[#6469ff] 
          text-white px-4 py-2 rounded-md
          "
        >
          Add
        </Link>
        <Link
          to="/find"
          className="
          font-inter font-medium bg-[#6469ff] 
          text-white px-4 py-2 rounded-md
          "
        >
          Find
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
