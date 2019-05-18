import React from "react";
import { Button, Form } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

export default class Preview extends React.Component {
  render() {
    return (
      <div>
        <video src="sample.mp4" />
        <Button fluid primary>ツイートする</Button>
      </div>
    );
  }
}
