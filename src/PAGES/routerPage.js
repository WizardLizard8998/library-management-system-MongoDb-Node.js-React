import React from "react";
import MainPage from "./MainPage";
import Deneme from "./deneme";

import { BrowserRouter , Route } from "react-router-dom";
import BookPage from "./BookPage";
import { Switch } from "react-router-dom";



export default function RouterPage() {
  

  return (
    <div>
      <BrowserRouter >
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/BookPage">
            <BookPage />
          </Route>
          <Route path="/deneme">
            <Deneme />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
