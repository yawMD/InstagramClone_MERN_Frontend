import React,{ useState, useEffect} from 'react';
import story from './story.module.css';
import Stories from "./Stories"
import StoryDisp from "../MainComponents/StoryDisp"
import {useSelector,useDispatch} from "react-redux";
import {counterActions} from "../../store/index";
import {getData} from "../../Helpers/requests"
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const StorySection = (props)=>{
    const [posts,setPosts]= useState([]);
    const [error, setError] = useState(false);
    const [image, setImage] =useState(undefined);

    const story = useSelector((state)=>state.story)
    const dispatch = useDispatch()
    
    console.log(story)

    useEffect(() => {
        getData("/user/stories")
        .then((d)=>{
            if(!d.error) {
                toast.info("fetching Post. Please Wait...");
              setPosts(d)
              console.log(d);
            }else{
              setError(false);
              toast.error("There was an error loading page data.");
            }
          })
    },[])

    const storyHandler =()=>{
        dispatch(counterActions.storydisplay())
    }
    const imagehandler =(data)=>{
        setImage(data)
    }

    return (
        <div className="flex overflow-auto border rounded-lg"> 
        <ToastContainer />
        
        {story && (<StoryDisp avatar={image} close={storyHandler}/>)}
        {posts.map((post)=>(<Stories statehandler={imagehandler} image={post.videoImage} key={post._id}   onClick={storyHandler}/>))}
     
        </div>
    )
}
export default StorySection;