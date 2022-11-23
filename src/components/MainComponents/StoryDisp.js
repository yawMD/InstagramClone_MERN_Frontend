import React,{useRef} from 'react';

import { useState, useEffect } from "react";
import {postData, uploadToFirebaseStorage} from "../../Helpers/requests";
import { toast,ToastContainer } from "react-toastify";
import { isAuth } from '../../Helpers/auth';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../assets/inst.png"
import {
    BrowserRouter as Router,
    Redirect,
  } from "react-router-dom";
  


export default function StoryDisp(props) {
    const [change, setChange] = useState("")
    useEffect(()=>{
        setChange(props.avatar)
    },[change, setChange])
 


  return (
    // <div className="z-50 bg-black bg-opacity-50 glass fixed top-0 left-0 h-screen w-screen">
    //   {!isAuth() ? null : !isAuth().set ? (
    //     isAuth().status === "agency" ? (
    //       () => setShowAgency(true)
    //     ) : isAuth().status === "user" ? (
    //       () => setShowSeeker(true)
    //     ) : (
    //       () => setShowServer(true)
    //     )
    //   ) : isAuth().set ? (
    //     <Redirect to="/me/home" />
    //   ) : !(isAuth().type === "admin") ? (
    //     <Redirect to="/home" />
    //   ) : null}
    //   <ToastContainer />
    //   {loggedIn && showSeeker && (
    //     <CompleteSeeker show={showSeeker} close={() => setShowSeeker(false)} />
    //   )}
    //   {loggedIn && showAgency && (
    //     <CompleteAgency show={showAgency} close={() => setShowAgency(false)} />
    //   )}
    //   {loggedIn && showServer && (
    //     <CompleteServer show={showServer} close={() => setShowServer(false)} />
    //   )}
    //   <div className="h-full py-8 flex flex-col content-center align-center justify-center">
    //     <div className="container c mt-20 md:m-auto rounded">
    //       {/* <div className="h-60 md:h-full bg-yellow-400 rounded-l-lg shadow-r-lg">
    //         <div className="h-full w-full"></div>
    //       </div> */}
    //         {/* <div className="text-right text-2xl text-red-600 md:w-1/2 mx-auto">
              
    //         </div> */}
    //       <form
    //         onSubmit={handleSubmit}
    //         className="p-2 md:px-8 md:py-6 text-center md:text-left w-full ring-1 ring-gray-100 shadow-5xl bg-white shadow-lg md:w-1/2 mx-auto"
    //       >
    //         <p className="relative text-xl mb-6 tracking-wide text-center capitalize font-semibold">
    //           Sign in to FillyJobs
    //           <button onClick={props.close} className="absolute right-0 text-red-500">
    //             <span className="fa fa-close" />
    //           </button>
    //         </p>
    //         {_s[2] !== undefined && _s[2].replace("rdr=", "") === "/me/jobs" ? (
    //           <p className="text-red-400">
    //             Login to your agency account to post a job
    //           </p>
    //         ) : null}
    //         <button type="button" className="bg-blue-800 text-white p-4 my-2 font-semibold rounded relative w-full">
    //           <span className="absolute left-4 rounded-full text-2xl m-auto">
    //             <span className="fab fa-facebook" />
    //           </span>{" "}
    //           Continue with Facebook
    //         </button>
    //         <button type="button" className="ring-1 ring-blue-800 text-gray-800 p-4 my-2 font-semibold rounded relative w-full">
    //           <span className="absolute left-4 rounded-full text-2xl m-auto">
    //             <span className="fab fa-google" />
    //           </span>{" "}
    //           Continue with Google
    //         </button>
    //         <button type="button" className="ring-1 ring-blue-800 text-gray-800 p-4 my-2 font-semibold rounded relative w-full">
    //           <span className="absolute left-4 rounded-full text-2xl m-auto">
    //             <span className="fab fa-apple" />
    //           </span>{" "}
    //           Continue with Apple
    //         </button>
    //         <p className="text-lg my-2 text-center capitalize text-gray-600">
    //           OR
    //         </p>
    //         <div className="tracking-wide my-2 text-gray-800 text-lg">
    //           <div>
    //             <div className="p-0 grid grid-cols-2 gap-1 md:gap-3">
    //               <div className="col-span-2 py-1">
    //                 <input
    //                   className="w-full p-3 ring-1 duration-600 ease-in-out transition ring-gray-300 rounded hover:shadow-lg rounded"
    //                   value={email}
    //                   name="email"
    //                   type="email"
    //                   onChange={(e) => setEmail(e.target.value)}
    //                   required
    //                   placeholder="Your Email"
    //                 />
    //               </div>
    //               <div className="col-span-2 py-1">
    //                 <input
    //                   className="w-full p-3 ring-1 duration-600 ease-in-out transition ring-gray-300 rounded hover:shadow-lg rounded"
    //                   value={password}
    //                   name="password"
    //                   onChange={(e) => setPassword(e.target.value)}
    //                   required
    //                   type="password"
    //                   placeholder="Your Password"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="text-center">
    //           <button
    //             type="submit"
    //             className="py-3 tracking-wide text-white bg-blue-700 text-xl font-bold w-full"
    //           >
    //             {btn.text}
    //           </button>
    //           <div className="text-sm text-gray-700 mt-2 flex flex-row">
    //             <label><input type={"checkbox"} /> Remember Me</label>
    //             <div className="flex-grow" />
    //             <button>Forgot Password</button>
    //           </div>
    //         </div>
    //         <div className="text-center mt-4 pt-2 border-t-2 text-blue-700">
    //           <Link to={`/register${search ? "/" + search : ""}`}>
    //             <span className="text-gray-700">Not a member?</span> Join Now
    //           </Link>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>


    <div  
    className=" bg-black fixed left-0 h-screen inset-0 overflow-hidden right-0 top-0 w-full z-50
    x-transition:enter=transition ease-out duration-100 x-transition:enter-start= opacity-0 scale-90
    x-transition:enter-end= opacity-100 scale-100 x-transition:leave=transition ease-in duration-100
    x-transition:leave-start=opacity-100 scale-100 x-transition:leave-end=opacity-0 scale-90">

    <ToastContainer />
   <div className="flex justify-between mx-8 text-4xl text-white">
   <img className="m-4 w-28 " src={logo} alt="" />
   <button onClick={props.close}>x</button>
   </div>
    {!isAuth() ? <Redirect to="/login" /> : null}

        <div className="grid h-screen items-center max-w-lg mx-auto px-4 relative">
          <div style={{backgroundImage: `url(${change})`, backgroundSize: 'cover'}} className="bg-white overflow-y-hidden max-h-full relative rounded-lg justify-center items-center">
            <div className="h-screen border-b overflow-auto flex rounded-t">
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
            <div className="mt-6 mx-2 h-0 w-1/5 p-0.5 bg-gray-800 border-b flex rounded"></div>
       </div>
      
          </div>
        </div>
      </div>
  );
}
