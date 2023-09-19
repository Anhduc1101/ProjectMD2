import React from "react";
import "./adminPage.css";
import {
  AppstoreAddOutlined,
  BellOutlined,
  DollarCircleOutlined,
  KeyOutlined,
  LogoutOutlined,
  MessageOutlined,
  ShoppingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Dropdown, Input, Modal } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserManagement from "../../pages/private/admin/user-manager/UserManagement";
import OrderManagement from "../../pages/private/admin/order-manager/OrderManagement";
import CategoryManagement from "../../pages/private/admin/category-manager/CategoryManagement";
import ProductManagement from "../../pages/private/admin/product-manager/ProductManagement";
const { Search } = Input;

export default function AdminPage() {
  // navbar search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // navbar rpofile
  const navigate = useNavigate();
  // lay thong tin user dang dang nhap
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  // ham dang xuat
  const handleLogout = () => {
    // xoa du lieu khoi local
    localStorage.removeItem("userLogin");
    // chuyen ve trang chu
    navigate("/");
  };

  // ham xu ly dang xuat
  const handleConfirmLogout = () => {
    Modal.confirm({
      title: "Attention !!!",
      content: "You want to log out, sure you???",
      onOk() {
        handleLogout();
      },
      cancelText: "Cancel",
      okText: "Log out",
    });
  };
  const items = [
    {
      key: "1",
      label: (
        <Link
          to="/profile"
          style={{ textDecoration: "none", display: "flex", gap: 5 }}
        >
          <UserOutlined className="mr-3" />
          My Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to="/change-password"
          style={{ textDecoration: "none", display: "flex", gap: 5 }}
        >
          <KeyOutlined className="mr-3" />
          Change Password
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          onClick={handleConfirmLogout}
          style={{ textDecoration: "none", display: "flex", gap: 5 }}
        >
          <LogoutOutlined className="mr-3" />
          Log Out
        </Link>
      ),
    },
  ];

  return (
    <>
      {/* Sidebar Start */}
      <div className="d-container">
        <div className="d-sidebar">
          <div className="d-logo">
            <h3 className="d-tittle">Furni</h3>
            <h3 style={{ color: "RGB(137, 158, 150)" }}>.</h3>
          </div>
          <div className="d-container-sidebar">
            <div className="d-content">
              <UsergroupAddOutlined style={{ color: "white" }} />
              <p>Users Managerment</p>
            </div>
            <div className="d-content">
              <ShoppingOutlined style={{ color: "white" }} />
              <p>Products Managerment</p>
            </div>
            <div className="d-content">
              <AppstoreAddOutlined style={{ color: "white" }} />
              <p>Categories Managerment</p>
            </div>
            {/* <div className="d-content">
              < UsergroupAddOutlined style={{color:"white"}} />
              <p>Stock Managerment</p>
            </div> */}
            <div className="d-content">
              <DollarCircleOutlined style={{ color: "white" }} />
              <p>Orders Managerment</p>
            </div>
          </div>
        </div>
        <div>
          <div className="d-navbar">
            <div className="d-box">
              <div className="d-box-left">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  enterButton
                />
              </div>
            </div>

            <div className="d-box">
              <div className="d-box-right">
                <MessageOutlined style={{ color: "black" }} />
                <p className="mb-0">Message</p>
              </div>
              <div className="d-box-right">
                <BellOutlined style={{ color: "black" }} />
                <p className="mb-0">Notification</p>
              </div>
              <div className="d-box-right">
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                  arrow
                >
                  <img
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 50,
                    }}
                    src={userLogin.image}
                  />
                </Dropdown>
                {userLogin.username}
              </div>
            </div>
          </div>
          <div className="d-contents">
            <div className="d-table">
              <Outlet />
              {/* <UserManagement /> */}
              {/* <OrderManagement/> */}
              {/* <CategoryManagement /> */}
              {/* <ProductManagement /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar End */}
    </>
  );
}
