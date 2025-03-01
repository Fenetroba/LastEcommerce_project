import React, { useState } from "react";
import "./Css/login.css";
import { Login_LanguageAmharic,Login_LanguageEnglish,Login_LanguageOromic } from "../../component/config/config";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/Store/UserAuth";
import toast from "react-hot-toast";
import Loder from "../../component/loder/Loder";

const Login = () => {
  const { loading } = useSelector((stat) => stat.Auth);
  const Dispatch = useDispatch();
  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });
console.log(loading)
  const submitHundler = (e) => {
    e.preventDefault();
    Dispatch(loginUser(Login)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Succsess fully You Login");
      } else {
        toast.error(data.payload);
      }
      setLogin("");
    });
  };
  return (
    <div className="login_top">
      <div className="login_contener">
        <h1>Login Page</h1>
        <form onSubmit={submitHundler} className="login_form">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="YouEmail@gmail.com"
            id="email"
            required
            onChange={(e) => setLogin({ ...Login, email: e.target.value })}
          />
          <label>password</label>
          <input
            type="password"
            placeholder="..........."
            id="password"
            required
            onChange={(e) => {
              setLogin({ ...Login, password: e.target.value });
            }}
          />
          <button className="Loedbtn">{loading?<Loder/>:"Login"}</button>
        </form>
        <div className="directLogiOrSign">
                 {loading?"": <span> I Am Not A Member ?<Link to="/auth/signup">Sign Up</Link></span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
