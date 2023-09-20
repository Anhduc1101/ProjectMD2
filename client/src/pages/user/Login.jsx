import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/configFbase";
import { Input } from "antd";
import { Button } from "antd";
import Header from "../../common/header/Header";
import Footer from "../../common/Footer";
import Password from "antd/es/input/Password";
import { validateEmail, validatePassword } from "../../utils/validateData";

export default function Login() {
  const navigate = useNavigate();

  //dang nhap voi API
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChangeInput = (e) => {
    // console.log(e.target);
    // lay name vs value tu input
    const { value, name } = e.target;
    // kiem tra name va gan gia tri
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  // ham validate du lieu
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "email":
        if (valueInput === "") {
          setEmailError("Please enter a valid email");
        } else if (!validateEmail(valueInput)) {
          setEmailError("ko dung dinh dang");
        } else {
          setEmailError(null);
        }
        return;
      case "password":
        if (valueInput === "") {
          setPasswordError("Please enter a valid password");
        } else if (!validatePassword(valueInput)) {
          setPasswordError("ko dung dinh dang");
        } else {
          setPasswordError(null);
        }
        return;

      default:
        break;
    }
  };

  // ham onsubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    validateData("email", email);
    validateData("password", password);
    if (email && password) {
      const newUser = {
        email,
        password,
      };
      console.log(newUser);
    }
  };

  // ddang nhap voi google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
        const userLogin = {
          email: response.user.email,
          username: response.user.displayName,
          image: response.user.photoURL,
          userId: response.user.uid,
        };
        //luu thong tin len local
        localStorage.setItem("userLogin", JSON.stringify(userLogin));
        // chuyen huong ve trang home
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen w-50 mt-5 m-auto">
        <form className="p-6 border rounded px-3 py-3" onSubmit={handleSubmit}>
          <h3 className="text-center">Log In</h3>
          <div className="mb-4 ">
            <label htmlFor=""> Email</label>
            <Input
              type="email"
              status="error"
              id="email"
              className={`mt-2 ${emailError}`}
              placeholder="Enter email..."
              value={email}
              onChange={handleChangeInput}
              name="email"
            />
            {emailError && (
              <div className="mt-1 text-red-400">{emailError}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor=""> Password</label>
            <Input
              type="password"
              status="error"
              id="password"
              className={`mt-2 ${passwordError}`}
              placeholder="Enter password..."
              value={password}
              onChange={handleChangeInput}
              name="password"
            />
            {passwordError && (
              <div className="mt-1 text-red-400">{passwordError}</div>
            )}
          </div>
          <div className="mt-2">
            <button
              style={{ alignItems: "center", width: "100%" }}
              className=""
              type="submit"
            >
              {" "}
              Log In
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Link to="/">Back</Link>
            <Link to="/forget-password">Forgot Password?</Link>
          </div>
          <div className="text-center mt-2">
            <span>Or</span>
          </div>
          <div className="mt-2">
            <Button
              onClick={signInWithGoogle}
              style={{ alignItems: "center", width: "100%", marginBottom: 10 }}
            >
              {" "}
              <img
                style={{ marginRight: 10 }}
                height={20}
                width={20}
                src="data:image/png;base64,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"
              />{" "}
              Sign In With Google
            </Button>

            <div className="mt-2">
              You have not an account? <Link to="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
}
