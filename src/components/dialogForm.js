import React from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { TextInput, DateInput } from "./CreateTimeline";

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
                  {initialValues.date !== undefined ? (
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
                    setIsOpen(false);
                  }}
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
