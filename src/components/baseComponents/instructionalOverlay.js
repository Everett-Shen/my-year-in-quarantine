import React, { useState, useEffect } from "react";

import Fade from "@material-ui/core/Fade";

const InstructionalOverlay = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 3000);
  }, []);
  return (
    <div className="menu-container-dark">
      <Fade in={isOpen} timeout={0}>
        <div id="myNav" className="overlay" onClick={() => setIsOpen(!isOpen)}>
          <div className="overlay-content">{children}</div>
        </div>
      </Fade>
    </div>
  );
};

export default InstructionalOverlay;
