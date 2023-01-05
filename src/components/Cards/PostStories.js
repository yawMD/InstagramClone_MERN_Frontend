import React from 'react';

const Poststories = (props)=>{
    return(
        <div className="flex flex-col m-4 md:w-2/5 py-5 pl-5 h-auto w-full">
        {props.children}
        </div>
    )
}
export default Poststories;
