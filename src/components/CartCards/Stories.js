import React from 'react';
import stories from './stories.module.css';
import pic from '../../assets/sag.jpeg';
import { useSelector } from 'react-redux';
import StoryDisp from "../MainComponents/StoryDisp"

const Stories = (props)=>{
    const clickHandler =()=>{
        props.statehandler(props.image)
    }
    return(
        <div className="text-center w-1/4 h-auto p-2 text-xs">
        
        <div className="items-center border-solid justify-center text-center inline-block w-14 h-14 rounded-full border-red-500 border-4 border-spacing-10" onClick={clickHandler}>
        <img onClick={props.onClick} className="  w-14 h-12 rounded-full p-1" src={props.image}  alt="" />
        </div>
        <p>naa_fowaa</p>
        </div>
    )
}
export default Stories;