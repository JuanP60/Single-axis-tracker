import React from "react";
import navBar from "../styles/navBar.scss";

function NavBar(){
    return (
        <div className="parent-nav">
            <div className="logo-container">
                logo
            </div>
            <ul className="lista-nav">
                <li>single-axis solar tracker</li>
            </ul>
            <div className="userName-container">
                User
            </div>
        </div>
    )
}

export default NavBar;