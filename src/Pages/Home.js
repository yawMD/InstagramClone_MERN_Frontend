import React, { useState,useEffect } from "react";
import post from "../assets/dinners.jpeg"
import NavBar from "../components/MainComponents/NavBar"
import Main from "../components/Cards/Main";
import StorySection from "../components/CartCards/StorySection";
import Poststories from "../components/Cards/PostStories";
import Posts from "../components/MainComponents/Posts";
import Follow from "../components/Cards/Follow";
import FollowCards from "../components/Cards/FollowCard";
import {isAuth} from "../Helpers/auth";
import { getData } from "../Helpers/requests"
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";


function Home() {
    const [posts,setPosts]= useState([]);
    const [error, setError] = useState(false);
    const load = [0, 1, 2, 3, 4];
  
    useEffect(()=>{
      setError(false);
      getData('/user/alltimelines')
          // .then(data => data.json())
          .then((d)=>{
            if(!d.error) {
              setPosts(d)
              // console.log(d);
            }else{
              setError(false);
              toast.error("There was an error loading page data.");
            }
          })
          // .catch((e) => {
          //   setError(true);
          //   toast.error("There was an error loading page data");
          // });
    },[posts])
  
    return (
      <React.Fragment>
      {!isAuth() ? <Redirect to="/login" /> : null}
        <NavBar />
        <Main>
          <Poststories>
            <StorySection />
          {posts && posts.map(post => <Posts key={post._id} date={new Date(post.createdAt).toLocaleString()} name={post.name} media={post.media} caption={post.caption}/>)} 
          {posts.length===0 && !error && load.map((e)=>(<div className=" rounded-xl bg-gray-50 my-4 border-solid border border-gray-100">
          <div className="flex bg-gray-100 my-4">
          <div className="w-8 rounded-full bg-gray-300 mx-4 animate-pulse h-8"></div>
          <div className=" bg-gray-300 w-48 rounded animate-pulse h-8 "></div>
          </div>
          <div key={e.key} className="my-4 bg-gray-300 h-96 rounded animate-pulse">
          </div><div className="m-2 ml-4 bg-gray-300 w-56 rounded animate-pulse h-8"></div>
          <div className="m-2 ml-4 bg-gray-300 w-48 rounded animate-pulse h-8"></div>
          </div>))}  
          </Poststories>
      <FollowCards>
          <Follow />
          <Follow />
          <Follow />
          <Follow />
          <Follow />
          <Follow />
          <Follow />
          </FollowCards>
        </Main>
      </React.Fragment>
    );
  }
  
  export default Home;
  