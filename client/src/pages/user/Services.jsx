import React from "react";
import Header from "../../common/header/Header";
import Section from "../../common/Section";
import Reason from "../content/Reason";
import Footer from "../../common/Footer";
import Help from "../content/Help";

export default function Services() {
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
                  <h1>Services</h1>
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

      <Help />
      {/* <Reason /> */}
      <Footer />
    </>
  );
}
