import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";

import { Button, Pagination } from "antd";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Description from "./../../../../../shopping_cart_redux/src/pages/Description";
import { FormatMoney } from './../../utils/formatMoney';

export default function Shop() {
  // sử dụng hook thông thường
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [description, setDescription] = useState("");
  const { id } = useParams();
  console.log(description);
  // do ra trang description
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => setDescription(response.data))
      .catch((error) => console.log(error));
  }, []);

  //  lay ra danh sach taats ca category
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  // lay ra id cua category
  const getCategoryId = (id) => {
    setCategoryId(id);
  };

  // gọi API lấy thông tin tất cả sản phẩm
  const loadDataProduct = () => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        // neu khong co categoryId

        if (categoryId == 0) {
          setProducts(response.data);
        } else {
          const listProduct = response.data.filter(
            (pro) => pro.category_id === categoryId
          );
          console.log(listProduct);
          // sau moi lan loc thi set lai
          setProducts(listProduct);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadDataProduct();
  }, [categoryId]);

  // Tinh toan chi muc san pham bat dau va chi muc san pham ket thuc
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedProducts = products.slice(startIndex, endIndex);

  // xu ly su kien khi thay doi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              backgroundColor: "#fff",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              width: "20vw",
            }}
          >
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              <li
                style={
                  categoryId === 0
                    ? { backgroundColor: "RGB(218, 165, 32)", color: "#fff" }
                    : {}
                }
                onClick={() => setCategoryId(0)}
                className="p-3 hover:bg-slate-100 cursor-pointer"
              >
                All
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.category_id}
                  onClick={() => getCategoryId(cat.category_id)}
                  style={
                    categoryId === cat.category_id
                      ? { backgroundColor: "RGB(218, 165, 32)", color: "#fff" }
                      : {}
                  }
                  className="p-3 hover:bg-slate-100 cursor-pointer"
                >
                  {cat.category_name}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              width: "80vw",
              padding: "30px 20px 0px 50px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gap: 5,
            }}
          >
            {displayedProducts.map((pro, index) => (
              <div
                key={index}
                className="w-1/5 border h-96"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  width: 200,
                  height: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "5px",
                  borderRadius: 5,
                  marginBottom: 5,
                }}
              >
                <img height={200} src={pro.image} alt="Ảnh sản phẩm" />
                <h5 className="text-center py-3"> {pro.product_name}</h5>
                <div className="text-center py-1">{FormatMoney(pro.price)}</div>
                <div className=" py-3 text-center ">
                  <Button
                    style={{
                      backgroundColor: "RGB(59, 93, 80)",
                      color: "white",
                    }}
                  >
                    <Link
                      to={`/description/${pro.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      Detail
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={products.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
