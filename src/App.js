import React from "react";
import "semantic-ui-css/semantic.min.css";
import CreateBunshun from "./CreateBunshun";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Upload from "./Upload";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CreateBunshun}/>
        <Route exact path="/upload" component={Upload}/>
      </Switch>
    </Router>
  );
}

export default App;
