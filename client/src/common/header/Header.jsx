import React from "react";
import { Button, Dropdown, Modal } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { KeyOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import "./header.css";

export default function Header() {
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
      {/* Start Header/Navigation */}
      <nav
        className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark text-white"
        arial-label="Furni navigation bar"
      >
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            Furni<span>.</span>
          </NavLink>
          <Button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsFurni"
            aria-controls="navbarsFurni"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </Button>
          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <NavLink to="/" className="nav-link" href="index.html">
                <li className="nav-item ">Home</li>
              </NavLink>
              <NavLink to="/products" className="nav-link" href="shop.html">
                <li>Products</li>
              </NavLink>
              <NavLink to="/about" className="nav-link" href="about.html">
                <li>About us</li>
              </NavLink>
              <NavLink to="/services" className="nav-link" href="services.html">
                <li>Services</li>
              </NavLink>
              <NavLink to="/blog" className="nav-link" href="blog.html">
                <li>Blog</li>
              </NavLink>
              <NavLink to="/contact" className="nav-link" href="contact.html">
                <li>Contact us</li>
              </NavLink>
              {userLogin !== null ? (
                <>
                  {" "}
                  <NavLink className="nav-link" to="/cart">
                    <li>
                      <img src="images/cart.svg" />
                    </li>
                  </NavLink>
                  <li className="d-flex align-items-center gap-2">
                    {userLogin.username}
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
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" className="nav-link">
                      Log In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* End Header/Navigation */}
    </>
  );
}
