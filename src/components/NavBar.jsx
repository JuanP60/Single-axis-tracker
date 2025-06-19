import React from "react";
import navBar from "../styles/navBar.scss";
import SunnyIcon from '@mui/icons-material/Sunny';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function NavBar(){
    return (
        <div className="parent-nav">
            <div className="logo-container">
                <SunnyIcon className="sun-icon"/>
                <ul className="lista-nav">
                    <li className="text-list">single-axis solar tracker</li>
                    <li className="icon-tracker"><TimelineIcon className="tracker-icon"/></li>
                </ul>
            </div>
            
            <div className="user-container">
                <AccountCircleIcon className="user-icon"/>
            </div>
        </div>
    )
}

export default NavBar;