import React, { useState } from "react";
import "./navbar.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>S</span>hopi
            <span>G</span>o
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li  onClick={() => setShowMediaIcons(!showMediaIcons)} >
              <NavLink to="/">Home</NavLink>
            </li>
            <li  onClick={() => setShowMediaIcons(!showMediaIcons)}> 
              <NavLink to="/about">About</NavLink>
            </li>
            <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li onClick={() => setShowMediaIcons(!showMediaIcons)}> 
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          {/* <ul className="social-media-desktop">
            <li>
              <a
                href="https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                target="_thapa">
                <FaFacebookSquare className="facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/thapatechnical/"
                target="_thapa">
                <FaInstagramSquare className="instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                target="_thapa">
                <FaYoutubeSquare className="youtube" />
              </a>
            </li>
          </ul>  */}

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};

export default Navbar;