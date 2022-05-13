import React from "react";
import MainPage from "./MainPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookPage from "./BookPage";

export default function RouterPage() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>

          <Route exact path="/BookPage">
            <BookPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
