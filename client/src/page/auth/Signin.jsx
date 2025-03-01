import React, { useState ,useEffect} from "react";
import "./Css/signup.css";
import {signup_LanguageEnglish ,signup_LanguageAmharic,signup_LanguageOromice} from '../../component/config/config.js'
import Loder from "../../component/loder/Loder.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../app/Store/UserAuth.js";
import toast from "react-hot-toast";
const Signup = ({selectedLanguage}) => {
  
  let language;
  if(selectedLanguage =="English"){
    language=signup_LanguageEnglish;
  }else if(selectedLanguage=="Amharic"){
    language=signup_LanguageAmharic;
  }
  else{
    language=signup_LanguageOromice;

  }

  const { user, isAuthenticated, loading } = useSelector((state) => state.Auth);
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
      } else {
        toast.error("some thing is wrong");
      }
    });
  };
  return (
    <div className="signup__top">
      {language=
        <div className="signup_contener" key={language.id}>
          <h2>{language.signUpCreate}</h2>
          <form onSubmit={submitHundler} className="signUp_form">
            <label>{language.lableName}</label>
            <input
              id="name"
              required
              type="text"
              placeholder={language.placeholderName}
              value={form.name}
              onChange={(e) => setForm({ ...form, UserName: e.target.value })}
            />
            <label>{language.lableEmail}</label>
            <input
              type="email"
              placeholder={language.placeholderEmail}
              id="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label>{language.lablePassword}</label>
            <input
              type="password"
              placeholder="..........."
              id="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className="Loedbtn">
              {loading ? <Loder /> :(language.buttonSignUp)}
            </button>
          </form>

          <div className="directLogiOrSign">
            {loading ? (
              ""
            ) : (
              <span>
                {language.askIhave}<Link to="/auth/login">{language.ihaveAccount}</Link>
              </span>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default Signup;
