import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "my-year-in-quarantine.firebaseapp.com",
  projectId: "my-year-in-quarantine",
  storageBucket: "my-year-in-quarantine.appspot.com",
  messagingSenderId: "769733569759",
  appId: "1:769733569759:web:7f57cabe98327b37578d6a",
  measurementId: "G-7PYFL4E4S1",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
