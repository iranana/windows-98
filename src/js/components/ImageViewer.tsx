import React from "react";
import { inject, observer } from "mobx-react";
import { AppInstance } from "../Types";

type IProps = {
  appInstance: AppInstance
}

@inject('store')
@observer
export default class ImageViewer extends React.Component<IProps> {

  render () {
    return (
      <div style={{ maxWidth: "480px" }}>
        <img style={{ width: "100%", height: "auto" }} src={this.props.appInstance.data} />
      </div>
    )
  }
}