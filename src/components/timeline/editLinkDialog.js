import React from "react";
import InputWithButton from "../baseComponents/inputWithButton";
import SendIcon from "@material-ui/icons/Send";

const EditLinkDialog = ({ email, setEmail, sendURL, setSent }) => {
  return (
    <>
      <div className="note">
        Enter your email and press "send" to receive a secret link that can be
        used to edit your timeline in the future!
      </div>
      <InputWithButton
        inputContent={email}
        setContent={setEmail}
        placeholder={"e.g. johnsmith@gmail.com"}
        onClick={() => {
          sendURL(email);
          //   setSent(true);
        }}
        buttonIcon={<SendIcon />}
        tooltipLabel={"send edit link"}
        readOnly={false}
      />
    </>
  );
};

export default EditLinkDialog;
