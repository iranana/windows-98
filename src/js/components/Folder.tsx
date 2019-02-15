import React from "react";
import { observer, inject } from "mobx-react";
import { action, toJS, observable } from "mobx";
import * as Icons from "../../img/icons/*.ico";
import Draggable from "react-draggable";
import { searchTree } from "../Store";

@inject('store')
@observer
export default class Folder extends React.Component<{ item: any, newInstance?: boolean, store?: any, instance?: any }> {
  @observable dragged: boolean = false;

  @action open = () => {
    if (this.props.newInstance) {
      this.props.store.createNew(this.props.item);
    } else {
      this.props.store.openFolder(this.props.item, this.props.instance);
    }
  }

  componentWillUnmount () {
    console.log('folder unmount');
  }

  handleStart = (e, ui) => {
    console.log('start');
    e.stopPropagation(); 
  } 

  handleDrag = () => {
    console.log('drag');
    this.dragged = true;
  }

  handleStop = (e, ui) => {
    console.log('stop');
    if (this.dragged) {
      this.dragged = false;

      const targetElements = document.elementsFromPoint(e.clientX, e.clientY);
      const validFolder = targetElements.find(element => element.classList.contains('folder') && element !== ui.node) as HTMLElement;
      const validDirectory = targetElements.find((element: HTMLElement) => {
        return element.classList.contains('folder-contents') && element.dataset.folder !== ui.node.dataset.folder && element.dataset.folder !== ui.node.dataset.parent;
      }) as HTMLElement;

      const directory = targetElements.find((element: HTMLElement) => element.classList.contains("folder-contents"));
      const desktop = targetElements.find(element => element.id === "desktop");

      let thisFolder = searchTree(this.props.store.desktop, parseInt(ui.node.dataset.folder));

      if (validFolder) {
        this.props.store.moveFolder(thisFolder, validFolder.dataset.folder);
        return;
      }

      if (validDirectory) {
        this.props.store.moveFolder(thisFolder, validDirectory.dataset.folder);
        return;
      }

      if (!directory && desktop) {
        console.log('TODO desktop drop');
      }

    }    
  }

  render () {
    return (
      <Draggable onDrag={this.handleDrag} onStart={this.handleStart} onStop={this.handleStop}>
        <a tabIndex={0} onDoubleClick={this.open} data-folder={this.props.item.id} data-parent={this.props.item.parent} className={`desktop-icon folder`}>
          <img src={this.props.item.open ? Icons.directory_open : Icons.directory_closed} />
          <span>{this.props.item.name} (id {this.props.item.id}) (parent {this.props.item.parent})</span>
        </a>
      </Draggable>
    )
  }
}