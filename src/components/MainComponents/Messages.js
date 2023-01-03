import React, { useState, useEffect, useRef } from "react";
import NavBar from "../MainComponents/NavBar";
import { postData, getData } from "../../Helpers/requests";
import { getCookie } from "../../Helpers/auth";
import image from "../../assets/dinners.jpeg";
import ChatInput from "./ChatInput";
import Contact from "./Contact";
import { toast, ToastContainer } from "react-toastify";
import {io} from "socket.io-client"
import "react-toastify/dist/ReactToastify.css";
import {v4 as uuidv4} from "uuid";

const Messages = () => {
  const scrollRef = useRef();
  const socket = useRef();
  const [user, setUser] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [chats, setChats] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [arrival, setArrival] = useState(null)
 
  useEffect(()=>{
    if(currentUser){
      socket.current = io('http://localhost:4000');
      socket.current.emit("add-user", currentUser._id);
    }
  })

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("user"));
    if (users) {
      setUser(users);
      setCurrentUser(users)
    }
  }, []);


  const messagehandler = async (msg) => {
    console.log(msg);
    const data = await JSON.parse(localStorage.getItem("user"));
    const tld = toast.loading("sending message... Please wait");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        from: data._id,
        to: currentChat,
        message: msg,
      }),
      
    };
    socket.current.emit("send-msg",{
      to: currentChat,
      from: data._id,
      message: msg,
    })

    const msgs = [...messages];
    msgs.push({ fromSelf: true,message: msg })
    setMessages(msgs)

    fetch("http://localhost:4000/chat/message", requestOptions)
      .then((data) => {
        console.log(data);
        if (data.error) {
          toast.update(tld, {
            render: `Error: ${data.message} `,
            type: "error",
            isLoading: false,
          });
        } else {
          toast.update(tld, {
            render: `Message Sent`,
            type: "success",
            isLoading: false,
          });
        }
      })
      .finally((e) => {
        setTimeout(() => {
          toast.dismiss(tld);
        }, 2000);
      });
  };

  useEffect(() =>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrival({fromSelf:false, message: msg})
      })
    }
  },[])

  useEffect(() =>{
    arrival && setMessages((prev)=>[...prev, arrival])
  },[arrival])

  useEffect(() =>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])

  useEffect(() => {
    const tld = toast.loading("loading chats and messages... Please wait");
    getData("/user/userAll")
      .then((data) => {
        console.log(data);
        if (data.error) {
          toast.update(tld, {
            render: `Error: ${data.message} `,
            type: "error",
            isLoading: false,
          });
        } else {
          toast.update(tld, {
            render: `Messages up to date`,
            type: "success",
            isLoading: false,
          });
          setChats(data);
        }
      })
      .finally((e) => {
        setTimeout(() => {
          toast.dismiss(tld);
        }, 2000);
      });
  }, [setChats]);


  const chatsfunction = () => {
    setCurrentChat(true);

    const data = JSON.parse(localStorage.getItem("user"));
    const responseOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        from: data._id,
        to: currentChat,
      }),
      
    };

    fetch("http://localhost:4000/chat/chats", responseOptions).then((data) =>{
      return data.json();
    }).then((data) =>setMessages(data))
    
    

    console.log(messages)
  };

  const chathandler = (data) => {
    setChatData(data);
  };

  const identityHandler = (data) => {
    setCurrentChat(data);
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <div className="flex m-auto w-2/3 pb-10 h-screen pt-8">
        <div className="w-2/3 border flex flex-col">
          <div className=" m-4 flex justify-end text-center">
            <p className="m-auto font-bold">{user.name}</p>
            <svg
              aria-label="New message"
              class="_ab6-"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="16.848"
                x2="20.076"
                y1="3.924"
                y2="7.153"
              ></line>
            </svg>
          </div>
          <div className="overflow-auto h-full">
            <div className="border flex sticky top-0 bg-white justify-between">
              <div className="uppercase text-base p-2">Primary</div>
              <div className="uppercase text-base py-2 mx-4">General</div>
              <div className="uppercase text-base py-2 mx-4">requests</div>
            </div>
            <div className="overflow-auto">
              {chats.map((data) => (
                <Contact
                  key={data._id}
                  identity={data._id}
                  getIdfunction={identityHandler}
                  contactChat={chathandler}
                  info={data}
                  email={data.email}
                  name={data.name}
                  transferData={chatsfunction}
                />
              ))}
            </div>
          </div>
        </div>

        {currentChat === undefined ? (
          <div className="border w-full h-full grid place-items-center">
            <div className="items-center justify-center text-center">
              <svg
                ariaLabel="Direct"
                className="m-auto"
                color="#262626"
                fill="#262626"
                height="96"
                role="img"
                viewBox="0 0 96 96"
                width="96"
              >
                <circle
                  cx="48"
                  cy="48"
                  fill="none"
                  r="47"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></circle>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="69.286"
                  x2="41.447"
                  y1="33.21"
                  y2="48.804"
                ></line>
                <polygon
                  fill="none"
                  points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
              </svg>
              <p className="text-2xl font-light py-2">Your Messages</p>
              <p className="text-sm text-gray-500">
                Send private photos and messages to a friend or group
              </p>
              <button className="bg-blue-500 font-bold text-white px-2 py-1 text-sm my-8 rounded-md">
                Send Message
              </button>
            </div>
          </div>
        ) : (
          <div className="border w-full h-full overflow-auto">
            <div className="h-1/10 justify-between flex border sticky top-0 bg-white z-10">
              <div className="flex">
                <img
                  src={image}
                  alt="..."
                  className="w-10 rounded-full h-10 m-2 "
                />
                <h5 className="py-4 font-bold">{chatData}</h5>
              </div>
              <div className="flex p-4 ">
                <svg
                  ariaLabel="Audio call"
                  className="mx-2"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path>
                </svg>
                <svg
                  ariaLabel="Video call"
                  className="mx-2"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <rect
                    fill="none"
                    height="18"
                    rx="3"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    width="16.999"
                    x="1"
                    y="3"
                  ></rect>
                  <path
                    d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <svg
                  ariaLabel="View Thread Details"
                  className="mx-2"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <circle
                    cx="12.001"
                    cy="12.005"
                    fill="none"
                    r="10.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></circle>
                  <circle cx="11.819" cy="7.709" r="1.25"></circle>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="10.569"
                    x2="13.432"
                    y1="16.777"
                    y2="16.777"
                  ></line>
                  <polyline
                    fill="none"
                    points="10.569 11.05 12 11.05 12 16.777"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polyline>
                </svg>
              </div>
            </div>
            <div className="h-full border overflow-auto relative z-0">
              <div className="overflow-auto border w-full mt-14 h-5/6">
           {messages.map((message)=>
           
                <div ref={scrollRef} key={uuidv4()} className={` my-6 flex p-2 rounded-xl message ${message.fromSelf ? " justify-between mr-2":"rounded"}`}>
                <div className="w-0.5 mr-2 rounded-full bg-gray-400"></div>
                <div className={`p-2 rounded-xl message ${message.fromSelf ? "bg-gray-100 justify-between mr-2":"bg-blue-500 text-white rounded-xl"}`}>
                <div className="rounded-sm">
                <p>
               {message.message}
                </p>
                </div>
                </div>
                </div>
            
           )}
              </div>
              <ChatInput handleSendMsg={messagehandler} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
