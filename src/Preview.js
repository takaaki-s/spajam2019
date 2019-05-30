import React from "react";
import { Button, Form,Container } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

export default class Preview extends React.Component {
  render() {
    return (
      <Container textAlign='center'>
        <video controls src="/bbb_1558236839410.mp4" />
      </Container>
    );
  }
}
