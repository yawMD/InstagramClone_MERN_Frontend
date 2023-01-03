import React, { useState, useEffect } from "react";
import login from "./login.module.css";
import logo from "../../assets/insta.png";
import { postData } from "../../Helpers/requests";
import { authenticate, isAuth } from "../../Helpers/auth";
import axios from 'axios'
import {
  Link,
 useHistory
} from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();


  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/home");
    }
  }, []);

  

  const submitHandler = async(e) => {
    e.preventDefault();
   
    
    // let result = await fetch("http://localhost:4000/user/login",
    // {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     method: "POST",
    //     body: JSON.stringify({email,password})                    
    // });
    // result = await result.json()
  
    // if(result){
    //   history.push("/")
    // }             
    console.log(email,password)

    if (email && password) {
     const tld = toast.loading("Logging you in... Please wait");

    try {

      const res = await axios.post('http://localhost:4000/user/login', {email: email, password: password})

          toast.update(tld, {
            render: `Login Successful`,
            type: "success",
            isLoading: false,
          });
          authenticate(res.data, () => {
            console.log(res.data)
            let _d = isAuth();
            console.log(_d)
            if(_d){
              history.push("/");
            }
          })
        
    }catch(e) {
      toast.update(tld, {
              render: `Error: `,
              type: "error",
              isLoading: false,
            });
    }

     
   
      // postData("/user/login", { email, password }).then((data) => {
      //   console.log(data);
      //   if(data.error){
      //     toast.update(tld, {
      //       render: `Error: ${data.message} `,
      //       type: "error",
      //       isLoading: false,
      //     });
      //   }else{
      
      // }) 
      // .finally((e) => {
      //   setTimeout(() => {
      //     toast.dismiss(tld);
      //   }, 2000);
      // });
    }
  };

  return (
    <>
    <ToastContainer />
      <div className={login.container}>
        <div className={login["sub-container"]}>
          <div className={login.image}>
            <img
              src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"
              alt=""
              width="100%"
            />
          </div>
          <div className={login.overallpanel}>
            <div className={login.panel}>
              <img src={logo} alt="" width="50%" />
              <form onSubmit={submitHandler} className={login.Inputs}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Phone number, username or email"
                />
                <input
                  value={password}
                  type="password"
                  required
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log in</button>
              </form>
              <div className={login.noborder}>
                <div className={login.line}></div>
                OR
                <div className={login.line}></div>
              </div>
              <div>
                <p className={login.big}>Log in with facebook</p>
                <p className={login.small}>Forgot password?</p>
              </div>
            </div>

            <div className={login.sign}>
              <p>Don't have an account? 
              <Link
              to="/signup"
              >
              Sign up
              </Link>
              </p>
            </div>
            <div className={login.signin}>
              <p>Get the app</p>
            </div>
            <div className="flex items-center justify-center">
              <img className="m-4"
                draggable="false"
                width="130px"
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                alt="appstore"
              />
              <img
              className="m-4"
                draggable="false"
                width="130px"
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                alt="playstore"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
