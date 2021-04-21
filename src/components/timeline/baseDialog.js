import React, { useState } from "react";
import { Dialog, DialogContent, withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import variables from "../../styles/variables.module.scss";

const BaseDialog = (props) => {
  return (
    <Dialog
      onClose={() => {
        props.setIsOpen(false);
      }}
      open={props.isOpen}
      maxWidth={"sm"}
      fullWidth={true}
      style={{ zIndex: variables.dialogZIndex }}
      classes={{ root: "base-dialog" }}
    >
      <div>
        <DialogContent className="dialog-content">
          <div className="dialog-content">
            <div
              style={{
                fontSize: "1.2em",
                margin: "5px",
              }}
            >
              {props.title}
              <IconButton
                aria-label="close"
                onClick={() => {
                  props.setIsOpen(false);
                }}
                style={{ float: "right", padding: "0px" }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            {props.children}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};
export default BaseDialog;
