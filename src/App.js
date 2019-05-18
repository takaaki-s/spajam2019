import React from "react";
import "semantic-ui-css/semantic.min.css";
import CreateBunshun from "./CreateBunshun";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Html2Canvas from "./html2canvas";
import Upload from "./Upload";
import Config from "./config";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";
import Amplify from "aws-amplify";
import * as AWS from "aws-sdk";

Amplify.configure({ Auth: Config.Auth });
AWS.config.update({ region: Config.region });

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: Config.region,
    aws_pubsub_endpoint: `wss://${Config.iotEndpoint}/mqtt`
  })
);

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
