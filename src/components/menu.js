import React, { useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const history = useHistory();
  const LOCAL_STORAGE_KEY = "my-year-in-quarantine";
  return (
    <div className="menu-container">
      <div className="menu-button-container">
        <HamburgerMenu
          isOpen={isOpen}
          menuClicked={() => setIsOpen(!isOpen)}
          width={25}
          height={18}
          strokeWidth={1.35}
          rotate={0}
          color="black"
          borderRadius={30}
          animationDuration={0.25}
        />
      </div>
      <Fade in={isOpen} timeout={400}>
        <div id="myNav" className="overlay" onClick={() => setIsOpen(!isOpen)}>
          <div className="overlay-content">
            {/* {props.render()} */}
            <a href="/">Home</a>
            <a href="/create">Continue editing</a>
            <a
              onClick={() => localStorage.removeItem(LOCAL_STORAGE_KEY)}
              href="/create"
            >
              New timeline
            </a>
            {/* <a onClick={() => history.push("/")} href="">
              Browse timelines
            </a> */}
            <a
              onClick={(e) => {
                e.preventDefault();
                setIsAboutOpen(true);
              }}
              href="/"
            >
              About
            </a>
          </div>
        </div>
      </Fade>
      <Fade in={isAboutOpen} timeout={400}>
        <div
          id="myNav"
          className="overlay"
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          <div className="overlay-content">
            <h1>my year in quarantine</h1>
            ver 1.0 <br />
            <br />
            created by Everett Shen
            <br />
            built with React, hosted by Firebase
            <br />
            <br />
            contact
            <br />
            <br />
            *social media page links*
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Menu;
