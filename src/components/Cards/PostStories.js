import React from 'react';
import main from '../Cards/poststories.module.css'

const Poststories = (props)=>{
    return(
        <div className={main.main}>
        {props.children}
        </div>
    )
}
export default Poststories;
