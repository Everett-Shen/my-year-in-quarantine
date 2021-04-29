import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import EditIcon from "@material-ui/icons/Edit";

import { IconButton } from "@material-ui/core";
import DialogForm from "./dialogForm";
import AddButton from "../baseComponents/addButton";
import ItemMenu from "../baseComponents/ItemMenu";
import {
  FormikTextFieldQuestion,
  LocationInput,
  LocationAndDateEntry,
} from "../baseComponents/baseInputs";
import * as Yup from "yup";

const sortEntries = (entries) => {
  entries.sort((entryA, entryB) => {
    let dateA = entryA.date ? entryA.date : entryA.from;
    let dateB = entryB.date ? entryB.date : entryB.from;
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  });
  return entries;
};

const formatDate = (dateString) => {
  try {
    let date = new Date(dateString);

    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${month < 10 ? "0" + month : month}/${
      day < 10 ? "0" + day : day
    }/${date.getFullYear()}`;
  } catch {
    return "";
  }
};

const Q1 = ({ questionOne, setQuestionOne }) => {
  const setLocation = (value) => {
    setQuestionOne({ location: value });
  };
  return (
    <div className="questionContainer">
      <div className="locationInput">
        <LocationInput
          value={questionOne.location}
          onChange={(location) => {
            setLocation(location);
          }}
          placeholder={"ex. New York City"}
        />
      </div>
    </div>
  );
};

const Q2Schema = Yup.object().shape({
  entries: Yup.array().of(
    Yup.object().shape({
      date: Yup.date().when("location", {
        // required when location is not empty
        is: (val) => typeof val === "object",
        then: Yup.date().typeError("q2: date is required").required("required"),
        otherwise: Yup.date().notRequired().nullable(),
      }),
    })
  ),
});

const Q2 = ({ questionTwo, setQuestionTwo, updatePanelContainer }) => {
  return (
    <div className="questionContainer">
      <h4>note</h4>
      <div className="notes">
        <p>1. entries will be automatically sorted by date</p>

        <p>2. if you don't know exact the dates, approximate dates are fine!</p>
        <p>
          3. Include repeat locations. Do not include the location from Q1. If
          you remained in one place, leave this question empty.
        </p>
      </div>

      <Formik
        initialValues={questionTwo}
        onSubmit={(values) => {
          setQuestionTwo(values);
        }}
        // validationSchema={Q2Schema}
      >
        {(props) => (
          <Form id="Q2">
            <FieldArray
              name="entries"
              render={(arrayHelpers) => (
                <div style={{ position: "relative", marginTop: "30px" }}>
                  <div className={"roadmap-container"}>
                    {props.values.entries.map((entry, index) => (
                      <>
                        <div className="roadmap-entry-container">
                          <LocationAndDateEntry
                            locationValue={entry.location}
                            locationName={`entries.${index}.entry`}
                            locationOnChange={(location) => {
                              props.setFieldValue(
                                `entries.${index}.location`,
                                location
                              );
                            }}
                            locationPlaceholder={
                              index === 0 ? "ex. New York City" : ""
                            }
                            deleteEntry={() => {
                              arrayHelpers.remove(index);
                              updatePanelContainer();
                            }}
                            dateName={`entries.${index}.date`}
                            dateOnChange={() => {
                              // handle sorting
                              let sortedEntries = sortEntries(
                                props.values.entries
                              );
                              props.setFieldValue("entries", sortedEntries);
                            }}
                          />
                        </div>

                        {index !== props.values.entries.length - 1 && (
                          <div className={"dots"}></div>
                        )}
                      </>
                    ))}
                    <AddButton
                      onClick={() => {
                        arrayHelpers.push({ location: "", date: null });
                        updatePanelContainer();
                      }}
                    />
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Q4 = ({
  questionFour,
  setQuestionFour,
  isDialogFormOpen,
  setIsDialogFormOpen,
  selectedEntry,
  setSelectedEntry,
  selectedEntryIndex,
  setSelectedEntryIndex,
  formRef,
  isNewEntryFormOpen,
  setIsNewEntryFormOpen,
  updatePanelContainer,
  newEntryFormRef,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="questionContainer">
      <h4>note</h4>
      <div className="notes">
        <p>1. click the "+" icon to add entries</p>
        <p>2. events don't have to be pandemic-related!</p>
        <p>3. if you don't know exact the dates, approximate dates are fine!</p>
        <p>4. this question should be the longest by far. take your time!</p>
      </div>
      {questionFour.entries.map((entry, index) => (
        <div className="inputRow" key={index}>
          <div className="entry-container">
            <div style={{ gridColumnStart: "1", gridColumnEnd: "2" }}>
              <p>{entry.entry}</p>
            </div>
            <div
              style={{
                gridColumnStart: "2",
                gridColumnEnd: "3",
                textAlign: "center",
              }}
            >
              {/* if date is undefined or empty */}
              {entry.date !== undefined ? (
                <p>{formatDate(entry.date)}</p>
              ) : entry.ongoing === false ? (
                <p>{`${
                  formatDate(entry.from) + "-" + formatDate(entry.to)
                }`}</p>
              ) : (
                <p>{`${formatDate(entry.from) + "-" + "present"}`}</p>
              )}
            </div>
            <div style={{ gridColumnStart: "3", gridColumnEnd: "4" }}>
              <IconButton
                style={{
                  float: "right",
                  position: "relative",
                  top: "-10px",
                }}
                onClick={() => {
                  setIsDialogFormOpen(true);
                  setSelectedEntry(entry);
                  setSelectedEntryIndex(index);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
      ))}

      <AddButton onClick={handleClick} />
      <ItemMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        menuItems={[
          {
            onClick: () => {
              handleClose();
              setSelectedEntry({ entry: "", date: null });
              setIsNewEntryFormOpen(true);
            },
            label: "add event",
          },
          {
            onClick: () => {
              handleClose();
              setSelectedEntry({ entry: "", from: null, to: null });
              setIsNewEntryFormOpen(true);
            },
            label: "add time period",
          },
        ]}
      />
      {/* edit entry form */}
      <DialogForm
        initialValues={selectedEntry}
        onSubmit={(values) => {
          let newEntries = [...questionFour.entries];
          newEntries.splice(selectedEntryIndex, 1, values);
          sortEntries(newEntries);
          setQuestionFour({
            entries: newEntries,
          }); // may or may not work lol, we'll see
        }}
        isOpen={isDialogFormOpen}
        setIsOpen={setIsDialogFormOpen}
        formRef={formRef}
        deleteEntry={() => {
          let newEntries = [...questionFour.entries];
          newEntries.splice(selectedEntryIndex, 1);
          setQuestionFour({
            entries: newEntries,
          }); // also may or may not work, we'll see lol
          setIsDialogFormOpen(false);
        }}
      />

      {/* new entry form */}
      <DialogForm
        initialValues={selectedEntry}
        onSubmit={(values) => {
          let newEntries = [...questionFour.entries, values];
          sortEntries(newEntries);
          setQuestionFour({ entries: newEntries });
          updatePanelContainer();
        }}
        isOpen={isNewEntryFormOpen}
        setIsOpen={setIsNewEntryFormOpen}
        formRef={newEntryFormRef}
        isNewForm={true}
      />
    </div>
  );
};
const Q5 = ({ questionFive, setQuestionFive }) => {
  return (
    <FormikTextFieldQuestion
      questionNumber={"Q5"}
      questionName={"text"}
      initialValues={questionFive}
      placeholder={""}
      onSubmit={(values) => {
        setQuestionFive(values);
      }}
      required={true}
      multiRow={true}
      charLimit={500}
    />
  );
};
const Q6 = ({ questionSix, setQuestionSix }) => {
  return (
    <FormikTextFieldQuestion
      questionNumber={"Q6"}
      questionName={"name"}
      initialValues={questionSix}
      required={true}
      placeholder={""}
      onSubmit={(values) => {
        setQuestionSix(values);
      }}
    />
  );
};

export { Q1, Q2, Q4, Q5, Q6, Q2Schema };
