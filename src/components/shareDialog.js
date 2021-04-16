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
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import BaseSnackbar from "./baseComponents/baseSnackbar";
import copy from "copy-to-clipboard";

const ShareDialog = ({
  shareURL,
  makePublic,
  setMakePublic,
  setShowDownloadTimeline,
  setShowDownloadTimelineHorizontal,
  setShowDownloadTimelineMultiple,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);
  const handleClose = () => {
    // for closing save menu
    setAnchorEl(null);
  };
  const openSaveMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const updateMakePublic = (e) => {
    setMakePublic(e.target.checked);
  };
  // const ColoredCheckbox = withStyles({
  //   root: {
  //     // color: "rgb(255, 118, 118)",
  //     "&$checked": {
  //       color: "rgb(255, 118, 118)",
  //     },
  //   },
  //   checked: {},
  // })((props) => <Checkbox color="default" {...props} />);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "50px",
          margin: "40px 0px",
        }}
      >
        <FacebookShareButton url={shareURL}>
          <FacebookIcon size={50} round />
        </FacebookShareButton>
        <IconButton
          aria-label="copy link to clipboard"
          onClick={openSaveMenu}
          size="medium"
        >
          <Tooltip title="download" enterTouchDelay={0}>
            <GetAppIcon fontSize="large" />
          </Tooltip>
        </IconButton>
        <TwitterShareButton url={shareURL}>
          <TwitterIcon size={50} round />
        </TwitterShareButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              setShowDownloadTimeline(true);
              handleClose();
            }}
          >
            Save as vertical image
          </MenuItem>
          <MenuItem
            onClick={() => {
              setShowDownloadTimelineHorizontal(true);
              handleClose();
            }}
          >
            Save as horizontal image
          </MenuItem>
          <MenuItem
            onClick={() => {
              setShowDownloadTimelineMultiple(true);
              handleClose();
            }}
          >
            Save as image set (recommended for social media)
          </MenuItem>
        </Menu>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "50px",
          margin: "40px 0px",
        }}
      >
        <LinkedinShareButton url={shareURL}>
          <LinkedinIcon size={50} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareURL}>
          <WhatsappIcon size={50} round />
        </WhatsappShareButton>
      </div>
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
            defaultValue={shareURL}
            readOnly
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="copy link to clipboard"
                  onClick={() => {
                    copy(shareURL);
                    setCopied(true);
                  }}
                  edge="end"
                >
                  <Tooltip title="copy to clipboard">
                    <FileCopyIcon />
                  </Tooltip>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {/* <FormControlLabel
          // style={{ float: "right", marginRight: "0px" }}
          label="make timeline public"
          control={
            <ColoredCheckbox
              checked={makePublic}
              onChange={updateMakePublic}
              name="checkedB"
              color="primary"
            />
          }
        /> */}
      </div>
      <BaseSnackbar
        open={copied}
        setOpen={setCopied}
        message={"Copied"}
        severity={"success"}
        autoHideDuration={1500}
      />
    </>
  );
};
export default ShareDialog;
