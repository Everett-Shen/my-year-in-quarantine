import React, { useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import Fade from "@material-ui/core/Fade";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div id="myNav" class="overlay" onClick={() => setIsOpen(!isOpen)}>
          <div class="overlay-content">
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Menu;
