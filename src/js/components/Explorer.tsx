import React from "react";
import { observer, inject } from "mobx-react";
import { action, toJS, observable } from "mobx";
import Draggable from "react-draggable";
import { directoryFactory } from "../Utils";
import { ResizableBox } from "react-resizable";

@inject('store')
@observer
class FolderTree extends React.Component<{ item: any, store?: any, instance: any }> {
  @observable expanded: boolean = true;

  @action open = (e, item) => {
    e.stopPropagation();
    switch (item.type) {
      case "folder":
        this.props.store.openFolder(item, this.props.instance);
        break;
      case "file":
        console.log('todo');
        break;
    } 
  }

  @action toggleExpand = () => {
    this.expanded = !this.expanded;
  }

  render () {
    const children = this.props.item.children;

    return (
      <>
        <li>
          {children && children.length ? <a onClick={this.toggleExpand}>+</a> : null} 
          <span onDoubleClick={(e) => this.open(e, this.props.item)}>{this.props.item.name}</span>
          {children && (
            <ul style={{ display: this.expanded ? "block" : "none" }}>
              {children.map((item, j) => <FolderTree item={item} instance={this.props.instance} key={j} />)}
            </ul>
          )}
        </li>
      </>
    )
  }
}

@inject('store')
@observer
export default class Explorer extends React.Component<{ store?: any, instance: any }> {

  close = () => {
    this.props.store.closeExplorer(this.props.instance);
  }

  open = (item) => {
    switch (item.type) {
      case "folder":
        this.props.store.openFolder(item, this.props.instance);
        break;
      case "file":
        console.log('todo');
        break;
    } 
  }

  goBack = () => {
    this.props.store.goBack(this.props.instance);
  }

  setInstanceFocus = () => {
    this.props.store.setInstanceFocus(this.props.instance);
  }

  render () {
    const currentFolder = this.props.instance.stack[this.props.instance.stack.length - 1];

    if (currentFolder) {
      return (
        <Draggable defaultClassName={`explorer-dialog react-draggable ${this.props.instance.inFocus ? "focussed" : ""}`} cancel={".react-resizable-handle"}>
          <div onClick={this.setInstanceFocus}>
            <ResizableBox width={640} height={480} minConstraints={[100, 100]}>     
                <header>
                  <p>{currentFolder.name}</p>
                  <div className="explorer-dialog-controls">
                    <a onClick={this.close}>X</a>
                  </div>
                </header>
                <div className="explorer-body">
                  <div className="explorer-folder-tree">
                    <ul>
                      {this.props.store.desktop.map((item, i) => (
                        <FolderTree item={item} key={i} instance={this.props.instance} />
                      ))}
                    </ul>
                  </div>
                  <div className="explorer-folder-contents" data-folder={currentFolder.id}>
                    {currentFolder && (
                      directoryFactory({ items: currentFolder.children, instance: this.props.instance })
                    )}
                  </div>
                </div>
            </ResizableBox>
          </div>
        </Draggable>
      )
    } else { 
      return null
    }
  }
}