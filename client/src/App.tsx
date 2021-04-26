import React, { useState } from "react";
import MainPage from "./components/homePage/mainPage";
import ContactUs from "./components/contactUs/contactUs";
import SignUp from "./components/signUp/signUp";
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
      </Switch>
    </Router>
    // <Router>
    //   <div className="App">
    //     <SignUp loggedIn={loggedIn}></SignUp>
    //   </div>
    // </Router>
  );
}

export default App;
