import React from "react";
import { FormControlLabel, Checkbox, withStyles } from "@material-ui/core";

const ColoredCheckbox = withStyles({
  root: {
    // color: "rgb(255, 118, 118)",
    "&$checked": {
      color: "rgb(255, 118, 118)",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckmarkWithLabel = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      label={label}
      control={
        <ColoredCheckbox
          checked={checked}
          onChange={onChange}
          name="checkedB"
          color="primary"
        />
      }
    />
  );
};

export default CheckmarkWithLabel;
