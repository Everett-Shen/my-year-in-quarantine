import React from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Tooltip,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import _ from "lodash";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const ShareDialog = ({ isOpen, setIsOpen, shareURL }) => {
  return (
    <Dialog
      onClose={() => {
        setIsOpen(false);
      }}
      open={isOpen}
      maxWidth={"sm"}
      fullWidth={true}
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
              Export and share
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
            {/* share button row */}
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
              <TwitterShareButton url={shareURL}>
                <TwitterIcon size={50} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareURL}>
                <LinkedinIcon size={50} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={shareURL}>
                <WhatsappIcon size={50} round />
              </WhatsappShareButton>
            </div>
            {/* link */}
            <div
              style={{
                height: "90px",
                margin: "auto",
                marginTop: "50px",
                width: "90%",
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
                        onClick={() => {}}
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
              {/* <TextField
                style={{ margin: "10px auto", width: "100%" }}
                InputProps={{
                  readOnly: true,
                  style: { height: "40px", borderRadius: "0px" },
                }}
                defaultValue={shareURL}
                variant="outlined"
                color="none"
              >
              </TextField> */}
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ShareDialog;
