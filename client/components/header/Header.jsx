import React from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Modal, Input } from "antd";
import { BellOutlined, KeyOutlined, LogoutOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";

const { Search } = Input;
export default function Header() {
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
    </>
  );
}
