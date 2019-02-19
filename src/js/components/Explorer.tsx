import React from "react";
import { observer, inject } from "mobx-react";
import Draggable from "react-draggable";
import { directoryFactory } from "../Utils";
import { ResizableBox } from "react-resizable";
import FolderTree from "./FolderTree";
import Store from "../Store";
import { ExplorerInstance } from "../Types";

type IProps = {
  store?: Store,
  explorerInstance: ExplorerInstance
}

@inject('store')
@observer
export default class Explorer extends React.Component<IProps> {

  close = () => {
    this.props.store.closeExplorer(this.props.explorerInstance);
  }

  goBack = () => {
    this.props.store.goBack(this.props.explorerInstance);
  }

  setInstanceFocus = () => {
    this.props.store.focusExplorerInstance(this.props.explorerInstance);
  }

  render () {
    const currentFolder = this.props.explorerInstance.stack[this.props.explorerInstance.stack.length - 1];

    if (currentFolder) {
      return (
        <Draggable bounds="parent" defaultPosition={{x: (this.props.store.explorerInstances.length * 50), y: (this.props.store.explorerInstances.length * 50)}} defaultClassName={`explorer-dialog react-draggable ${this.props.explorerInstance.inFocus ? "focussed" : ""}`} cancel={".react-resizable-handle"}>
          <div onClick={this.setInstanceFocus}>
            <ResizableBox width={640} height={480} minConstraints={[100, 100]}>     
              <header>
                <p>{currentFolder.name}</p>
                <div className="explorer-dialog-controls">
                  {this.props.explorerInstance.stack.length > 1 ? <button onClick={this.goBack}>Back</button> : null}
                  <button onClick={this.close}>X</button>
                </div>
              </header>
              <div className="explorer-body">
                <div className="explorer-folder-tree">
                  <ul>
                    {this.props.store.desktop.map((item, i) => (
                      <FolderTree item={item} key={i} explorerInstance={this.props.explorerInstance} />
                    ))}
                  </ul>
                </div>
                <div className="explorer-folder-contents" data-id={currentFolder.id}>
                  {currentFolder && (
                    directoryFactory({ items: currentFolder.children, explorerInstance: this.props.explorerInstance })
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