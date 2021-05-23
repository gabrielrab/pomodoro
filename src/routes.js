import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//pages
import Index from "./pages/index";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
      </Switch>
    </Router>
  );
}
