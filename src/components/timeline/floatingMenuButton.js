import React, { useState } from "react";
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from "react-floating-button-menu";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import FavoriteIcon from "@material-ui/icons/Favorite";
import variables from "../../styles/variables.module.scss";

const FloatingMenuButton = () => {
  const [isFloatingButtonMenuOpen, setIsFloatingButtonMenuOpen] = useState(
    false
  );
  return (
    <div className="floating-menu-button-container">
      <FloatingMenu
        slideSpeed={500}
        direction={Directions.Up}
        spacing={8}
        isOpen={isFloatingButtonMenuOpen}
      >
        <MainButton
          iconResting={
            <AddIcon
              style={{ fontSize: 20, color: "white" }}
              nativeColor="white"
            />
          }
          iconActive={
            <ClearIcon
              style={{ fontSize: 20, color: "white" }}
              nativeColor="white"
            />
          }
          background={variables.primaryColor}
          onClick={() => {
            setIsFloatingButtonMenuOpen(!isFloatingButtonMenuOpen);
          }}
          size={56}
        />
        <ChildButton
          icon={<FavoriteIcon style={{ fontSize: 20, color: "white" }} />}
          background={variables.primaryColor}
          size={40}
          onClick={() => console.log("First button clicked")}
        />
        <ChildButton
          icon={<FavoriteIcon style={{ fontSize: 20, color: "white" }} />}
          background={variables.primaryColor}
          size={40}
        />
      </FloatingMenu>
    </div>
  );
};

export default FloatingMenuButton;
