import React from "react";

export default class Upload extends React.Component {
  render() {
    return (
      <div>
        tweetText: {this.props.location.state.tweetText}<br />
        hashTag: {this.props.location.state.hashTag}<br />
      </div>
    );
  }
}
