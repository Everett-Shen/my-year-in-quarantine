import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { ErrorMessage, Form, Formik, useField } from "formik";
import React from "react";
import * as Yup from "yup";
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
  // field.value = field.value ? field.value : props.defaultValue;
  return (
    <>
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
        views={["year", "month", "date"]}
      />
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
  apiKey = "AIzaSyCeVWbfSffGK19HP7Tg-GY_nFfZ-sP7ASw",
}) => {
  return (
    <GooglePlacesAutocomplete
      apiKey={apiKey}
      selectProps={{
        value: value,
        onChange: onChange,
        placeholder: placeholder,
      }}
    />
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
};
