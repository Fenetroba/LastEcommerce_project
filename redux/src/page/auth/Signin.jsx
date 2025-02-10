import React, { useState } from "react";
import "./Css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../app/Store/UserAuth.js";
import toast from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    UserName: "",
    password: "",
    email: "",
  });
  const Dispatch = useDispatch();
  const submitHundler = (e) => {
    e.preventDefault();
    Dispatch(signupUser(form)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Succsess fully You Rgisterd");
        navigate("/auth/login");
      }
      else{
        toast.error("some thing is wrong")
      }
    });
  };
  return (
    <div className="signup__top">
      <div className="signup_contener">
        <h2>Create an Account</h2>
        <form onSubmit={submitHundler} className="signUp_form">
          <label>Full Name</label>
          <input
            id="name"
            required
            type="text"
            placeholder="Fenet Roba"
            value={form.name}
            onChange={(e) => setForm({ ...form, UserName: e.target.value })}
          />
          <label>Email Address</label>
          <input
            type="email"
            placeholder="YouEmail@gmail.com"
            id="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="..........."
            id="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button>Sign Up</button>
        </form>

        <div className="directLogiOrSign">
          Alredy Have an Account ? <Link to="/auth/login">Login Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
