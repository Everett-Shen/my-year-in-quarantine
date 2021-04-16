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
            label="Make timeline public"
            control={
              <ColoredCheckbox
                checked={makePublic}
                onChange={updateMakePublic}
                name="checkedB"
                color="primary"
              />
            }
          />
          <HelpTooltip contents="Determines if your timeline will be searchable by others" />
        </div>

        <div className="align-items-center">
          <FormControlLabel
            label="Make timeline anonymous"
            control={
              <ColoredCheckbox
                checked={makeAnonymous}
                onChange={updateMakeAnonymous}
                name="checkedB"
                color="primary"
              />
            }
          />
          <HelpTooltip contents="If checked, your name will be displayed as Anonymous" />
        </div>

        {/* <div className="align-items-center">
          <FormControlLabel
            label="Create an account for future editing"
            control={
              <ColoredCheckbox
                checked={makeAnonymous}
                onChange={updateMakeAnonymous}
                name="checkedB"
                color="primary"
              />
            }
          />
          <HelpTooltip contents="An account is needed if you want to be able to edit your timeline after publication" />
        </div> */}
      </div>
      <div className="note">
        <strong>Note</strong>: You will no longer be able to edit your timeline
        after publishing unless you create an account in step 3!{" "}
      </div>
      <br />
      {/* <ActionButton text="Publish" onClick={publishTimeline} /> */}
    </>
  );
};

export default PublishDialog;
