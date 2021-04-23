import React, { useState } from "react";
import MainPage from "./components/homePage/mainPage";
import ContactUs from "./components/contactUs/contactUs";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedin] = useState(false);

  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route path="/" exact={true}>
          <MainPage loggedIn={loggedIn}></MainPage>
        </Route>
        <Route path="/contactUs">
          <ContactUs loggedIn={loggedIn}></ContactUs>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
