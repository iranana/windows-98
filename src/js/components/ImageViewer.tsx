import React from "react";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";

@inject('store')
@observer
export default class ImageViewer extends React.Component<any> {

  render () {
    return (
      <div style={{ maxWidth: "480px" }}>
        <img style={{ width: "100%", height: "auto" }} src={this.props.appInstance.data.url} />
      </div>
    )
  }
}