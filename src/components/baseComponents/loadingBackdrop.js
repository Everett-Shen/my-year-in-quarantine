import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function LoadingBackdrop({
  open,
  setOpen,
  message = "this may take a few seconds",
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="loading-backdrop">
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
          <div
            style={{
              margin: "20px",
            }}
          >
            {" "}
            {message}
          </div>
        </div>
      </Backdrop>
    </div>
  );
}
