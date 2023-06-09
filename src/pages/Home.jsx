import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center text-center justify-start gap-10">
      <Link
          to="/add"
          className="w-1/2 shadow-lg
          font-inter font-bold bg-[#6469ff] 
          text-white px-4 py-6 text-2xl  rounded-md
          "
        >
          ADD
        </Link>
        <Link
          to="/find"
          className=" w-1/2
          font-inter font-bold bg-[#6469ff] 
          text-white px-4 py-6 rounded-md text-2xl shadow-lg
          "
        >
          FIND
        </Link>
        <Link
          to="/upload"
          className="w-1/2 shadow-lg
          font-inter font-bold bg-[#6469ff] 
          text-white px-4 py-6 rounded-md text-2xl
          "
        >
          UPLOAD
        </Link>
    </div>
  );
};

export default Home;
