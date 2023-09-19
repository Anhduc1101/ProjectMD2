import React, { useEffect, useState } from "react";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
// import "./register.css";
import Header from "../../../common/header/Header";
import Section from "../../../common/Section";
import Footer from "../../../common/Footer";
import { storage } from "../../../firebase/configFbase";
import { Link } from "react-router-dom";

export default function Register() {
  const [gender, setGender] = useState(0);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  // tao 1 tham chieu den thu muc chua kho anh tren firebase
  const imageListRef = ref(storage, "images/");

  // ham upload được file lên firebase
  //   const uploadFiles = (files) => {
  //     // phai xu ly dc tac vu them nhieu file => bat dong bo => phai su dung promise
  //     Promise.all(
  //       files.map((file) => {
  //         // tao mot tham chieu <=> tao folder tren firebase
  //         const imageRef = ref(storage, `images/${file.name}`);
  //         return uploadBytes(imageRef, file).then((snapshot) => {
  //           return getDownloadURL(snapshot.ref);
  //         });
  //       })
  //     ).then((urls) => {
  //       // tra ve danh sach cac urls
  //       setImageUrls((prev) => [...prev, urls]);
  //     });
  //   };
  const uploadFiles = (files) => {
    // Chỉ lấy file đầu tiên trong danh sách files
    const file = files;

    const imageRef = ref(storage, `images/${file.name}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        // Ghi đè ảnh trước đó bằng ảnh mới
        setImageUrls([url]);
      })
      .catch((error) => {
        // Xử lý lỗi (nếu có)
        console.log(error);
      });
  };

  const handleSelectFiles = (e) => {
    // lấy tất cả giá trị trong ô input có type "file"
    const files = e.target.files[0];
    // console.log(files);
    setImageUpload(files);
  };

  // ham click vao nut upload thi tien hanh upload anh len firebase
  const handleUpload = () => {
    // console.log(e.target.files[0]);
    if (!imageUpload) {
      return;
    } else {
      uploadFiles(imageUpload);
    }
  };

  // lay url tren firebase
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      // response tra ve la 1 mang danh sach cac url
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          // danh sach url
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  // danh sach gender
  const listGender = [
    {
      id: 0,
      title: "Nam",
    },
    {
      id: 1,
      title: "Nữ",
    },
    {
      id: 2,
      title: "Khác",
    },
  ];

  const [user, setUser] = useState({
    user_name: "",
    gender: 0,
    dateOfBirth: "",
    email: "",
    address: "",
    password: "",
    role: 1,
    avatar: "",
    confirmPassword: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // ham validate du lieu
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "user_name":
        if (!valueInput) {
          setUsernameError("Tên không được để trống");
          return;
        } else {
          setUsernameError("");
          return;
        }
      case "email":
        if (!valueInput) {
          setEmailError("Email không được để trống");
          return;
          // } else if (valueInput.test(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          //   setEmailError("Email không đúng định dạng");
        } else {
          setEmailError("");
          return;
        }
      case "password":
        if (!valueInput) {
          setPasswordError("Password không được để trống");
          return;
        } else if (valueInput.length < 4) {
          setPasswordError("Password tối thiểu 4 ký tự");
        } else {
          setPasswordError("");
          return;
        }
      case "confirmPassword":
        if (!valueInput) {
          setConfirmPasswordError("Mật khẩu không được để trống");
          return;
        } else if (valueInput !== user.password) {
          setConfirmPasswordError("Mật khẩu không khớp");
          return;
        } else {
          setConfirmPasswordError("");
        }
        break;
      default:
        break;
    }
  };

  // ham lay du lieu tu o input
  const handleChange = (e) => {
    const { name, value } = e.target;
    validateData(name, value);
    setUser({ ...user, [name]: value });
  };

  // ham submit
  const handleSubmit = (e) => {
    e.preventDefault();
    validateData("user_name", user.user_name);
    validateData("email", user.email);
    validateData("password", user.password);
    validateData("confirmPassword", user.confirmPassword);
    // console.log(user);
    if (user.user_name && user.email && user.password && user.confirmPassword) {
      const newUser = {
        user_name,
        gender,
        dateOfBirth,
        email,
        address,
        password,
        role: 1,
        avatar,
      };
    }
  };
  return (
    <>
      <Header />
      {/* <Section /> */}
      <div
        className="container-login"
        style={{ width: 800, margin: "20px auto" }}
      >
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <h3 style={{ textAlign: "center" }}>Đăng ký</h3>
            {/* <div className="btn btn-close"></div> */}
          </div>
          <div className="d-flex justify-content-between gap-10">
            <div className="w-50 me-3">
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="user_name">
                  Tên đăng ký <span className="text-danger">*</span>
                </label>
                <input
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Nhập tên đăng ký"
                />
                {usernameError && (
                  <div className="text-err mt-1">{usernameError}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="email">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Nhập email"
                />
                {emailError && (
                  <div className="text-err mt-1">{emailError}</div>
                )}
              </div>
              <div className="d-flex flex-column">
                <label htmlFor="gender" className="form-label me-4">
                  Giới tính
                </label>
                <div className="d-flex">
                  {listGender.map((g) => (
                    <div className="form-check me-3" key={g.id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={g.id === gender}
                        name="gender"
                        onChange={() => setGender(g.id)}
                      />
                      <label className="form-check-label" htmlFor="gender">
                        {g.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group mb-2 mt-2">
                <label className="form-label" htmlFor="dateOfBirth">
                  Ngày sinh
                </label>
                <input
                  onChange={handleChange}
                  className="form-control"
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  placeholder="Nhập ngày sinh"
                />
              </div>
            </div>
            <div className="w-50">
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="avatar">
                  Ảnh đại diện
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <img
                    src={imageUpload ? URL.createObjectURL(imageUpload) : ""}
                    alt="avatar"
                    width={200}
                  />
                </div>
                <input type="file" onChange={handleSelectFiles} />
                <button onClick={handleUpload}>Upload</button>
              </div>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Nhập địa chỉ"
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="password">
                  Mật khẩu <span className="text-danger">*</span>
                </label>
                <input
                  onChange={handleChange}
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                />
                {passwordError && (
                  <div className="text-err mt-1">{passwordError}</div>
                )}
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="confirmPassword">
                  Xác nhận mật khẩu <span className="text-danger">*</span>
                </label>
                <input
                  onChange={handleChange}
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Nhập mật khẩu"
                />
                {confirmPasswordError && (
                  <div className="text-err mt-1">{confirmPasswordError}</div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-2">
            <button className="btn btn-primary w-100">Đăng ký</button>
          </div>
          <p className="p-2 text-center">
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>{" "}
          </p>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
}
