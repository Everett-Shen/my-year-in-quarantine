import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

const SocialMediaRow = () => {
  const icons = [
    {
      icon: <InstagramIcon fontSize="large" />,
      url: "https://www.instagram.com/",
    },
    {
      icon: <FacebookIcon fontSize="large" />,
      url: "https://www.facebook.com/",
    },
    {
      icon: <TwitterIcon fontSize="large" />,
      url: "https://www.twitter.com/",
    },
    {
      icon: <EmailOutlinedIcon fontSize="large" />,
      url: "mailto:myyearinquarantine@gmail.com",
    },
  ];
  return (
    <div className="social-media-row">
      {icons.map((icon, index) => {
        return (
          <IconButton
            key={index}
            onClick={() => {
              window.open(icon.url, "_blank");
            }}
            size="medium"
          >
            {icon.icon}
          </IconButton>
        );
      })}
    </div>
  );
};

export default SocialMediaRow;
