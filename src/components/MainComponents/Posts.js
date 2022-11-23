import React,{useState} from "react";
import world from "../../assets/khebab.jpg";
import post from "./post.module.css";
// import LoveIcon from "../icons/LoveIcon";
import CommentIcon from "../icons/comment-icon";
import SendIcon from "../icons/send-icon";
import BookMark from "../icons/bookmark-icon";
import NotFilled from "../icons/heartfilled-icon"
import RedHeart from "../icons/redheart-icon";

const Posts = (props) => {
  const [liked,setLiked] = useState(false)

  const likedHandler=()=>{
    setLiked(true)
  }
  return (
    <div className={post.Post}>
      <div className="flex p-4">
        <img className="rounded-full w-8 h-8 " src={world} alt="" />
        <div className="mx-2">
          <h5 className="text-bold text-sm font-extrabold">{props.name}</h5>
          <p className="text-xs">Original audio</p>
        </div>
      </div>
      <div className="w-full">
        <img className="w-full" src={props.media} height="500px" alt="" />
      </div>
      <div className={post.likes}>
        <div className="flex justify-between">
          <div className="flex">

          {liked ? (
            <RedHeart className=" mx-2 " onClick={()=>setLiked(false)}/>
            ) : (
              <NotFilled className="mx-2 " alt="" onClick={likedHandler} />
            )}

            <CommentIcon className="ml-1 "/>
            <SendIcon className="mx-2 "/>
          </div>
          <div className={post.lasticon}>
            <BookMark />
          </div>
        </div>
        <div className={post.caption}>
        <strong>21,404 likes</strong>
          <p>
            <strong>{props.name}</strong> {props.caption}
          </p>
          <p>View all 7,149 comments</p>
        </div>
        <div className={post.caption}>
          <p>
            <strong>shonny246</strong> Wow!!!!🔥🔥🔥🔥🔥🔥🔥
            Wow!!!🔥🔥🔥🔥🔥🔥🔥#Wow🔥🔥🔥🔥🔥🔥🔥 I don’t care what nobody say,
            it’s your time! That was 🔥🔥🔥🔥🔥🔥🔥
          </p>
          <p>1 DAY AGO</p>
        </div>
      </div>
    </div>
  );
};
export default Posts;
