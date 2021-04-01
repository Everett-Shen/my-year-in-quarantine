import React, { useState, createRef, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Formik, Form, FieldArray, useField, ErrorMessage } from "formik";
import Accordion from "./Accordion/accordion.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DialogForm, { returnErrorMsg, entrySchema } from "./dialogForm";
import * as Yup from "yup";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { useHistory } from "react-router-dom";

const LOCAL_STORAGE_KEY = "my-year-in-quarantine";

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
const CreateTimeline = () => {
  const history = useHistory();
  const [questionTwo, setQuestionTwo] = useState({
    events: [
      { entry: "", date: null },
      { entry: "", date: null },
      { entry: "", date: null },
    ],
  });
  const [questionThree, setQuestionThree] = useState({
    phases: [
      { entry: "", from: null, to: null },
      { entry: "", from: null, to: null },
      { entry: "", from: null, to: null },
    ],
  });

  const [answers, setAnswers] = useState({
    Q1: { location: "" },
    Q2: {
      events: [
        { entry: "", date: null },
        { entry: "", date: null },
        { entry: "", date: null },
      ],
    },
    Q3: {
      phases: [
        { entry: "", from: null, to: null },
        { entry: "", from: null, to: null },
        { entry: "", from: null, to: null },
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
  const [errors, setErrors] = useState([]);
  const [isNewEntryFormOpen, setIsNewEntryFormOpen] = useState(false);
  const mobile = useMediaQuery("(max-width:600px)");

  const sortEntries = (entries) => {
    entries.sort((entryA, entryB) => {
      let dateA = entryA.date ? entryA.date : entryA.from;
      let dateB = entryB.date ? entryB.date : entryB.from;
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    });
  };

  // take answers from Q2 and Q3 and collate them into the initial values for Q4 (pass objects by reference)
  const setQ4 = () => {
    let events = questionTwo.events;
    let phases = questionThree.phases;
    let entries = [];
    for (let event of events) {
      if (event.entry !== "") entries.push(event);
    }
    for (let phase of phases) {
      if (phase.entry !== "") entries.push(phase);
    }

    sortEntries(entries);

    setAnswers({
      ...answers,
      Q2: questionTwo,
      Q3: questionThree,
      Q4: { entries: entries },
    });
  };

  useEffect(() => {
    setQ4();
  }, [questionTwo, questionThree]);

  useEffect(() => {
    const storageAnswers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageAnswers) {
      // setAnswers(storageAnswers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const Q1 = (props) => {
    const setLocation = (value) => {
      setAnswers({
        ...answers,
        Q1: { location: value },
      });
    };
    return (
      <div className="questionContainer">
        <div className="locationInput">
          <Formik
            initialValues={answers.Q1}
            onSubmit={(values) => {
              setLocation(values.location);
            }}
            // validationSchema={Yup.object({
            //   label: Yup.string().required("required"),
            // })}
          >
            {(props) => (
              <Form id="Q1">
                <GooglePlacesAutocomplete
                  apiKey="AIzaSyCeVWbfSffGK19HP7Tg-GY_nFfZ-sP7ASw"
                  selectProps={{
                    value: props.values.location,
                    onChange: (location) => {
                      props.setFieldValue("location", location);
                      props.setFieldValue("label", location.label);
                    },
                    onBlur: props.handleBlur,
                    placeholder: "ex. New York City",
                  }}
                />
                {/* <ErrorMessage name="label" render={returnErrorMsg} /> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  const Q2 = (props) => {
    return (
      <div className="questionContainer">
        <h4>note</h4>
        <div className="notes">
          <p>1. events can be in any order</p>
          <p>2. approximate dates are fine</p>
          <p>3. click the calendar icon to open date picker</p>
          <p>4. click the "+" icon to add additional entries</p>
        </div>

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
                          id={`events.${index}.entry`}
                          name={`events.${index}.entry`}
                          placeholder={
                            index === 0 ? "ex. went home, got sick..." : ""
                          }
                          classnames={"text-input-wide"}
                        />
                        <button
                          className="deleteButton"
                          type="button"
                          tabIndex="-1"
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
                          classnames={"date-input"}
                          label={mobile ? "date" : null}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="addButton"
                      onClick={() => {
                        arrayHelpers.push({ entry: "", date: null });
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
        <h4>note</h4>
        <div className="notes">
          <p>1. time periods can be in any order</p>
          <p>2. approximate dates are fine</p>
          <p>3. click the calendar icon to open date picker</p>
          <p>4. click the "+" icon to add additional entries</p>
        </div>
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
                          id={`phases.${index}.entry`}
                          name={`phases.${index}.entry`}
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
                            tabIndex="-1"
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
                              classnames={"date-input"}
                              label={mobile ? "start date" : null}
                            />
                            <span style={{ margin: "5px" }}>to</span>
                            <DateInput
                              id={`phases.${index}.to`}
                              name={`phases.${index}.to`}
                              lastdate={
                                index !== 0 ? values.phases[index - 1].to : null
                              }
                              classnames={"date-input"}
                              label={mobile ? "end date" : null}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="addButton"
                      onClick={() => {
                        arrayHelpers.push({ entry: "", from: null, to: null });
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
    required,
    placeholder,
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
          onSubmit={(values) => {
            setAnswers({ ...answers, [questionNumber]: values });
          }}
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

  const [selectedEntry, setSelectedEntry] = useState({});
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(0);

  const formRef = createRef();
  const newEntryFormRef = createRef();

  const Q4 = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const formatDate = (dateString) => {
      // function parseDate(input) {
      //   var parts = input.match(/(\d+)/g);
      //   // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      //   return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
      // }
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
    return (
      <div className="questionContainer">
        <h4>note</h4>
        <div className="notes">
          <p>1. click the pencil icon to add notes or edit/delete entries</p>
          <p>2. use the notes section to provide additional details</p>
          <p>3. click the calendar icon to open date picker</p>
          <p>4. click the "+" icon to add additional entries</p>
        </div>
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

        <DialogForm
          initialValues={selectedEntry}
          onSubmit={(values) => {
            //update Q2 or Q3, which will automatically update Q4

            if (values.date !== undefined) {
              // update Q2
              // make copy of q2, replace updated entry, set q2 to copy of q2
              let newEvents = [...questionTwo.events];
              let eventIndex = questionTwo.events.indexOf(selectedEntry);
              newEvents.splice(eventIndex, 1, values);
              setQuestionTwo({ events: newEvents });
            } else {
              // update Q3
              // make copy of q2, replace updated entry, set q2 to copy of q2
              let newPhases = [...questionThree.phases];
              let phaseIndex = questionThree.phases.indexOf(selectedEntry);
              newPhases.splice(phaseIndex, 1, values);
              setQuestionThree({ phases: newPhases });
            }
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          formRef={formRef}
          deleteEntry={() => {
            // delete from Q2/Q3, which will automatically delete from Q4
            if (selectedEntry.date !== undefined) {
              // delete from Q2
              // make copy of q2, replace updated entry, set q2 to copy of q2
              let newEvents = [...questionTwo.events];
              let eventIndex = questionTwo.events.indexOf(selectedEntry);
              newEvents.splice(eventIndex, 1);
              setQuestionTwo({ events: newEvents });
            } else {
              // delete from Q3
              // make copy of q2, replace updated entry, set q2 to copy of q2
              let newPhases = [...questionThree.phases];
              let phaseIndex = questionThree.phases.indexOf(selectedEntry);
              newPhases.splice(phaseIndex, 1);
              setQuestionThree({ phases: newPhases });
            }
            setIsOpen(false);
          }}
        />

        <button
          type="button"
          className="addButton"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          +
        </button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setSelectedEntry({ entry: "", date: null });
              setIsNewEntryFormOpen(true);
            }}
          >
            add event
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setSelectedEntry({ entry: "", from: null, to: null });
              setIsNewEntryFormOpen(true);
            }}
          >
            add time period
          </MenuItem>
        </Menu>
        {/* new entry form */}
        <DialogForm
          initialValues={selectedEntry}
          onSubmit={(values) => {
            if (selectedEntry.date !== undefined) {
              // add to Q2
              // make copy of q2, replace updated entry, set q2 to copy of q2
              let newEvents = [...questionTwo.events];
              newEvents.unshift(values);
              setQuestionTwo({ events: newEvents });
            } else {
              // add to Q3
              // make copy of q2, replace updated entry, set q2 to copy of q2
              let newPhases = [...questionThree.phases];
              newPhases.unshift(values);
              setQuestionThree({ phases: newPhases });
            }
            props.update();
          }}
          isOpen={isNewEntryFormOpen}
          setIsOpen={setIsNewEntryFormOpen}
          formRef={newEntryFormRef}
        />
      </div>
    );
  };
  const Q5 = () => {
    return (
      <FormikTextFieldQuestion
        questionNumber={"Q5"}
        questionName={"title"}
        initialValues={answers.Q5}
        placeholder={"ex. My Year in Quarantine"}
      />
    );
  };
  const Q6 = () => {
    return (
      <FormikTextFieldQuestion
        questionNumber={"Q6"}
        questionName={"name"}
        initialValues={answers.Q6}
        required={true}
        placeholder={""}
      />
    );
  };

  const panels = [
    {
      label: "1. Where were you located when the COVID-19 pandemic began? ",
      id: "Q1",
      component: <Q1 />,
    },
    {
      label:
        "2. List the most significant things that have happened in your life since then, along with their approximate dates",
      id: "Q2",
      component: <Q2 />,
    },
    {
      label:
        "3. List any time periods or phases you went through during this time that you consider significant, along with their approximate start/end dates",
      id: "Q3",
      component: <Q3 />,
    },
    {
      label: "4. Elaborate on your experiences ",
      id: "Q4",
      component: <Q4 />,
    },
    {
      label: "5. Give your timeline a title (optional)",
      id: "Q5",
      component: <Q5 />,
    },
    {
      label: "6. Your preferred name ",
      id: "Q6",
      component: <Q6 />,
    },
  ];

  const schema = Yup.object().shape({
    Q1: Yup.object().shape({
      location: Yup.object()
        .typeError("q1: location is required")
        .shape({
          label: Yup.string().ensure().required("q1: location is required"),
        }),
    }),
    Q4: Yup.object().shape({
      entries: Yup.array()
        .of(entrySchema)
        .min(3, "q4: please include at least 3 timeline entries"),
    }),
    Q6: Yup.object().shape({
      name: Yup.string().required("q6: name is required"),
    }),
  });

  return (
    <div className="createForm">
      <MetaTags>
        <title>Create Timeline - My Year in Quarantine </title>
      </MetaTags>

      {/* <nav>
        <h1>my year in quarantine</h1>
        <hr />
      </nav> */}

      <div className="timelineForm">
        <h2
          style={{
            textAlign: "center",
            margin: "50px",
            fontSize: "2em",
          }}
        >
          let's get started!
        </h2>

        {/* <div className="notes">
          <h4>note</h4>
          <p>1. this section usually takes about 5-10 minutes to complete</p>
          <p>2. feel free to take breaks. your work will be saved</p>
          <p>
            3. your answers will be used to generate your personal timeline. You will be able to preview your timeline before publishing
          </p>
        </div> */}
        <Accordion panels={panels} />
        <div style={{ margin: "20px", height: "100px" }}>
          <button
            className="finish"
            onClick={() => {
              schema
                .validate(answers, { abortEarly: false })
                .then((valid) => {
                  setErrors([]);
                  console.log(answers);
                  history.push("/preview");
                })
                .catch((err) => {
                  setErrors(err.errors);
                });
            }}
          >
            <span style={{ cursor: "pointer", outline: "none" }}>Finish</span>
          </button>
          <div className="errorContainer">
            {errors.map((error, index) => (
              <div
                key={index}
                style={{
                  color: "red",
                  fontSize: "0.8em",
                  marginLeft: "5px",
                }}
              >
                {error}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTimeline;
export { TextInput, DateInput };
