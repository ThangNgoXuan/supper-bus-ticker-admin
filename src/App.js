import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import Login from "./pages/Login";
import MainLayout from "./Layout";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<MainLayout />}></Route>
      </Routes>
    </div>
  );
}
