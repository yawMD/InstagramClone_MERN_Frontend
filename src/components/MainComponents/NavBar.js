import React, { useState } from "react";
import navbar from "./NavBar.module.css";
import logo from "../../assets/insta.png";
import tovet from "../../assets/tovet.jpeg";
import HomeIcon from "../icons/home-icon";
import ChatIcon from "../icons/chat-icon";
import AddPost from "../icons/addpost-icon";
import NavigatorIcon from "../icons/NavigatorIcon";
import LoveIcon from "../icons/LoveIcon.js";
import SearchIcon from "../icons/search-icon.js";
import {isAuth, signout } from "../../Helpers/auth"
import MakePost from "../MainComponents/MakePost"
import { counterActions } from "../../store/index"
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  useHistory
} from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const logout = useSelector((state)=>state.logout)

  const history = useHistory();
  const [post, setPost] = useState(false)
  // const [logout, setLogout] = useState(false);
  const logoutFunction = () => {
    // setLogout(!logout);
    dispatch(counterActions.loader())
  };

  const postHandler = () => {
    setPost(!post)
  }
  return (
    <div className={navbar.header}>
      <div className={navbar.Nav}>
      <Link
      to="/">
        <div className={navbar.logo}>
          <img className="w-28" src={logo}  alt="" />
        </div>
        </Link>
        <div className={navbar.input}>
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
        <div className="flex items-center">
        <Link
        to="/">
          <HomeIcon onClick={postHandler} className="w-12 h-10 px-2.5" />
        </Link>

        <Link
        to="/chats">
          <ChatIcon className="w-12 h-10 px-2.5" />
          </Link>
          <Link
        to="/postscreen">
          <AddPost className="w-12 h-10px-2.5"/>
          </Link>
          <NavigatorIcon className="w-12 h-10 px-2.5" />
          <LoveIcon className="w-12 h-10 px-2.5" />

          <div className={navbar.logmenu}>
            <h3 className="flex">
              <span className={navbar.hovBar}>
                <img
                  onClick={logoutFunction}
                  src={tovet}
                  className="w-8 h-8 rounded-full m-2"
                  alt=""
                />
              </span>
            </h3>
            {logout && (
              <div className="w-52 z-50 transition rounded-lg absolute top-10 mt-2 right-0 ring-1 ring-white-200 flex flex-col bg-white  shadow-lg">
                <div className={navbar.grid}>
                  <Link
                    to="/user/profile"
                    className="text-left hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                  >
                    <span>Profile</span>
                  </Link>
                </div>
                <div className={navbar.grid}>
                  <Link
                    // onClick={() => setShowSignup(true)}
                    className="text-left hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                  >
                    <span>Saved</span>
                  </Link>
                </div>
                <div className={navbar.grid}>
                  <Link
                    // onClick={() => setShowSignup(true)}
                    className="text-left hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                  >
                    <span>settings</span>
                  </Link>
                </div>

                <div className="w-auto text-black">
                  <Link
                    // onClick={() => setShowSignup(true)}
                    className="text-left hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                  >
                    <span>Report a problem</span>
                  </Link>
                </div>

                <div className={navbar.grid}>
                  <Link
                    // onClick={() => setShowSignup(true)}
                    className="text-left hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                  >
                    <span>Switch accounts</span>
                  </Link>
                </div>

                <div className={navbar.grid}>
                  <Link
                    // onClick={() => setShowSignup(true)}
                    className="text-left hover:text-blue-700 hover:translate-x-0.5 duration-300 px-4 py-1.5"
                  >
                    <span onClick={() => {
                      signout();
                      history.push("/login");
                    }}>Logout</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
