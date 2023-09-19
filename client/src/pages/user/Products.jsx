import React from "react";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer";
import { Pagination, Menu, Input } from "antd";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Wood Sofa"),
  getItem("Felt Sofa"),
  getItem("Leather Sofa"),
];

const { Search } = Input;

export default function Products() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div>
      <Header />
      {/* Start Hero Section */}
      {/* <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Products</h1>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src="images/couch.png" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* End Hero Section */}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div className="left">
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </div>

        <div
          className="right"
          style={{ marginLeft: "20px", marginRight: "20px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
            <Pagination defaultCurrent={6} total={500} />
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card my-2 shadow-0">
                <Link to="/description" className="img-wrap">
                  <img 
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/12.webp"
                    className="card-img-top"
                    style={{
                      aspectRatio: "1 / 1",
                  
                    }}
                  />
                </Link>
                <div className="card-body p-0 pt-3">
                  <a
                    href="#!"
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-heart fa-lg px-1 text-secondary" />
                  </a>
                  <h5 className="card-title">$29.95</h5>
                  <p className="card-text mb-0">GoPro action camera 4K</p>
                  <p className="text-muted">Model: X-200</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card my-2 shadow-0">
                <a href="#" className="img-wrap">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp"
                    className="card-img-top"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </a>
                <div className="card-body p-0 pt-2">
                  <a
                    href="#!"
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-heart fa-lg px-1 text-secondary" />
                  </a>
                  <h5 className="card-title">$590.00</h5>
                  <p className="card-text mb-0">Canon EOS professional</p>
                  <p className="text-muted">Capacity: 128GB</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card my-2 shadow-0">
                <a href="#" className="img-wrap">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                    className="card-img-top"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </a>
                <div className="card-body p-0 pt-2">
                  <a
                    href="#!"
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-heart fa-lg px-1 text-secondary" />
                  </a>
                  <h5 className="card-title">$29.95</h5>
                  <p className="card-text mb-0">Modern product name here</p>
                  <p className="text-muted">Sizes: S, M, XL</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card my-2 shadow-0">
                <a href="#" className="img-wrap">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                    className="card-img-top"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </a>
                <div className="card-body p-0 pt-2">
                  <a
                    href="#!"
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-heart fa-lg px-1 text-secondary" />
                  </a>
                  <h5 className="card-title">$1099.00</h5>
                  <p className="card-text mb-0">Apple iPhone 13 Pro max</p>
                  <p className="text-muted">Color: Black, Memory: 128GB</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card my-2 shadow-0">
                <a href="#" className="img-wrap">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp"
                    className="card-img-top"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </a>
                <div className="card-body p-0 pt-2">
                  <a
                    href="#!"
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-heart fa-lg px-1 text-secondary" />
                  </a>
                  <h5 className="card-title">$29.95</h5>
                  <p className="card-text mb-0">Modern product name here</p>
                  <p className="text-muted">Sizes: S, M, XL</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card my-2 shadow-0">
                <a href="#" className="img-wrap">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/6.webp"
                    className="card-img-top"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </a>
                <div className="card-body p-0 pt-2">
                  <a
                    href="#!"
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-heart fa-lg px-1 text-secondary" />
                  </a>
                  <h5 className="card-title">$29.95</h5>
                  <p className="card-text mb-0">Modern product name here</p>
                  <p className="text-muted">Model: X-200</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card my-2 shadow-0">
                <a href="#" className="img-wrap">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp"
                    className="card-img-top"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </a>
                <div className="card-body p-0 pt-2">
                  <a
                    href="#!"
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-heart fa-lg px-1 text-secondary" />
                  </a>
                  <h5 className="card-title">$29.95</h5>
                  <p className="card-text mb-0">Modern product name here</p>
                  <p className="text-muted">Sizes: S, M, XL</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card my-2 shadow-0">
                <a href="#" className="img-wrap">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                    className="card-img-top"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </a>
                <div className="card-body p-0 pt-2">
                  <a
                    href="#!"
                    className="btn btn-light border px-2 pt-2 float-end icon-hover"
                  >
                    <i className="fas fa-heart fa-lg px-1 text-secondary" />
                  </a>
                  <h5 className="card-title">$29.95</h5>
                  <p className="card-text mb-0">Modern product name here</p>
                  <p className="text-muted">Material: Jeans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
