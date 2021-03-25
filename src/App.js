import "./app.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CreateTimeline from "./components/CreateTimeline";
import MetaTags from "react-meta-tags";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  const THEME = createMuiTheme({
    typography: {
      fontFamily: `"Montserrat", sans-serif;`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  return (
    <div className="App">
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
      <ThemeProvider theme={THEME}>
        <Switch>
          <Route path={"/"} exact component={LandingPage} />
          <Route path={"/create"} exact component={CreateTimeline} />
          <Redirect to={"/"} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
