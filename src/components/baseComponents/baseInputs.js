import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ErrorMessage, Form, Formik, useField } from "formik";
import React from "react";
import * as Yup from "yup";

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
}) => {
  return (
    <div className="questionContainer">
      <Formik
        initialValues={initialValues}
        validationSchema={
          required
            ? Yup.object({
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
            />
            <ErrorMessage name={questionName} render={returnErrorMsg} />
          </Form>
        )}
      </Formik>
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
export { TextInput, DateInput, FormikTextFieldQuestion, returnErrorMsg };
