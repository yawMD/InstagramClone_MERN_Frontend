import React from 'react';
import main from '../Cards/main.module.css'

const Main = (props)=>{
    return(
        <div className={main.main}>
        {props.children}
        </div>
    )
}
export default Main;
