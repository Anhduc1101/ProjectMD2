import React from "react";
import "./sidebar.css";
import {
  AppstoreAddOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="d-sidebar">
        <div className="d-logo">
          <h3 className="d-tittle" style={{ fontSize: 45 }}>
            Furni<span style={{ color: "RGB(137, 158, 150)" }}>.</span>
          </h3>
          {/* <span
            style={{
              position: "absolute",
              left: 150,
              top: 50,
              color: "white",
              font: 24,
            }}
          >
            Management Page
          </span> */}
        </div>
        <div className="d-container-sidebar">
          <NavLink to="user" className="d-content">
            <UsergroupAddOutlined style={{ color: "white" }} />
            <p>Users Management </p>
          </NavLink>
          <NavLink to="product" className="d-content">
            <ShoppingOutlined style={{ color: "white" }} />
            <p>Products Management </p>
          </NavLink>
          <NavLink to="category" className="d-content">
            <AppstoreAddOutlined style={{ color: "white" }} />
            <p>Categories Management </p>
          </NavLink>
          {/* <div className="d-content">
              < UsergroupAddOutlined style={{color:"white"}} />
              <p>Stock Managerment</p>
            </div> */}
          <NavLink to="order" className="d-content">
            <DollarCircleOutlined style={{ color: "white" }} />
            <p>Orders Management </p>
          </NavLink>
        </div>
      </div>
    </>
  );
}
