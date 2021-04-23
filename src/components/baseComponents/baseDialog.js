import React, { useState } from "react";
import { Dialog, DialogContent, withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import variables from "../../styles/variables.module.scss";
import ActionButton from "./actionButton";

const BaseDialog = ({
  isOpen,
  setIsOpen,
  title,
  children,
  centered = false,
}) => {
  return (
    <Dialog
      onClose={() => {
        setIsOpen(false);
      }}
      open={isOpen}
      maxWidth={centered ? "xs" : "sm"}
      fullWidth={true}
      style={{ zIndex: variables.dialogZIndex }}
      classes={{ root: "base-dialog" }}
    >
      <div>
        <DialogContent className="dialog-content">
          <div className="dialog-content">
            {centered ? (
              <div
                style={{
                  fontSize: "1.2em",
                  margin: "5px",
                  textAlign: "center",
                }}
              >
                <h4>{title}</h4>
              </div>
            ) : (
              <div
                style={{
                  fontSize: "1.2em",
                  margin: "5px",
                }}
              >
                {title}
                <IconButton
                  aria-label="close"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  style={{ float: "right", padding: "0px" }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            )}

            {children}
            {centered && <ActionButton />}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};
export default BaseDialog;
