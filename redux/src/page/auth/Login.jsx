import React, { useState } from "react";
import "./Css/login.css"
// import { FaArrowRight, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useDispatch}from 'react-redux'
import { loginUser } from "../../app/Store/UserAuth";
import toast from 'react-hot-toast'

const Login = () => {
  const Dispatch=useDispatch()
  const [Login, setLogin] = useState({
    email:'',
    password:''
  });


  
  const submitHundler = (e) => {
    e.preventDefault();
    Dispatch(loginUser(Login)).then((data)=>{
 
      if(data?.payload?.success){
        toast.success("Succsess fully You Login");
      }
      else{
        toast.error(data.payload)
      }
      setLogin('')

    })
   
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
           onChange={(e)=>setLogin({...Login,email:e.target.value})}
          />
          <label>password</label>
          <input
            type="password"
            placeholder="..........."
            id="password"
            required
           onChange={(e)=>{setLogin({...Login,password:e.target.value})}}
          />
           <button>
           Login
          </button>
        
        </form>
        <div className="directLogiOrSign">
          I Am Not A Member ?
          <Link to="/auth/signup">Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
