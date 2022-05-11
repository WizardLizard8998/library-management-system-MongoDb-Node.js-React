import React from "react";
import MainPage from "./MainPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function RouterPage() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
