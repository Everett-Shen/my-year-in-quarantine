import React from "react";
import InputWithButton from "../baseComponents/inputWithButton";
import SendIcon from "@material-ui/icons/Send";

const EditLinkDialog = ({ email, setEmail, sendEmail, setSent }) => {
  return (
    <>
      <div className="note">
        Enter your email address and press "send" to receive a secret link that
        can be used to edit your timeline in the future!
      </div>
      <InputWithButton
        inputContent={email}
        setContent={setEmail}
        placeholder={"e.g. johnsmith@gmail.com"}
        onClick={() => {
          sendEmail(email);
          //   setSent(true);
        }}
        buttonIcon={<div></div>}
        tooltipLabel={"send edit link"}
        readOnly={false}
      />
    </>
  );
};

export default EditLinkDialog;
