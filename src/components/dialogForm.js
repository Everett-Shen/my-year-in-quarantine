import React, { useState, createRef } from "react";
import { Formik, Form, FieldArray, useField } from "formik";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";
import { TextInput, DateInput } from "./CreateTimeline";

const DialogForm = ({
  initialValues,
  onSubmit,
  isOpen,
  setIsOpen,
  formRef,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      //   enableReinitialize
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {
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
                  <TextInput
                    name={"entry"}
                    placeholder={""}
                    classnames={"text-input text-input-wide"}
                    fullWidth={true}
                    variant="outlined"
                    label="event/phase"
                  />
                  {initialValues.date ? (
                    <DateInput
                      style={{ float: "right" }}
                      name={"date"}
                      classnames={"date-input date-input-wide"}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <DateInput
                        name={"from"}
                        classnames={"date-input date-input-wide"}
                      />
                      <span style={{ margin: "6px 40px" }}>to</span>

                      <DateInput
                        name={"to"}
                        classnames={"date-input date-input-wide"}
                      />
                    </div>
                  )}

                  <TextInput
                    id={"test2"}
                    name={"description"}
                    placeholder={""}
                    classnames={"text-input text-input-wide"}
                    fullWidth={true}
                    variant="outlined"
                    multiline={true}
                    rows={10}
                    rowsMax={10}
                    label="description/notes"
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{
                    textTransform: "none",
                    color: "rgb(255, 118, 118)",
                  }}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  color="primary"
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
                    setIsOpen(false);
                  }}
                  color="primary"
                >
                  update
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </Form>
      }
    </Formik>
  );
};

export default DialogForm;
