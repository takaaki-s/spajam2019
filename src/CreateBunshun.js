import React from "react";
import { Button, Form } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { Auth } from "aws-amplify";
import { S3 } from "aws-sdk";
import iotSubscribe from "./class/iotSubscrube";

class CreateBunshun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: "",
      hashTag: ""
    };
  }

  async componentDidMount() {
    // s3へのアクセスの手順を残す
    // const credentials = await Auth.currentCredentials();
    // const essentialCredentials = Auth.essentialCredentials(credentials);
    // this.s3Client = new S3({
    //   apiVersion: "2006-03-01",
    //   credentials: essentialCredentials
    // });
    // const list = await this.s3Client
    //   .listObjectsV2({
    //     Bucket: "spajam2019",
    //     // Prefix: data.Prefix
    //   })
    //   .promise();
    //   console.log(list);


    // mqttのサブスクライブができたので残す
    // const cb = data => {
    //   console.log(data);
    // };

    // this.subscribe = await iotSubscribe("uretayo/+", cb);
  }

  handleClick = () => {
    this.props.history.push("/upload", {
      tweetText: this.state.tweetText,
      hashTag: this.state.hashTag
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
