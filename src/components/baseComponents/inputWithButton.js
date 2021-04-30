import React from "react";
import {
  InputAdornment,
  FormControl,
  OutlinedInput,
  Tooltip,
  IconButton,
} from "@material-ui/core";

const InputWithButton = ({
  inputContent,
  setContent,
  onClick,
  buttonIcon,
  tooltipLabel,
  readOnly = true,
  placeholder,
}) => {
  return (
    <div
      style={{
        height: "90px",
        margin: "auto",
        marginTop: "50px",
        width: "95%",
      }}
    >
      <FormControl
        variant="outlined"
        style={{ margin: "0px auto", width: "100%" }}
      >
        <OutlinedInput
          style={{ height: "40px", borderRadius: "0px" }}
          value={inputContent}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          readOnly={readOnly}
          placeholder={placeholder ? placeholder : ""}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={tooltipLabel}
                onClick={onClick}
                edge="end"
              >
                <Tooltip title={tooltipLabel}>{buttonIcon}</Tooltip>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default InputWithButton;
