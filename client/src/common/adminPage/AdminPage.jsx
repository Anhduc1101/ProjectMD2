import React from "react";
import "./adminPage.css";

import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";

export default function AdminPage() {
  return (
    <>
      <div className="d-container">
        <Sidebar />
        <div className="d-header">
          <Header />
          <div className="d-contents">
            <div className="d-table">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
}
