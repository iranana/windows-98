import React from "react";
import { inject, observer } from "mobx-react";
import { AppInstance } from "../Types";
import { ResizableBox } from "react-resizable";

type IProps = {
  appInstance: AppInstance
}

@inject('store')
@observer
export default class ImageViewer extends React.Component<IProps> {

  render () {
    return (
      <ResizableBox width={640} height={480} minConstraints={[100, 100]}>     
        <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
          <img style={{ maxWidth: "100%", maxHeight: "100%", display: "block", marginLeft: "auto", marginRight: "auto" }} src={this.props.appInstance.data} />
        </div>
      </ResizableBox>
    )
  }
}