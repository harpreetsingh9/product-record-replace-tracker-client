import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import FindNum from "./pages/FindNum";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <p className="text-red-500 sm:px-8 sm:my-2 px-4">This is a demo project</p>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<FindNum />} />
          <Route path="/add" element={<Add />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
