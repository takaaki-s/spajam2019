import React from "react";
import Axios from "axios";
import "./html2canvas.css";

import html2canvas from "html2canvas";

export default class html2canvasComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: 0,
      resultTweetData: []
    };
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  async componentDidMount() {
    // const resultTweetData = require('./result.json');
    try {
      const result = await Axios.get("http://localhost:3000/result.json");
      // const resultStatuses = result.data.statuses
      // this.setState({
      //     resultTweetData: result.data.statuses,
      // });
      await this.updateCanvas(result.data.statuses);
    } catch {}
  }

  async updateCanvas(resultStatuses) {
    for (let i = 0; i < resultStatuses.length; i++) {
      this.setState(oldState => {
        const array = oldState.resultTweetData.slice();
        let text = resultStatuses[i].text.replace(
          /[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー]+/,
          ""
        );
        text = text.replace(
          /(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/,
          ""
        );
        array.push(text);
        return { resultTweetData: array };
      });
      // console.log("update" + i);
      // console.log(this.state.update);

      const resultCapture = await html2canvas(
        document.querySelector("#capture")
      );
    }
    // console.log(this.state.resultTweetData);
  }

  render() {
    return (
      <div>
        <div id="capture" className="canvas-text">
          {this.state.resultTweetData.map((value, index) => {
            return (
              <div className={index !== 0 ? "color" : "head"} key={index}>
                {value}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
