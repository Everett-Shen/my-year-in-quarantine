import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { TextInput, DateInput } from "./CreateTimeline";
import * as Yup from "yup";
import _ from "lodash";

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

const DialogForm = ({
  initialValues,
  onSubmit,
  isOpen,
  setIsOpen,
  formRef,
  deleteEntry,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      innerRef={formRef}
      validationSchema={Yup.object().shape(
        {
          entry: Yup.string()
            .max(100, "max 100 characters")
            .required("required"),
          date: Yup.date().when("from", {
            // date is required when from is undefined (i.e. for events)
            is: (val) => val === undefined,
            then: Yup.date().required("required"),
            otherwise: Yup.date().notRequired(),
          }),
          from: Yup.date().when("date", {
            // required when date is undefined (i.e. for phases)
            is: (val) => val === undefined,
            then: Yup.date().required("required"),
            otherwise: Yup.date().notRequired(),
          }),
          to: Yup.date()
            .when("date", {
              // required when date is undefined (i.e. for phases)
              is: (val) => val === undefined,
              then: Yup.date().required("required"),
              otherwise: Yup.date().notRequired(),
            })
            .when("from", (from, schema) => {
              return schema.test({
                test: (to) => !to || !from || to > from,
                message: "end date should be after start",
              });
            }),
        },
        [
          ["date", "from"],
          ["date", "to"],
          ["to", "from"],
        ]
      )}
    >
      {(formik) => (
        <Form>
          <Dialog
            onClose={() => {
              setIsOpen(false);
            }}
            open={isOpen}
            maxWidth={"sm"}
            fullWidth={true}
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
                      <DateInput
                        style={{ width: "100%", marginTop: "20px" }}
                        name={"date"}
                        classnames={"date-input date-input-wide"}
                        required={true}
                        variant="outlined"
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
                      <div style={{ width: "45%" }}>
                        <DateInput
                          name={"from"}
                          style={{ width: "100%" }}
                          classnames={"date-input date-input-wide"}
                          required={true}
                          variant="outlined"
                          label="start date"
                        />
                        <ErrorMessage name="from" render={returnErrorMsg} />
                      </div>
                      <span style={{ margin: "15px 40px" }}>to</span>
                      <div style={{ width: "45%" }}>
                        <DateInput
                          style={{ width: "100%" }}
                          name={"to"}
                          classnames={"date-input date-input-wide"}
                          required={true}
                          variant="outlined"
                          label="end date"
                        />
                        <ErrorMessage name="to" render={returnErrorMsg} />
                      </div>
                    </div>
                  )}

                  <TextInput
                    id={"test2"}
                    name={"description"}
                    style={{ marginTop: "20px" }}
                    placeholder={""}
                    classnames={"text-input text-input-wide"}
                    fullWidth={true}
                    variant="outlined"
                    multiline={true}
                    rows={10}
                    rowsMax={10}
                    label="description/notes (optional)"
                  />
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
                    if (_.isEmpty(formik.errors)) setIsOpen(false);
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
