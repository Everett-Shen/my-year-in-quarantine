import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Fade,
} from "@material-ui/core";
import {
  TextInput,
  DateInput,
  returnErrorMsg,
} from "../baseComponents/baseInputs";
import CheckmarkWithLabel from "../baseComponents/checkmarkWithLabel";
import * as Yup from "yup";
import _ from "lodash";

const getInitialTouched = (initialValues) => {
  if (initialValues.entry === "") return {};
  else
    return {
      entry: true,
      date: true,
      description: true,
      from: true,
      to: true,
    };
};

const entrySchema = Yup.object().shape(
  {
    entry: Yup.string().max(50, "max 50 characters").required("required"),
    date: Yup.date().when("from", {
      // date is required when from is undefined (i.e. for events)
      is: (val) => val === undefined,
      then: Yup.date().typeError("q4: date is required").required("required"),
      otherwise: Yup.date().notRequired(),
    }),
    from: Yup.date().when("date", {
      // required when date is undefined (i.e. for phases)
      is: (val) => val === undefined,
      then: Yup.date().typeError("q4: date is required").required("required"),
      otherwise: Yup.date().notRequired(),
    }),
    to: Yup.date()
      .nullable()
      .when(["date", "ongoing"], {
        // required when date is undefined (i.e. for phases), and ongoing is not true
        is: (date, ongoing) => date === undefined && !ongoing,
        then: Yup.date().typeError("q4: date is required").required("required"),
        otherwise: Yup.date().notRequired().nullable(),
      })
      .when("from", (from, schema) => {
        return schema.test({
          test: (to) => !to || !from || to > from,
          message: "end date should be after start date",
        });
      }),
    description: Yup.string().max(500, "max 500 characters"),
  },
  [
    ["date", "from"],
    ["date", "to"],
    ["to", "from"],
  ]
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const DialogForm = ({
  initialValues,
  onSubmit,
  isOpen,
  setIsOpen,
  formRef,
  deleteEntry,
  isNewForm = false,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      innerRef={formRef}
      initialTouched={getInitialTouched(initialValues)}
      validateOnMount
      validationSchema={entrySchema}
    >
      {(formik) => (
        <Form>
          <Dialog
            onClose={(e) => {
              if (!isNewForm) onSubmit(formik.values);
              formik.resetForm();
              setIsOpen(false);
            }}
            open={isOpen}
            maxWidth={"sm"}
            fullWidth={true}
            TransitionComponent={Transition}
          >
            <div>
              <DialogContent className="dialog-content">
                <div className="dialog-content">
                  <div
                    style={{
                      color: "gray",
                      fontSize: "0.8em",
                      marginLeft: "5px",
                    }}
                  >
                    *required
                  </div>
                  {/* entry name */}
                  <TextInput
                    style={{ marginTop: "15px" }}
                    name={"entry"}
                    placeholder={""}
                    classnames={"text-input text-input-wide"}
                    fullWidth={true}
                    required={true}
                    variant="outlined"
                    label="event/phase"
                  />

                  <ErrorMessage name="entry" render={returnErrorMsg} />
                  {initialValues.date !== undefined ? (
                    <div>
                      {/*event date*/}
                      <DateInput
                        style={{ width: "100%", marginTop: "20px" }}
                        name={"date"}
                        classnames={"date-input date-input-wide"}
                        required={true}
                        inputVariant="outlined"
                        label="date"
                      />
                      <ErrorMessage name="date" render={returnErrorMsg} />
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      {/* time period dates */}
                      <div style={{ width: "45%" }}>
                        <DateInput
                          name={"from"}
                          style={{ width: "100%" }}
                          classnames={"date-input date-input-wide"}
                          required={true}
                          inputVariant="outlined"
                          label="start date"
                        />
                        <ErrorMessage name="from" render={returnErrorMsg} />
                      </div>
                      <span style={{ margin: "15px 5%" }}>to</span>
                      <div style={{ width: "45%" }}>
                        <DateInput
                          style={{ width: "100%" }}
                          name={"to"}
                          classnames={"date-input date-input-wide"}
                          required={true}
                          inputVariant="outlined"
                          label="end date"
                          disabled={formik.values.ongoing} // disable end date if period is currently ongoing
                        />
                        <ErrorMessage name="to" render={returnErrorMsg} />
                        {/* currently ongoing checkmark */}
                        <div style={{ float: "right" }}>
                          <CheckmarkWithLabel
                            label={"currently ongoing"}
                            labelPlacement="start"
                            name="ongoing"
                            onChange={formik.handleChange}
                            checked={formik.values.ongoing}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* description */}
                  <TextInput
                    id={"test2"}
                    name={"description"}
                    style={{
                      marginTop: `${
                        initialValues.date !== undefined ? "20px" : "0px"
                      }`,
                    }}
                    placeholder={""}
                    classnames={"text-input text-input-wide"}
                    fullWidth={true}
                    variant="outlined"
                    multiline={true}
                    rows={10}
                    rowsMax={10}
                    label="description/notes (optional)"
                  />
                  <ErrorMessage name="description" render={returnErrorMsg} />
                  {deleteEntry !== undefined && (
                    <Button
                      style={{
                        textTransform: "none",
                        color: "rgb(255, 118, 118)",
                      }}
                      onClick={() => {
                        deleteEntry();
                      }}
                      color="primary"
                    >
                      delete entry
                    </Button>
                  )}
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{
                    textTransform: "none",
                    color: "C4C4C4",
                  }}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  cancel
                </Button>
                <Button
                  type="submit"
                  style={{
                    textTransform: "none",
                    color: "rgb(255, 118, 118)",
                  }}
                  onClick={() => {
                    if (formRef.current) {
                      formRef.current.handleSubmit();
                    }
                    if (_.isEmpty(formik.errors)) {
                      setIsOpen(false);
                    }
                  }}
                >
                  update
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default DialogForm;
export { entrySchema };
