import React, { useState } from "react";
import {
  InputAdornment,
  FormControl,
  OutlinedInput,
  Tooltip,
  Menu,
  MenuItem,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookMessengerIcon,
} from "react-share";
import BaseSnackbar from "../baseComponents/baseSnackbar";
import InputWithButton from "../baseComponents/inputWithButton";
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

  return (
    <>
      <div
        style={{ margin: "20px 10%", textAlign: "center", fontSize: "0.9em" }}
      >
        tag @myyearinquarantine on facebook, twitter, or instagram in your posts
        for a chance to have your timeline featured!
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "50px",
          margin: "40px 0px",
        }}
      >
        <FacebookShareButton
          url={"shareURL"}
          quote={"Check out my year in quarantine!"}
        >
          <FacebookIcon size={50} round />
        </FacebookShareButton>
        <IconButton
          aria-label="copy link to clipboard"
          onClick={openSaveMenu}
          size="medium"
          // style={{ padding: "0px" }}
        >
          <Tooltip title="download" enterTouchDelay={200}>
            <GetAppIcon fontSize="large" />
          </Tooltip>
        </IconButton>
        <TwitterShareButton
          url={shareURL}
          title={"Check out my year in quarantine!"}
        >
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
            style={{ overflowX: "scroll" }}
          >
            Save as post (recommended for social media)
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
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareURL}`}
        >
          <LinkedinIcon size={50} round />
        </a>

        <FacebookMessengerShareButton
          url={shareURL}
          title={"Check out my year in quarantine!"}
        >
          <FacebookMessengerIcon size={45} round />
        </FacebookMessengerShareButton>

        <WhatsappShareButton
          url={shareURL}
          title={"Check out my year in quarantine!"}
        >
          <WhatsappIcon size={50} round />
        </WhatsappShareButton>
      </div>
      {/* <div
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
                  <Tooltip title="copy to clipboard"></Tooltip>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div> */}
      <InputWithButton
        inputContent={shareURL}
        onClick={() => {
          copy(shareURL);
          setCopied(true);
        }}
        buttonIcon={<FileCopyIcon />}
        tooltipLabel={"copy to clipboard"}
      />
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
