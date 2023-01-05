import React from 'react';

const Main = (props)=>{
    return(
        <div className="flex m-auto justify-center w-4/5 h-auto">
        {props.children}
        </div>
    )
}
export default Main;
