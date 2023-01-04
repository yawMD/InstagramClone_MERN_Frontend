import React, { useState,useRef } from "react";
import login from "./login.module.css";
import logo from "../../assets/insta.png";
import {isAuth} from "../../Helpers/auth"


// import { postData } from "../../Helpers/requests";

import {
  Link,
 useHistory,
 Redirect
} from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";


// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const SignUp = () => {
    const userRef = useRef()
    const h = useHistory();

    const [email, setEmail] = useState("");
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [password, setPassword] = useState("");
    
    const [confirmpassword, setConfirmpassword] = useState("");
  
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
 
     const [type, setType] = useState("user");

  


  const submitHandler = async(e) => {
    e.preventDefault();
    console.log(email, password);


    let error = false;
    let _m = "";
    if (
      phone.length < 1 ||
      email.length < 1 ||
      name.length < 1 ||
      password.length < 1 ||
      confirmpassword.length < 1
    ) {
      _m = "Error: Make sure all fields are set";
      error = true;
    } else if (password.length < 6) {
      error = true;
      _m = "Error: Password must be at least 6 characters";
    } else if (password !== confirmpassword) {
      error = true;
      _m = "Error: Passwords do not match";
    } else {
      error = false;
    }
    if (!error) {
      let __d = {
        name,
        email,
        phone,
        password,
        username,
        type,
      };
      console.log(__d);
      const tld =(()=> toast.loading("Creating your account... Please wait"),[2000]);

      fetch("https://fillyinst.uw.r.appspot.com/user/users",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(__d)
})
.then(function(res){ h.push("/login") })
.catch(function(res){ console.log(res) })
    }

    
}


  return (
    <>
    
   <ToastContainer/>
   {isAuth() ? <Redirect to="/home" /> : null}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="set name"
                  onFocus={()=>setUserFocus(true)}
                  onBlur={()=>setUserFocus(false)}
                />
                <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                autoComplete="off"
                required
                placeholder="set username"
                onFocus={()=>setUserFocus(true)}
                onBlur={()=>setUserFocus(false)}
              />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="phone number"
                  onFocus={()=>setUserFocus(true)}
                  onBlur={()=>setUserFocus(false)}
                />

              <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  ref={userRef}
                  autoComplete="off"
                  required
                  placeholder="Set email"
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={()=>setUserFocus(true)}
                  onBlur={()=>setUserFocus(false)}
                />
                
                <input
                  value={password}
                  type="password"
                  required
                  autoComplete="off"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  value={confirmpassword}
                  type="password"
                  required
                  autoComplete="off"
                  placeholder="confirm password"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
              </form>
       
            </div>

            <div className={login.sign}>
              <p> 
              <Link
              to="/login"
              >
              login
              </Link>
              </p>
            </div>
            <div className={login.signin}>
              <p>Get the app</p>
            </div>
            <div className={login["sign-socials"]}>
              <img
                draggable="false"
                width="130px"
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                alt="appstore"
              />
              <img
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

export default SignUp;
