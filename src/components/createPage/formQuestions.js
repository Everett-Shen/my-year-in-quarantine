import React, { useState } from "react";
import { Formik, Form } from "formik";
import EditIcon from "@material-ui/icons/Edit";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { IconButton } from "@material-ui/core";
import DialogForm from "./dialogForm";
import AddButton from "../baseComponents/addButton";
import ItemMenu from "../baseComponents/ItemMenu";
import { FormikTextFieldQuestion } from "../baseComponents/baseInputs";

const sortEntries = (entries) => {
  entries.sort((entryA, entryB) => {
    let dateA = entryA.date ? entryA.date : entryA.from;
    let dateB = entryB.date ? entryB.date : entryB.from;
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  });
};

const Q1 = ({ questionOne, setQuestionOne }) => {
  const setLocation = (value) => {
    setQuestionOne({ location: value });
  };
  return (
    <div className="questionContainer">
      <div className="locationInput">
        <GooglePlacesAutocomplete
          apiKey="AIzaSyCeVWbfSffGK19HP7Tg-GY_nFfZ-sP7ASw"
          selectProps={{
            value: questionOne.location,
            onChange: (location) => {
              setLocation(location);
            },
            placeholder: "ex. New York City",
          }}
        />
      </div>
    </div>
  );
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
        <p>1. click the pencil icon to add notes or edit/delete entries</p>
        <p>2. use the notes section to provide additional details</p>
        <p>3. click the calendar icon to open date picker</p>
        <p>4. click the "+" icon to add additional entries</p>
        <p>5. this question should be the longest. take your time!</p>
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
              ) : (
                <p>{`${
                  formatDate(entry.from) + "-" + formatDate(entry.to)
                }`}</p>
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
// const Q5 = ({ questionFive, setQuestionFive }) => {
//   return (
//     <FormikTextFieldQuestion
//       questionNumber={"Q5"}
//       questionName={"title"}
//       initialValues={questionFive}
//       placeholder={"ex. My Year in Quarantine"}
//       onSubmit={(values) => {
//         setQuestionFive(values);
//       }}
//     />
//   );
// };
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

export { Q1, Q4, Q6 };
