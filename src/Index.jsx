import React from "react";
import "./../src/index.css";
import Board from "./Sections/Board";
import Sprint from "./Sections/Sprint";
import Navbar from "./Sections/Navbar";
import MyTasks from "./Sections/MyTasks";
import { Outlet } from "react-router-dom";
import Dashboard from "./Sections/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PullRequests from "./Sections/PullRequests";

function Index() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/board" element={<Board />}></Route>
            <Route path="/mytasks" element={<MyTasks />}></Route>
            <Route path="/sprint" element={<Sprint />}></Route>
            <Route path="/pullrequests" element={<PullRequests />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;
