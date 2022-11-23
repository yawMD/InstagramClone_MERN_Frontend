import React,{ useState} from 'react';
import Picker from 'emoji-picker-react';
import Heartfilled from "../icons/heartfilled-icon"

export default function ChatInput(props){
    const [emoji, setEmoji] = useState(false)
    const [typing, setTyping] = useState(false)
    const [msg, setMsg] = useState("");

    const changehandler = (e)=>{
        
        if(!e.target.value){
            setTyping(false)
            setMsg(" ")
        }else{
            setMsg(e.target.value)
            setTyping(true)
        }
    }

    const handleEmojiClick = (event, emoji)=>{
        console.log(emoji)
        setMsg((prevInput)=> prevInput + emoji.emoji)

    }

    const sendChat = (e)=>{
        e.preventDefault();
        console.log("clicked")
        if(msg.length > 0){
            props.handleSendMsg(msg)
            setMsg(" ")
        }

    }

    return(
        <div className="items-center absolute inset-x-0 bottom-0">
        {emoji && (<Picker onEmojiClick={handleEmojiClick} disableAutoFocus={false} native/>)}
        <form onSubmit={sendChat} className="border m-2 rounded-2xl flex justify-between items-center">
        <div className="m-2" onClick={(()=>setEmoji(!emoji))}>
        <svg ariaLabel="Emoji" className="" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
        </div>
        
        <input onChange={changehandler} value={msg} className="outline-none p-1 rounded w-3/4" type="text" placeholder="Message..." />
        {typing ? (
            <button className="flex" type="submit"> 
            <h5 className="mx-3 text-blue-600">send</h5>
            </button>):(
                <div className="flex">
        <svg ariaLabel="Add Photo or Video" className="mx-2" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
        <Heartfilled className="mx-2"/>
        </div>
        )}
        </form>
        </div>
    )
}