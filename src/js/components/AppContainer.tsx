import React from "react";
import { inject, observer } from "mobx-react";
import Draggable from "react-draggable";
import { AppInstance } from "../Types";
import Store from "../Store";

type IProps = {
  store?: Store,
  appInstance: AppInstance
}

@inject('store')
@observer
export default class AppContainer extends React.Component<IProps> {

  render () {
    const $App: React.StatelessComponent<any> | React.ComponentClass<any> = this.props.appInstance.app;

    return (
      <Draggable defaultClassName={`explorer-dialog react-draggable ${this.props.appInstance.inFocus ? "focussed" : ""}`}>
        <div onClick={() => this.props.store.focusAppInstance(this.props.appInstance)}>
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