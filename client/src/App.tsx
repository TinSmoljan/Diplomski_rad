import React, { useState } from "react";
import MainPage from "./components/homePage/mainPage";
import ContactUs from "./components/contactUs/contactUs";
import SignUp from "./components/signUp/signUp";
import SignIn from "./components/signIn/signIn";
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
        <Route path="/signUp">
          <SignUp loggedIn={loggedIn}></SignUp>
        </Route>
        <Route path="/signIn">
          <SignIn loggedIn={loggedIn}></SignIn>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
