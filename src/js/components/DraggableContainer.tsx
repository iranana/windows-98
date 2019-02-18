import React from "react";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import Draggable from "react-draggable";
import { searchTree } from "../Store";

@inject('store')
@observer
export default class DraggableContainer extends React.Component<{ store?: any, draggableBounds?: string }> {
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
      // todo fix the horror
      const folderId = ui.node.childNodes[0].dataset.id;
      const parentId = ui.node.childNodes[0].dataset.parent;
      const targetElements = document.elementsFromPoint(e.clientX, e.clientY);
      const validFolder = targetElements.find(element => element.classList.contains('folder') && element !== ui.node.childNodes[0]) as HTMLElement;
      const validDirectory = targetElements.find((element: HTMLElement) => element.classList.contains('explorer-folder-contents') && element.dataset.id !== folderId && element.dataset.id !== parentId) as HTMLElement;
      const directory = targetElements.find((element: HTMLElement) => element.classList.contains("explorer-folder-contents"));
      const desktop = targetElements.find(element => element.id === "desktop");

      let thisFolder = searchTree(this.props.store.desktop, parseInt(folderId));

      if (validFolder) {
        this.props.store.moveFolder(thisFolder, validFolder.dataset.id);
        return;
      }

      if (validDirectory) {
        this.props.store.moveFolder(thisFolder, validDirectory.dataset.id);
        return;
      }

      if (!directory && desktop) {
        console.log('TODO desktop drop');
      }
    }    
  }

  render () {
    return (
      <Draggable
        bounds={this.props.draggableBounds}
        defaultClassName={`explorer-item react-draggable`} 
        onDrag={this.handleDrag} 
        onStart={this.handleStart} 
        onStop={this.handleStop}>
        <div style={{ display: "inline-block" }}>{this.props.children}</div>
      </Draggable>
    )
  }
}