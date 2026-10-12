import "./../src/index.css";
import React from "react";
import Navbar from "./Sections/Navbar";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Sections/Dashboard";
import Board from "./Sections/Board";
import MyTasks from "./Sections/MyTasks";

function Index() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/board" element={<Board />}></Route>
            <Route path="/mytasks" element={<MyTasks />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;
