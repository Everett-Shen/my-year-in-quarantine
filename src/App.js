import "./styles/app.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CreateTimeline from "./components/CreateTimeline";
import PreviewPage from "./components/previewPage";
import ViewPage from "./components/viewPage";
import MetaTags from "react-meta-tags";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Menu from "./components/menu.js";

function App() {
  const THEME = createMuiTheme({
    typography: {
      fontFamily: `"Montserrat", sans-serif;`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    palette: {
      primary: {
        main: "rgba(255, 118, 118)",
      },
      // secondary: {
      //   main: green[500],
      // },
    },
  });

  return (
    <div className="App" id="app">
      <MetaTags>
        <meta
          name="description"
          content="How’s your year in quarantine been? Share your story with a beautiful, interactive timeline that only takes minutes to create."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </MetaTags>
      <Menu />
      <ThemeProvider theme={THEME}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Switch>
            <Route path={"/"} exact component={LandingPage} />
            <Route path={"/create"} exact component={CreateTimeline} />
            <Route path={"/preview"} exact component={PreviewPage} />
            <Route path={"/view/:docID"} exact component={ViewPage} />
            <Redirect to={"/"} />
          </Switch>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
