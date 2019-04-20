import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    const {entry, widgetFor, getAsset} = this.props;
    const image = getAsset(entry.getIn(["data", "image"]));

    return <div className="">
      <h1 className="">{ entry.getIn(["data", "title"])}</h1>
      <div className="">
        <div style={{
          width: "80px",
          height: "80px"
        }}></div>
        <p>{ format(entry.getIn(["data", "date"]), "ddd, MMM D, YYYY") }</p>
        <p>Read in x minutes</p>
      </div>
      <div className="">
        <p>{ entry.getIn(["data", "description"]) }</p>
        { image && <img src={ image } alt={ entry.getIn(["data", "title"])} /> }
        { widgetFor("body") }
      </div>
    </div>;
  }
}
