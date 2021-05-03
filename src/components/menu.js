import React, { useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import Fade from "@material-ui/core/Fade";

import SocialMediaRow from "./baseComponents/socialMediaRow";

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const LOCAL_STORAGE_KEY = "my-year-in-quarantine";
  return (
    <div className="menu-container">
      <div className="menu-button-container">
        <HamburgerMenu
          isOpen={isOpen}
          menuClicked={() => {
            setIsOpen(!isOpen);
            setIsAboutOpen(false);
          }}
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
        <div id="myNav" className="overlay">
          <div className="overlay-content" style={{ top: "33%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                width: "fit-content",
                margin: "auto",
              }}
            >
              <h1>my year in quarantine</h1>
            </div>
            <p className="social-link"> v 1.0</p>
            <div className="social-link">
              created by
              <a
                href="https://linktr.ee/eshen3256"
                target="_blank"
                rel="noreferrer"
              >
                Everett Shen
              </a>
            </div>
            {/* <br />
            built with React, hosted by Firebase
            <br />
            contact me! */}
            {/* <div className="social-link">
              made with reactjs, hosted on firebase
            </div> */}

            <SocialMediaRow />
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Menu;
