import React,{useState,useEffect} from "react";
import Navbar from "../components/MainComponents/NavBar";
import profile from "./profile.module.css";
import image from "../assets/hotgrill.jpeg";
import food from "../assets/foodback.jpg";
import { getData } from "../Helpers/requests";
import {isAuth} from "../Helpers/auth"
import {
  Link,
  Redirect
} from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



const Profile = () => {
  const [users, setUser] = useState([]);
  const [userId, setUserId] = useState([]);
  const [posts, setPosts] = useState([]);

useEffect(() => {
  const users = JSON.parse(localStorage.getItem('user'));
  if (users) {
   setUser(users);
   setUserId(users._id);
  }

  getData(`/user/mytimeline/${userId}`)
  .then(response => setPosts(response.myposts))


}, [setUserId, setPosts, userId]);



// getData(`/user/mytimeline/${userId}`)
// .then((data) => {
//   if (!data.error) {
//     setPosts(data);
//   } else {
//     // setErr(true);
//     toast.error("There was an error loading page data.");
//   }
// })


 


  return (
    <React.Fragment>
    {!isAuth() ? <Redirect to="/login" /> : null}
      <Navbar />

      <div className={profile.topfirst}>
        <div className="rounded-full m-10">
          <img className="rounded-full w-40 h-40" src={image} alt="" />
        </div>

        <div className={profile.notimage}>
          <div className={profile.Name}>
            <p className={profile.profName}>{users.username}</p>
            <button>
              <strong>Edit profile</strong>
            </button>
            <svg
              ariaLabel="Options"
              className="_ab6-"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <circle
                cx="12"
                cy="12"
                fill="none"
                r="8.635"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>
              <path
                d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>

          <div className={profile.Name}>
            <div className={profile.posts}>
              <h3>17</h3>
              <p>posts</p>
            </div>
            <div className={profile.posts}>
              <h3>258</h3>
              <p>followers</p>
            </div>
            <div className={profile.posts}>
              <h3>1,589</h3>
              <p>following</p>
            </div>
          </div>

          <div className={profile.Name}>
            <h4>{users.name}</h4>
          </div>

          <div className={profile.Name}>
            <p>
              👨🏾‍💻 Software developer 💡Sharing code related tips Full stack dev
              {users.bio}
            </p>
          </div>
        </div>
      </div>

      <div className={profile.memories}>
      <div className="items-center m-10 text-center w-20">
      <img className="rounded-full w-20 h-20" src={food} alt="" />
      <p><strong>Phina</strong></p>
      </div> 
      </div>

      <div className={profile.list}>
      <Link>
      <span>POSTS</span>
      </Link>

      <Link>
      <span>REELS</span>
      </Link>

      <Link>
      <span>SAVED</span>
      </Link>

      <Link>
      <span>TAGGED</span>
      </Link>
      </div>

      <div className={profile.final}>
      {posts && posts.map((posts)=>(<img key={posts._id} src={posts.videoImage} width="100%" height="400px" alt=""/>))}
      <img src={image} width="100%" height="400px" alt=""/>
      </div>
    </React.Fragment>
  );
};

export default Profile;
