import React from 'react';
import follow from '../Cards/follow.module.css'
import world from "../../assets/khebab.jpg" 

const Follow = (props)=>{
    return(
        <div className="w-full flex p-2">
        <div className="w-full flex">
        <img className="rounded-full w-12 h-10 mx-2" src={world} alt=""/>
        <div className="flex flex-col w-full text-xs">
        <h5>Emmanuel MacDan</h5>
        <p>Dan |Software Developer</p>
        </div>
        </div>
        <div className={follow.follow}>
        <p className={follow.para}>Follow</p>
        </div>
        </div>
    )
}
export default Follow;
