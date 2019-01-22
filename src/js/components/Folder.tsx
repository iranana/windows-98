import React from "react";
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import Draggable from "react-draggable";
import * as Icons from "../../img/icons/*.ico";

@inject('store')
@observer
export default class Folder extends React.Component<{ item: any, store?: any }> {

  @action open = () => {
    this.props.store.openFolder(this.props.item.id);
  }

  @action close = () => {
    this.props.store.closeFolder(this.props.item.id);
  }

  handleStart(e, ui) { 
    e.stopPropagation();
  } 

  render () {
    return (
      <>
        <a tabIndex={0} onDoubleClick={this.open} className={`desktop-icon`}>
          <img src={this.props.item.open ? Icons.directory_open : Icons.directory_closed} />
          <span>{this.props.item.name}</span>
        </a>
        <Draggable onStart={this.handleStart}>
          <div className={`dialog ${this.props.item.open ? "open" : ""}`}>
            <p onClick={this.close}>Close</p>
            {this.props.children}
          </div>
        </Draggable>
      </>
    )
  }
}