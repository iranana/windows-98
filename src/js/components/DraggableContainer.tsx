import React from "react";
import { observer, inject, propTypes } from "mobx-react";
import { action, toJS, observable } from "mobx";
import * as Icons from "../../img/icons/*.ico";
import Draggable from "react-draggable";
import { searchTree } from "../Store";

@inject('store')
@observer
export default class DraggableContainer extends React.Component<{ store?: any }> {
  @observable dragged: boolean = false;

  handleStart = (e, ui) => {
    e.stopPropagation(); 
  } 

  handleDrag = () => {
    this.dragged = true;
  }

  handleStop = (e, ui) => {
    if (this.dragged) {
      this.dragged = false;

      // UGUGUGUGUGLLLLLLLYYYY FIX THIS HORROR
      const folderId = ui.node.childNodes[0].dataset.folder;
      const parentId = ui.node.childNodes[0].dataset.parent;

      const targetElements = document.elementsFromPoint(e.clientX, e.clientY);
      const validFolder = targetElements.find(element => element.classList.contains('folder') && element !== ui.node.childNodes[0]) as HTMLElement;
      const validDirectory = targetElements.find((element: HTMLElement) => element.classList.contains('folder-contents') && element.dataset.folder !== folderId && element.dataset.folder !== parentId) as HTMLElement;
      const directory = targetElements.find((element: HTMLElement) => element.classList.contains("folder-contents"));
      const desktop = targetElements.find(element => element.id === "desktop");

      let thisFolder = searchTree(this.props.store.desktop, parseInt(folderId));

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
        <div>{this.props.children}</div>
      </Draggable>
    )
  }
}