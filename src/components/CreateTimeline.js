import React from "react";
import MetaTags from "react-meta-tags";
import { Formik, Field, Form, FieldArray, useField } from "formik";
import Accordion from "./Accordion/accordion.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { TextField } from "@material-ui/core";

const Q1 = () => {
  return (
    <div className="questionContainer">
      <div className="locationInput">
        <GooglePlacesAutocomplete apiKey="AIzaSyCeVWbfSffGK19HP7Tg-GY_nFfZ-sP7ASw" />
      </div>
    </div>
  );
};

const TextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  const inputProps = {
    disableUnderline: true,
  };
  return (
    <>
      <TextField
        className={props.classes}
        {...field}
        {...props}
        inputProps={inputProps}
      ></TextField>
    </>
  );
};

const DateInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  const inputProps = {
    disableUnderline: true,
  };
  field.value = field.value ? field.value : props.defaultValue;
  return (
    <>
      <TextField
        className={props.classes}
        type="date"
        InputProps={inputProps}
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
        initialValues={{
          events: [
            { event: "", date: "" },
            { event: "", date: "" },
            { event: "", date: "" },
          ],
        }}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
        render={({ values }) => (
          <Form>
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
                        classes={"text-input-wide"}
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
                        defaultValue={index === 0 ? "2020-01-01" : ""}
                        // {figure out this lastDate thing later}
                        lastDate={
                          index !== 0 ? values.events[index - 1].date : null
                        }
                        classes={"date-input"}
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
      >
        <Form>
          <FieldArray name="events" render={(arrayHelpers) => <div>{}</div>} />
        </Form>
      </Formik>
    </div>
  );
};

const Q3 = (props) => {
  return (
    <div className="questionContainer">
      <Formik
        initialValues={{
          events: [
            { event: "", from: "", to: "" },
            { event: "", from: "", to: "" },
            { event: "", from: "", to: "" },
          ],
        }}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
        render={({ values }) => (
          <Form>
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
                        classes={"text-input text-input-wide"}
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
                            id={`events.${index}.from`}
                            name={`events.${index}.from`}
                            defaultValue={index === 0 ? "2020-01-01" : ""}
                            // {figure out this lastDate thing later}
                            lastDate={
                              index !== 0 ? values.events[index - 1].from : null
                            }
                            classes={"date-input"}
                          />
                          <span style={{ margin: "5px" }}>to</span>
                          <DateInput
                            id={`events.${index}.to`}
                            name={`events.${index}.to`}
                            defaultValue={index === 0 ? "2020-01-01" : ""}
                            // {figure out this lastDate thing later}
                            lastDate={
                              index !== 0 ? values.events[index - 1].to : null
                            }
                            classes={"date-input"}
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
      >
        <Form>
          <FieldArray name="events" render={(arrayHelpers) => <div>{}</div>} />
        </Form>
      </Formik>
    </div>
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
    component: <Q2 />,
  },
  {
    label:
      "3. List any periods or phases you went through during this time that you consider significant",
    component: <Q3 />,
  },
  {
    label: "4. Elaborate on your experiences",
    component: <Q2 />,
  },
  {
    label: "5. Give your timeline a title",
    component: <Q2 />,
  },
  {
    label: "6. Your name (optional)",
    component: <Q2 />,
  },
];

const CreateTimeline = () => {
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
