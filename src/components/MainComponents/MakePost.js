import React,{useRef} from 'react';

import { useState, useEffect } from "react";
import {postData, uploadToFirebaseStorage} from "../../Helpers/requests";
import {getCookie} from "../../Helpers/auth"
import { toast,ToastContainer } from "react-toastify";
import { isAuth } from '../../Helpers/auth';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter as Router,
    Redirect,
  } from "react-router-dom";
  


export default function MakePost(props) {
  const [file, setFile] = useState(null);
    const [videoImage, setVideoImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState([]);
    const inputRef = useRef()


    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('user'));
        if (users) {
         setUserId(users._id);
         setName(users.username)
        }
      }, []);

    const handleSubmit =async(e)=>{
        e.preventDefault();

        if(file !== null){
          toast.info("Uploading Post. Please Wait...");

          let media = "";
      try {
        media = await uploadToFirebaseStorage(`posts/`, file);
        console.log(media);
      } catch (e) {
        toast.error("Error: Uploading Post Failed.");
        return;
      }
    
        const tld = toast.loading("sending post... Please wait");

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' , Authorization: "Bearer " + getCookie("token"),},
          body: JSON.stringify( { name, media, caption })
      };
        
        console.log("clicked")
        fetch("https://fillyinst.uw.r.appspot.com/user/stories",requestOptions).then((data) => {
            console.log(data);
            if(data.error){
              toast.update(tld, {
                render: `Error: ${data.message}`,
                type: "error",
                isLoading: false,
              });
            }else{
              toast.update(tld, {
                render: `new post sent Successful`,
                type: "success",
                isLoading: false,
              })
            }
        })
    }
}

    const storyHandler =(e)=>{
        e.preventDefault();
        console.log("story clicked")
        setVideoImage(inputRef.current)

        const tld = toast.loading("sending post... Please wait");
        postData(`/user/stories`, { videoImage }).then((data) => {
            console.log(data);
            if(data.error){
              toast.update(tld, {
                render: `Error: ${data.message}`,
                type: "error",
                isLoading: false,
              });
            }else{
              toast.update(tld, {
                render: `new post sent Successful`,
                type: "success",
                isLoading: false,
              })
            }
        })
    }


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
    className="bg-opacity-70 bg-slate-900 fixed left-0 h-screen inset-0 overflow-hidden right-0 top-0 w-full z-50
    x-transition:enter=transition ease-out duration-100 x-transition:enter-start= opacity-0 scale-90
    x-transition:enter-end= opacity-100 scale-100 x-transition:leave=transition ease-in duration-100
    x-transition:leave-start=opacity-100 scale-100 x-transition:leave-end=opacity-0 scale-90">

    <ToastContainer />
    {!isAuth() ? <Redirect to="/login" /> : null}

        <div className="grid h-screen items-center max-w-3xl mx-auto px-4 py-20 relative">
          <div className="bg-white overflow-y-hidden max-h-full relative rounded-lg">
            <div className="border-b flex items-center justify-center rounded-t">
            
              <button
                type="button"
                onClick={props.close}
                className="bg-transparent hover:bg-slate-200 hover:text-slate-900 inline-flex items-center p-1.5 rounded-lg text-xs"
              >
                <span className="material-icons text-base font-medium">Create new post</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid  h-screen place-items-center">
            <div className="pb-20 bg-white">
            <div className="pb-20 m-auto w-full text-center items-center justify-center">
            <svg aria-label="Icon to represent media such as images or videos" class="w-full" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
            <p className="text-xl">Drag photos and videos</p>
            <div class="flex mt-6 items-center justify-center bg-grey-lighter">
    <label class="px-2 flex flex-col items-center py-2 bg-blue-500 text-blue rounded shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <span class="text-white text-xs leading-normal font-bold">Select from computer</span>
        <input type='file' class="hidden" accept="image/*" onChange={(e) => setFile(e.target.files[0])}/>
        
    </label>
    
</div>
          </div>
          <div className="justify-center text-center">
          <button className="bg-blue-400 p-2 rounded" type="submit">submit</button>
          </div>
        
                    </div>

                    </form>

          </div>
        </div>
      </div>
  );
}
