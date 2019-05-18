import React from "react";
import { Button, Form } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

class CreateBunshun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: "",
      hashTag: ""
    };
  }

  handleClick = () => {
    this.props.history.push("/upload", {
         tweetText: this.state.tweetText, hashTag: this.state.hashTag
      });
    };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    return (
      <Form>
        <Form.Field>
          <label>ツイート</label>
          <input
            placeholder="ツイート"
            name="tweetText"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>ハッシュタグ</label>
          <input
            placeholder="ハッシュタグ"
            name="hashTag"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button primary fluid inverted onClick={this.handleClick}>
          作成する
        </Button>
      </Form>
    );
  }
}

export default withRouter(CreateBunshun);
