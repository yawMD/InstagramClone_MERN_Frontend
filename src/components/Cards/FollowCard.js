import React from 'react';
import main from '../Cards/followcards.module.css'

const FollowCards = (props)=>{
    return(
        <div className={main.main}>
        {props.children}
        </div>
    )
}
export default FollowCards;
