import React from "react";
import Axios from "axios";
import "./html2canvas.css";

import html2canvas from "html2canvas";
import { Auth } from "aws-amplify";
import { S3 } from "aws-sdk";

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
      await this.updateCanvas(result.data.statuses);
    } catch { }
  }

  async updateCanvas(resultStatuses) {
    for (let i = 0; i < 9; i++) {
      let text = resultStatuses[i].text.replace(
        /[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー]+/,
        ""
      );
      text = text.replace(
        /(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/,
        ""
      );

      if (text.length === 0) {
        continue;
      }

      this.setState(oldState => {
        const array = oldState.resultTweetData.slice();
        array.push({
          text: text,
          user: resultStatuses[i].user.profile_image_url
        });
        console.log(array);
        return { resultTweetData: array };
      });
      // console.log("update" + i);
      // console.log(this.state.update);

      const resultCapture = await html2canvas(document.querySelector("#capture"))
      const base64 = resultCapture.toDataURL("image/png")
      const blob = this.Base64toBlob(base64);
      console.log(base64);

      this.uploadImage(blob, i);
    }
    // console.log(this.state.resultTweetData);
    this.uploadJson(resultStatuses);
  }
  async uploadJson(resultStatuses) {

    const credentials = await Auth.currentCredentials();
    const essentialCredentials = Auth.essentialCredentials(credentials);

    const json = {
      imageName: [],
    }
    for (let i = 0; i < 9; i++) {
      json.imageName.push(`upload/${credentials.data.IdentityId}-image${i}.png`);
    }
    const params = {
      Body: JSON.stringify(json),
      Bucket: "spajam2019",
      Key: `uploadJson/${credentials.data.IdentityId}.json`,
    };

    this.s3Client = new S3({
      apiVersion: "2006-03-01",
      credentials: essentialCredentials
    });

    await this.s3Client.putObject(params, function (err, data) {
    });

  }

  // Base64データをBlobデータに変換
  Base64toBlob(base64) {
    // カンマで分割して以下のようにデータを分ける
    // tmp[0] : データ形式（data:image/png;base64）
    // tmp[1] : base64データ（iVBORw0k～）
    var tmp = base64.split(',');
    // base64データの文字列をデコード
    var data = atob(tmp[1]);
    // tmp[0]の文字列（data:image/png;base64）からコンテンツタイプ（image/png）部分を取得
    var mime = tmp[0].split(':')[1].split(';')[0];
    //  1文字ごとにUTF-16コードを表す 0から65535 の整数を取得
    var buf = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
      buf[i] = data.charCodeAt(i);
    }
    // blobデータを作成
    var blob = new Blob([buf], { type: mime });
    return blob;
  }

  async uploadImage(data, num) {
    console.log(num);
    // s3へのアクセスの手順を残す
    const credentials = await Auth.currentCredentials();
    const essentialCredentials = Auth.essentialCredentials(credentials);
    this.s3Client = new S3({
      apiVersion: "2006-03-01",
      credentials: essentialCredentials
    });

    console.log(data);

    const params = {
      Body: data,
      Bucket: "spajam2019",
      Key: `upload/${credentials.data.IdentityId}-image${num}.png`,
    };
    await this.s3Client.putObject(params, function (err, data) {
    });
  }

  render() {
    return (
      <div>
        <div id="capture" className="canvas-text">
          {this.state.resultTweetData.map((value, index) => {
            return (
              <div className={index !== 0 ? "color" : "head"} key={index}>
                {value.text}
                {/* <span style={{zIndex:10000}}>{value.text}</span> */}
                {/* {index !== 0 && (
                                    <span>
                                        <img src={value.user} className="user" />
                                    </span>
                                )} */}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
