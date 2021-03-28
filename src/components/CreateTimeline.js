import React, { useState, createRef, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Formik, Form, FieldArray, useField } from "formik";
import Accordion from "./Accordion/accordion.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const CreateTimeline = () => {
  const [questionTwo, setQuestionTwo] = useState({
    events: [
      { event: "", date: "" },
      { event: "", date: "" },
      { event: "", date: "" },
    ],
  });
  const [questionThree, setQuestionThree] = useState({
    phases: [
      { phase: "", from: "", to: "" },
      { phase: "", from: "", to: "" },
      { phase: "", from: "", to: "" },
    ],
  });

  const [answers, setAnswers] = useState({
    Q1: { location: "" },
    Q2: {
      events: [
        { event: "", date: "" },
        { event: "", date: "" },
        { event: "", date: "" },
      ],
    },
    Q3: {
      phases: [
        { phase: "", from: "", to: "" },
        { phase: "", from: "", to: "" },
        { phase: "", from: "", to: "" },
      ],
    },
    Q4: {
      entries: [
        { entry: "went home went home", date: "2017-03-04" },
        { entry: "went home", date: "2017-03-04" },
        { entry: "went home", date: "2017-03-04" },
        { entry: "went home", from: "2017-03-04", to: "2017-03-04" },
        { entry: "went home", from: "2017-03-04", to: "2017-03-04" },
        { entry: "went home", from: "2017-03-04", to: "2017-03-04" },
      ],
    },
    Q5: { title: "" },
    Q6: { name: "" },
  });
  const [isOpen, setIsOpen] = useState(false);

  const sortEntries = (entries) => {
    entries.sort((entryA, entryB) => {
      let dateA = entryA.date ? entryA.date : entryA.from;
      let dateB = entryB.date ? entryB.date : entryB.from;
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    });
  };

  // take answers from Q2 and Q3 and collate them into the initial values for Q4.
  const setQ4 = () => {
    let events = questionTwo.events;
    let phases = questionThree.phases;
    let entries = { entries: [] };
    for (let event of events) {
      if (event.event !== "")
        entries.entries.push({ ...event, entry: event.event });
    }
    for (let phase of phases) {
      if (phase.phase !== "")
        entries.entries.push({ ...phase, entry: phase.phase });
    }

    sortEntries(entries.entries);

    setAnswers({
      ...answers,
      Q2: questionTwo,
      Q3: questionThree,
      Q4: entries,
    });
  };

  useEffect(() => {
    setQ4();
  }, [questionTwo, questionThree]);

  const Q1 = () => {
    const setLocation = (value) => {
      setAnswers({
        ...answers,
        Q1: { location: value },
      });
    };
    return (
      <div className="questionContainer">
        <div className="locationInput">
          <GooglePlacesAutocomplete
            apiKey="AIzaSyCeVWbfSffGK19HP7Tg-GY_nFfZ-sP7ASw"
            selectProps={{
              value: answers.Q1.location,
              onChange: setLocation,
            }}
          />
        </div>
      </div>
    );
  };

  const TextInput = ({ ...props }) => {
    const [field] = useField(props);
    return (
      <>
        <TextField
          className={props.classnames}
          {...field}
          {...props}
        ></TextField>
      </>
    );
  };

  const DateInput = ({ ...props }) => {
    const [field] = useField(props);
    const inputProps = {
      disableUnderline: true,
    };
    field.value = field.value ? field.value : props.defaultValue;
    return (
      <>
        <TextField
          className={props.classnames}
          type="date"
          InputProps={inputProps}
          // label="date"
          {...props}
          {...field}
        />
      </>
    );
  };

  const Q2 = (props) => {
    return (
      <div className="questionContainer">
        <Formik
          initialValues={answers.Q2}
          onSubmit={(values) => {
            setQuestionTwo(values);
          }}
        >
          {({ values }) => (
            <Form id="Q2">
              <FieldArray
                name="events"
                render={(arrayHelpers) => (
                  <div>
                    {values.events.map((event, index) => (
                      <div className="inputRow" key={index}>
                        <TextInput
                          id={`events.${index}.event`}
                          name={`events.${index}.event`}
                          placeholder={
                            index === 0 ? "ex. went home, got sick..." : ""
                          }
                          classnames={"text-input-wide"}
                        />
                        <button
                          className="deleteButton"
                          type="button"
                          onClick={() => {
                            arrayHelpers.remove(index);
                            props.update();
                          }}
                        >
                          delete
                        </button>
                        <DateInput
                          id={`events.${index}.date`}
                          name={`events.${index}.date`}
                          // defaultValue={index === 0 ? "2020-01-01" : ""}
                          // {figure out this lastdate thing later}
                          lastdate={
                            index !== 0 ? values.events[index - 1].date : null
                          }
                          classnames={"date-input"}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="addButton"
                      onClick={() => {
                        arrayHelpers.push({ name: "", age: "" });
                        props.update();
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              />
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const Q3 = (props) => {
    return (
      <div className="questionContainer">
        <Formik
          initialValues={answers.Q3}
          onSubmit={(values) => {
            setQuestionThree(values);
          }}
        >
          {({ values }) => (
            <Form id="Q3">
              <FieldArray
                name="phases"
                render={(arrayHelpers) => (
                  <div>
                    {values.phases.map((phase, index) => (
                      <div className="inputRow" key={index}>
                        <TextInput
                          id={`phases.${index}.phase`}
                          name={`phases.${index}.phase`}
                          placeholder={
                            index === 0
                              ? "ex. in quarantine, working from home..."
                              : ""
                          }
                          classnames={"text-input text-input-wide"}
                        />
                        <div className="rangeAndDeleteRow">
                          <button
                            className="deleteButton"
                            type="button"
                            onClick={() => {
                              arrayHelpers.remove(index);
                              props.update();
                            }}
                          >
                            delete
                          </button>
                          <div className="dateRange">
                            <DateInput
                              id={`phases.${index}.from`}
                              name={`phases.${index}.from`}
                              // defaultValue={index === 0 ? "2020-01-01" : ""}
                              // {figure out this lastdate thing later}
                              lastdate={
                                index !== 0
                                  ? values.phases[index - 1].from
                                  : null
                              }
                              classnames={"date-input"}
                            />
                            <span style={{ margin: "5px" }}>to</span>
                            <DateInput
                              id={`phases.${index}.to`}
                              name={`phases.${index}.to`}
                              // defaultValue={index === 0 ? "2020-01-01" : ""}
                              // {figure out this lastdate thing later}
                              lastdate={
                                index !== 0 ? values.phases[index - 1].to : null
                              }
                              classnames={"date-input"}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="addButton"
                      onClick={() => {
                        arrayHelpers.push({ name: "", age: "" });
                        props.update();
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              />
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const FormikTextFieldQuestion = ({
    questionNumber,
    questionName,
    initialValues,
  }) => {
    return (
      <div className="questionContainer">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            setAnswers({ ...answers, [questionNumber]: values });
          }}
        >
          {() => (
            <Form id={questionNumber}>
              <TextInput
                id={questionName}
                name={questionName}
                placeholder={"ex. My Year in Quarantine"}
                classnames={"text-input-wide"}
              />
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const [selectedEntry, setSelectedEntry] = useState({});
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(0);
  const formRef = createRef();

  const Q4 = (props) => {
    const formatDate = (dateString) => {
      function parseDate(input) {
        var parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
      }
      let date = parseDate(dateString);

      let month = date.getMonth() + 1;
      let day = date.getDate();
      return `${month < 10 ? "0" + month : month}/${
        day < 10 ? "0" + day : day
      }/${date.getFullYear()}`;
    };
    return (
      <div className="questionContainer">
        {answers.Q4.entries.map((entry, index) => (
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
                {entry.date ? (
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
                    setIsOpen(true);
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
        <Formik
          initialValues={selectedEntry} // create logic for this in a sec
          onSubmit={(values) => {
            console.log("submitted");
            let newEntries = [...answers.Q4.entries];
            newEntries[selectedEntryIndex] = values;
            sortEntries(newEntries);
            setAnswers({
              ...answers,
              Q4: {
                entries: newEntries,
              },
            });
          }}
          innerRef={formRef}
        >
          {
            <Form>
              <Dialog
                onClose={() => {
                  setIsOpen(false);
                  console.log("isOpen:", isOpen);
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
                      {selectedEntry.date ? (
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
        <button
          type="button"
          className="addButton"
          onClick={() => {
            // arrayHelpers.push({ name: "", age: "" });
            props.update();
          }}
        >
          +
        </button>
      </div>
    );
  };
  const Q5 = () => {
    return (
      <FormikTextFieldQuestion
        questionNumber={"Q5"}
        questionName={"title"}
        initialValues={answers.Q5}
      />
    );
  };
  const Q6 = () => {
    return (
      <FormikTextFieldQuestion
        questionNumber={"Q6"}
        questionName={"name"}
        initialValues={answers.Q5}
      />
    );
  };

  const panels = [
    {
      label: "1. Where were you located when COVID-19 began?",
      component: <Q1 />,
    },
    {
      label:
        "2. List the most significant things that have happened to you since then",
      id: "Q2",
      component: <Q2 />,
    },
    {
      label:
        "3. List any periods or phases you went through during this time that you consider significant",
      id: "Q3",
      component: <Q3 />,
    },
    {
      label: "4. Elaborate on your experiences",
      id: "Q4",
      component: <Q4 />,
    },
    {
      label: "5. Give your timeline a title",
      id: "Q5",
      component: <Q5 />,
    },
    {
      label: "6. Your name (optional)",
      id: "Q6",
      component: <Q6 />,
    },
  ];

  return (
    <div className="createForm">
      <MetaTags>
        <title>My Year in Quarantine - Create Timeline</title>
      </MetaTags>

      {/* <nav>
        <h1>my year in quarantine</h1>
        <hr />
      </nav> */}

      <div className="timelineForm">
        <h2>Let's get started</h2>
        <Accordion panels={panels} />
      </div>
    </div>
  );
};

export default CreateTimeline;
