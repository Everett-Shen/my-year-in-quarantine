import React, { useState, useEffect } from "react";
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from "react-floating-button-menu";
import { Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import LinkIcon from "@material-ui/icons/Link";
import variables from "../../styles/variables.module.scss";

const FloatingMenuButtons = ({
  buttons,
  isFloatingButtonMenuOpen,
  setIsFloatingButtonMenuOpen,
  id,
}) => {
  // const [isFloatingButtonMenuOpen, setIsFloatingButtonMenuOpen] = useState(
  //   false
  // );
  const [areTooltipsOpen, setAreTooltipsOpen] = useState(false);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "done":
        return <DoneIcon style={{ fontSize: 20, color: "white" }} />;
      case "edit":
        return <EditIcon style={{ fontSize: 20, color: "white" }} />;
      case "share":
        return <LinkIcon style={{ fontSize: 20, color: "white" }} />;
      default:
        return <EditIcon style={{ fontSize: 20, color: "white" }} />;
    }
  };

  useEffect(() => {
    if (isFloatingButtonMenuOpen) {
      setTimeout(() => {
        setAreTooltipsOpen(isFloatingButtonMenuOpen);
      }, 400);
    } else setAreTooltipsOpen(isFloatingButtonMenuOpen);
  }, [isFloatingButtonMenuOpen]);

  return (
    <div className="floating-menu-button-container" id={id}>
      <FloatingMenu
        slideSpeed={500}
        direction={Directions.Up}
        spacing={8}
        isOpen={isFloatingButtonMenuOpen}
      >
        <MainButton
          iconResting={<AddIcon style={{ fontSize: 20, color: "white" }} />}
          iconActive={<ClearIcon style={{ fontSize: 20, color: "white" }} />}
          background={variables.primaryColor}
          onClick={() => {
            setIsFloatingButtonMenuOpen(!isFloatingButtonMenuOpen);
          }}
          size={56}
        />
        {buttons.map((button) => {
          return (
            <ChildButton
              icon={
                <Tooltip
                  title={button.title}
                  placement="left"
                  open={areTooltipsOpen}
                >
                  {getIcon(button.icon)}
                </Tooltip>
              }
              key={button.title}
              background={variables.primaryColor}
              size={40}
              onClick={() => {
                button.onClick();
                setIsFloatingButtonMenuOpen(false);
              }}
            />
          );
        })}
      </FloatingMenu>
    </div>
  );
};

export default FloatingMenuButtons;
