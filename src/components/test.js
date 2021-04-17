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
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import DoneIcon from "@material-ui/icons/Done";
import variables from "../../styles/variables.module.scss";

const FloatingMenuButtons = ({
  continueEditing,
  saveAndExport,
  previewMode,
}) => {
  const [isFloatingButtonMenuOpen, setIsFloatingButtonMenuOpen] = useState(
    false
  );
  const [areTooltipsOpen, setAreTooltipsOpen] = useState(false);

  useEffect(() => {
    if (isFloatingButtonMenuOpen) {
      setTimeout(() => {
        setAreTooltipsOpen(isFloatingButtonMenuOpen);
      }, 400);
    } else setAreTooltipsOpen(isFloatingButtonMenuOpen);
  }, [isFloatingButtonMenuOpen]);
  return (
    <div className="floating-menu-button-container">
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
        <ChildButton
          icon={
            <Tooltip title="Finish" placement="left" open={areTooltipsOpen}>
              <DoneIcon style={{ fontSize: 20, color: "white" }} />
            </Tooltip>
          }
          background={variables.primaryColor}
          size={40}
          onClick={() => {
            saveAndExport();
            setIsFloatingButtonMenuOpen(false);
          }}
        />
        {/* {previewMode && <div></div>} */}
        <ChildButton
          icon={
            <Tooltip
              title="Continue editing"
              placement="left"
              open={areTooltipsOpen}
            >
              <EditIcon style={{ fontSize: 20, color: "white" }} />
            </Tooltip>
          }
          background={variables.primaryColor}
          size={40}
          onClick={() => {
            continueEditing();
            setIsFloatingButtonMenuOpen(false);
          }}
        />
      </FloatingMenu>
    </div>
  );
};

export default FloatingMenuButtons;
