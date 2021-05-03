import React from "react";
import CheckmarkWithLabel from "../baseComponents/checkmarkWithLabel";
import HelpTooltip from "../baseComponents/helpTooltip";

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
          <CheckmarkWithLabel
            label={"Make timeline public"}
            checked={makePublic}
            onChange={updateMakePublic}
          />
          <HelpTooltip contents="Determines if your timeline will show up in searches" />
        </div>

        <div className="align-items-center">
          <CheckmarkWithLabel
            label={"Make timeline anonymous"}
            checked={makeAnonymous}
            onChange={updateMakeAnonymous}
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
        <strong>Note</strong>: you will still be able to edit your timeline
        after publishing using the link provided in the next step!
      </div>
      <br />
      {/* <ActionButton text="Publish" onClick={publishTimeline} /> */}
    </>
  );
};

export default PublishDialog;
