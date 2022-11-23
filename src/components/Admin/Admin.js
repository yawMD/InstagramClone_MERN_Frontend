import React from 'react';
import ProfileSvg from "../icons/profile-icon"
import SettingsSvg from "../icons/settings-icon"

const Admin = ()=>{
    return(
        <React.Fragment>
        <div className="flex">
        <div className="flex flex-col">
        <ProfileSvg />
        <SettingsSvg />
        </div>
        <div></div>
        </div>
        </React.Fragment>
    )
}
export default Admin