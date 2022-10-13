import { TextField, useMediaQuery } from "@material-ui/core";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { ErrorMessage, Form, Formik, useField } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNonInitialEffect } from "../../helpers/hooks.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const TextInput = ({ ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <TextField className={props.classnames} {...field} {...props}></TextField>
    </>
  );
};

const DateInput = ({ ...props }) => {
  const mobile = useMediaQuery("(max-width:600px)");
  const [field, meta, helpers] = useField(props);
  const inputProps = {
    disableUnderline: true,
  };
  const [closedKey, setClosedKey] = useState(0);
  useNonInitialEffect(() => {
    if (typeof props.dateOnChange === "function") props.dateOnChange();
  }, [closedKey]); // when calendar is closed, sort entries (need to use useeffect or else sorting will happen before date gets updated)

  return (
    <>
      {mobile ? (
        <DatePicker
          clearable
          disableToolbar
          autoOk
          disableFuture
          openTo="year"
          className={props.classnames}
          variant={mobile ? "dialog" : "inline"}
          InputProps={inputProps}
          placeholder="mm/dd/yyyy"
          format="MM/dd/yyyy"
          {...props}
          {...field}
          onChange={(date) => {
            helpers.setValue(date);
          }}
          onClose={() => {
            setClosedKey(closedKey + 1);
          }}
          views={["year", "month", "date"]}
        />
      ) : (
        <KeyboardDatePicker
          clearable
          disableToolbar
          autoOk
          disableFuture
          openTo="year"
          className={props.classnames}
          variant={mobile ? "dialog" : "inline"}
          InputProps={inputProps}
          placeholder="mm/dd/yyyy"
          format="MM/dd/yyyy"
          {...props}
          {...field}
          onChange={(date) => {
            helpers.setValue(date);
          }}
          onClose={() => {
            setClosedKey(closedKey + 1);
          }}
          views={["year", "month", "date"]}
        />
      )}
    </>
  );
};

const FormikTextFieldQuestion = ({
  questionNumber,
  questionName,
  initialValues,
  required,
  placeholder,
  onSubmit,
  charLimit,
  multiRow = false,
}) => {
  return (
    <div className="questionContainer">
      <Formik
        initialValues={initialValues}
        validationSchema={
          required
            ? charLimit
              ? Yup.object({
                  [questionName]: Yup.string()
                    .max(charLimit, `max ${charLimit} characters`)
                    .required("required"),
                })
              : Yup.object({
                  [questionName]: Yup.string().required("required"),
                })
            : Yup.object({})
        }
        enableReinitialize
        onSubmit={onSubmit}
      >
        {() => (
          <Form id={questionNumber}>
            <TextInput
              id={questionName}
              name={questionName}
              placeholder={placeholder}
              classnames={"text-input-wide"}
              multiline={multiRow}
              rows={multiRow ? 10 : 1}
              rowsMax={multiRow ? 10 : 1}
              variant={multiRow ? "outlined" : "standard"}
            />
            <ErrorMessage name={questionName} render={returnErrorMsg} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

const LocationInput = ({
  value,
  onChange,
  placeholder,
  apiKey = "API_KEY",
  name,
}) => {
  return (
    <GooglePlacesAutocomplete
      apiKey={apiKey}
      selectProps={{
        value: value,
        onChange: onChange,
        placeholder: placeholder,
      }}
      name={name}
    />
  );
};

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className="deleteButton"
      type="button"
      tabIndex="-1"
      onClick={onClick}
    >
      delete
    </button>
  );
};

const LocationAndDateEntry = ({
  locationValue,
  locationOnChange,
  locationPlaceholder,
  locationName,
  deleteEntry,
  dateName,
  dateOnChange,
}) => {
  const mobile = useMediaQuery("(max-width:600px)");
  return (
    <div style={{ width: "100%" }}>
      <LocationInput
        value={locationValue}
        onChange={locationOnChange}
        placeholder={locationPlaceholder}
        id={locationName}
        name={locationName}
      />
      <ErrorMessage name={locationName} render={returnErrorMsg} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DeleteButton onClick={deleteEntry} />
        <DateInput
          style={{ width: mobile ? "100px" : "150px" }}
          id={dateName}
          name={dateName}
          classnames={"date-input"}
          label={mobile ? "arrival date" : "arrival date"}
          dateOnChange={dateOnChange}
        />
      </div>
      <ErrorMessage name={dateName} render={returnErrorMsg} />
    </div>
  );
};

const returnErrorMsg = (msg) => {
  return (
    <div
      style={{
        color: "red",
        fontSize: "0.8em",
        marginLeft: "5px",
        textAlign: "right",
      }}
    >
      {msg}
    </div>
  );
};
export {
  TextInput,
  DateInput,
  FormikTextFieldQuestion,
  returnErrorMsg,
  LocationInput,
  LocationAndDateEntry,
};
