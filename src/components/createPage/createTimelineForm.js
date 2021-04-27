import React from "react";
import Accordion from "../Accordion/accordion";

const CreateTimelineForm = ({
  panels,
  schema,
  answers,
  setErrors,
  history,
  errors,
}) => {
  const LOCAL_STORAGE_FORM_SUBMITTED_KEY =
    "my-year-in-quarantine-form-submitted";
  const LOCAL_STORAGE_DOC_ID_KEY = "my-year-in-quarantine-doc-id";
  return (
    <>
      <Accordion panels={panels} />
      <div style={{ margin: "20px", height: "100px" }}>
        <button
          className="finish"
          onClick={() => {
            schema
              .validate(answers, { abortEarly: false })
              .then((valid) => {
                setErrors([]);
                console.log(answers);
                // prevent resubmission
                localStorage.setItem(LOCAL_STORAGE_FORM_SUBMITTED_KEY, false);
                localStorage.setItem(LOCAL_STORAGE_DOC_ID_KEY, null);
                history.push("/preview");
              })
              .catch((err) => {
                setErrors(err.errors);
              });
          }}
        >
          <span style={{ cursor: "pointer", outline: "none" }}>Preview</span>
        </button>
        <div className="errorContainer">
          {errors.map((error, index) => (
            <div
              key={index}
              style={{
                color: "red",
                fontSize: "0.8em",
                marginLeft: "5px",
              }}
            >
              {error}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateTimelineForm;
