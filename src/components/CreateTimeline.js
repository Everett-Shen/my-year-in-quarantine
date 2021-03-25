import React from "react";
import MetaTags from "react-meta-tags";
import { Formik, Field, Form, FieldArray } from "formik";
import Accordion from "./Accordion/accordion.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Q1 = () => {
  return (
    <div className="questionContainer">
      <div className="locationInput">
        <GooglePlacesAutocomplete apiKey="AIzaSyCeVWbfSffGK19HP7Tg-GY_nFfZ-sP7ASw" />
      </div>
    </div>
  );
};

// turn q2 into a component
// pass in callback function that tells the panel to forceUpdate (maybe using a render prop)
// call forceUpdate if new fields have been added/deleted

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
                    <div key={index}>
                      <Field name={`events[${index}].event`} />
                      <Field name={`events[${index}].date`} />

                      <button
                        type="button"
                        onClick={() => {
                          arrayHelpers.remove(index);
                          props.update();
                        }}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
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
    component: <Q2 />,
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
