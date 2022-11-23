import React,{ useState, useEffect} from 'react';
import image from "../../assets/dinners.jpeg"

const Contact = (props)=>{
    const clickHandler = ()=>{
        props.transferData(true)
        props.contactChat(props.email)
        props.getIdfunction(props.identity)
    }

    return(
    
        <div className="mx-2 my-4 flex cursor-pointer" onClick={clickHandler}>
        <img className="m-2 rounded-full w-14 h-14" src={image} alt="" />
        <div className="my-3 text-sm">
        <p className="font-bold px-2 pt-2">{props.name}</p>
        <p className="px-2">You replied to their story .1d</p>
        </div>
        </div>
    )
}

export default Contact