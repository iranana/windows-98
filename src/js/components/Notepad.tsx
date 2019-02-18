import React from "react";
import { inject, observer } from "mobx-react";

@inject('store')
@observer
export default class Notepad extends React.Component<any> {

  render () {
    return (
      <div style={{ minWidth: "480px" }}>
        <textarea style={{ width: "100%" }} rows={20} className="draggable-cancel" defaultValue={this.props.appInstance.data}></textarea>
      </div>
    )
  }
}