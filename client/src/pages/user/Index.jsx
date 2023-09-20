import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import Section from "../../common/Section";
import Footer from "../../common/Footer";
import Testimonial from "../content/Testimonial";
import Reason from "../content/Reason";
import Help from "../content/Help";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormatMoney } from "./../../utils/formatMoney";

export default function Index() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Header />
      {/* <Section /> */}
      <>
        {/* Start Hero Section */}
        <div className="hero">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="intro-excerpt">
                  <h1>
                    Modern Interior <span clsas="d-block">Design Studio</span>
                  </h1>
                  <p className="mb-4">
                    Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                    aliquet velit. Aliquam vulputate velit imperdiet dolor
                    tempor tristique.
                  </p>
                  <p>
                    <a href="" className="btn btn-secondary me-2">
                      Shop Now
                    </a>
                    <a href="#" className="btn btn-white-outline">
                      Explore
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="hero-img-wrap">
                  <img src="images/couch.png" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Hero Section */}
      </>

      {/* Start Shop */}
      <div
        className="untree_co-section product-section "
        style={{ marginTop: 0 }}
      >
        <div className="container">
          <div className="row">
            {/* Start Column 1 */}
            {product.splice(0, 8).map((pro) => (
              <div className="col-12 col-md-4 col-lg-3 ">
                <Link
                  to="/shop"
                  className="product-item"
                  style={{ marginBottom: 50 }}
                >
                  <img
                    style={{
                      borderRadius: 10,
                      width: 220,
                      height: 220,
                      objectFit: "cover",
                    }}
                    src={pro.image}
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">{pro.product_name}</h3>
                  <strong className="product-price">
                    {FormatMoney(pro.price)}
                  </strong>
                  <span className="icon-cross">
                    <img src="images/cross.svg" className="img-fluid" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* End Shop */}
      <Reason />
      <Help />
      <Testimonial />
      <Footer />
    </>
  );
}
