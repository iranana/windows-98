import React from "react";
import { observer, inject } from "mobx-react";
import { action } from "mobx";
import * as Icons from "../../img/icons/*.ico";
import { ExplorerInstance } from "../Types";
import Store from "../Store";

type IProps = {
  item: any, 
  newInstance?: boolean, 
  store?: Store, 
  explorerInstance: ExplorerInstance
}

@inject('store')
@observer
export default class Folder extends React.Component<IProps> {
  @action open = () => {
    if (this.props.newInstance) {
      this.props.store.createExplorerInstance(this.props.item);
    } else {
      this.props.store.openFolder(this.props.item, this.props.explorerInstance);
    }
  }

  render () {
    return (
      <a tabIndex={0} onDoubleClick={this.open} data-id={this.props.item.id} data-parent={this.props.item.parent} className={`desktop-icon folder`}>
        <img draggable={false} src={this.props.item.open ? Icons.directory_open : Icons.directory_closed} />
        <span>{this.props.item.name.length > 15 ? `${this.props.item.name.substring(0, 15)}...` : this.props.item.name}</span>
      </a>
    )
  }
}
