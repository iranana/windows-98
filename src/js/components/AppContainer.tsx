import React from "react";
import { inject, observer } from "mobx-react";
import Draggable from "react-draggable";

@inject('store')
@observer
export default class AppContainer extends React.Component<any> {

  render () {
    const $App = this.props.appInstance.app;

    return (
      <Draggable defaultClassName={`explorer-dialog react-draggable ${this.props.appInstance.inFocus ? "focussed" : ""}`}>
        <div onClick={() => this.props.store.setAppInstanceFocus(this.props.appInstance)}>
          <header>
            <p>{this.props.appInstance.name}</p>
            <div className="explorer-dialog-controls">
              <a onClick={() => this.props.store.closeApp(this.props.appInstance)}>X</a>
            </div>
          </header>
          <div className="explorer-body">
            <$App appInstance={this.props.appInstance} />
          </div>
        </div>
      </Draggable>
    )
  }
}