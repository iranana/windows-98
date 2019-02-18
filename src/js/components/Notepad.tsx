import React from "react";
import { inject, observer } from "mobx-react";

@inject('store')
@observer
export default class Notepad extends React.Component<any> {

  render () {
    return (
      <div style={{ maxWidth: "480px" }}>
        <textarea defaultValue={this.props.appInstance.data}></textarea>
      </div>
    )
  }
}