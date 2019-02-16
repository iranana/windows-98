import React from "react";
import { observer, inject } from "mobx-react";
import { action, toJS } from "mobx";
import Draggable from "react-draggable";
import { directoryFactory } from "../Utils";

@inject('store')
@observer
export default class Explorer extends React.Component<{ store?: any, instance: any }> {

  @action close = () => {
    this.props.store.closeExplorer(this.props.instance.id);
  }

  @action open = (item) => {
    this.props.store.openFolder(item, this.props.instance);
  }

  @action goBack = () => {
    this.props.store.goBack(this.props.instance.id);
  }

  render () {
    const currentFolder = this.props.instance.stack[this.props.instance.stack.length - 1];

    const renderTree = (item, i) => (
      <React.Fragment key={i}>
      <li onDoubleClick={() => this.open(item)}>{item.name}</li>
      {item.children && (
        <ul>
          {item.children.map((item, j) => renderTree(item, j))}
        </ul>
      )}
      </React.Fragment>
    )

    if (currentFolder) {
      return (
        <Draggable>
          <div tabIndex={0} className={`dialog ${currentFolder ? "open" : ""}`}>
            <ul>
              {this.props.store.desktop.map((item, i) => (
                renderTree(item, i)
              ))}
            </ul>
            <p onClick={this.close}>Close</p>
            <p onClick={this.goBack}>Back</p>
            <div className="folder-contents" tabIndex={0} data-folder={currentFolder.id}>
              {currentFolder && (
                directoryFactory({ items: currentFolder.children, instance: this.props.instance })
              )}
            </div>
          </div>
        </Draggable>
      )
    } else { 
      return null
    }
  }
}