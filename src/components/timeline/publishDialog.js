import React, { useState } from "react";
import {
  InputAdornment,
  FormControl,
  OutlinedInput,
  Tooltip,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  withStyles,
} from "@material-ui/core";
import ActionButton from "../baseComponents/actionButton";

const ColoredCheckbox = withStyles({
  root: {
    // color: "rgb(255, 118, 118)",
    "&$checked": {
      color: "rgb(255, 118, 118)",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const PublishDialog = ({
  makePublic,
  setMakePublic,
  makeAnonymous,
  updateMakeAnonymous,
  publishTimeline,
}) => {
  const updateMakePublic = (e) => {
    setMakePublic(e.target.checked);
  };

  return (
    <>
      <h4>options</h4>
      <br />
      <div className="checkmarks">
        <FormControlLabel
          label="make timeline public"
          control={
            <ColoredCheckbox
              checked={makePublic}
              onChange={updateMakePublic}
              name="checkedB"
              color="primary"
            />
          }
        />
        <FormControlLabel
          label="make anonymous"
          control={
            <ColoredCheckbox
              checked={makeAnonymous}
              onChange={updateMakeAnonymous}
              name="checkedB"
              color="primary"
            />
          }
        />
      </div>
      <br />
      <ActionButton text="Publish" onClick={publishTimeline} />
    </>
  );
};

export default PublishDialog;
