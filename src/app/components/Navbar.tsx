import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { InfoCircleOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import logonameimg from '../assets/Images/logoName.png'

const NavBar = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); 

    
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow ustify-content-left">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand link-button">
                    <img src={logonameimg} />
                </Link>
                {isLoggedIn ? (
                    <div className="nav-link-container" style={{"display":"flex", "gap":"50px"}}>
                        <Link to="/aboutUs" className="link-button">
                            <button
                                className="nav-link nav-btn"
                                type="button"
                                id="navbar-nav-btn"
                            >
                                <i className="material-icons"><InfoCircleOutlined /></i> About Us
                            </button>
                        </Link>
                        <Link to="/profile" className="link-button">
                            <button
                                className="nav-link nav-btn"
                                type="button"
                                id="navbar-nav-btn"
                            >
                                <i className="material-icons"><UserOutlined /></i> Profile
                            </button>
                        </Link>
                        <button
                            className="nav-link nav-btn"
                            type="button"
                            id="navbar-nav-btn"
                            onClick={handleLogout}
                        >
                            <i className="material-icons"><LogoutOutlined /></i> Logout
                        </button>
                    </div>
                ) : (
                    <div className="nav-link-container" style={{"display":"flex", "gap":"50px"}}>
                        <Link to="/aboutUs" className="link-button">
                            <button
                                className="nav-link nav-btn"
                                type="button"
                                id="navbar-nav-btn"
                            >
                                <i className="material-icons"><InfoCircleOutlined /></i> About Us
                            </button>
                        </Link>
                        <Link to="/login" className="link-button" state={{ from: location }} replace>
                            <button
                                className="nav-link nav-btn"
                                type="button"
                                id="navbar-nav-btn"
                            >
                                <i className="material-icons"><LoginOutlined /></i> Login
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
