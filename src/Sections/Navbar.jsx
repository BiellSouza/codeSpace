import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

function Navbar() {
  return (
    <div className="min-h-screen text-light">
      <Sidebar />

      <main className="ml-64 min-h-screen min-w-0 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Navbar;
