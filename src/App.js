import React from "react";
import "semantic-ui-css/semantic.min.css";
import CreateBunshun from "./CreateBunshun";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Html2Canvas from "./html2canvas";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CreateBunshun} />
        <Route exact path="/upload" component={Html2Canvas} />
      </Switch>
    </Router>
  );
}

export default App;
