import React from 'react';
import main from '../Cards/followcards.module.css'

const FollowCards = (props)=>{
    return(
        <div className='lg:flex flex-col my-4 mx-6 hidden  lg:visible'>
        {props.children}
        </div>
    )
}
export default FollowCards;
