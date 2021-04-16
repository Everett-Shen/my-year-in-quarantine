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
import HelpTooltip from "../baseComponents/helpTooltip";
import SuccessSnackbar from "../baseComponents/successSnackbar";

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
  setMakeAnonymous,
}) => {
  const updateMakePublic = (e) => {
    setMakePublic(e.target.checked);
  };

  const updateMakeAnonymous = (e) => {
    setMakeAnonymous(e.target.checked);
  };

  return (
    <>
      {/* <h4>options</h4> */}
      <br />
      <div className="checkmarks">
        <div className="align-items-center">
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
          <HelpTooltip contents="determines if your timeline will be searchable by others" />
        </div>

        <div className="align-items-center">
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
          <HelpTooltip contents="if checked, your name will be displayed as Anonymous" />
        </div>
      </div>
      <br />
      {/* <ActionButton text="Publish" onClick={publishTimeline} /> */}
    </>
  );
};

export default PublishDialog;
