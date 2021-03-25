import "./app.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CreateTimeline from "./components/CreateTimeline";
import MetaTags from "react-meta-tags";

function App() {
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
      <Switch>
        <Route path={"/"} exact component={LandingPage} />
        <Route path={"/create"} exact component={CreateTimeline} />
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
