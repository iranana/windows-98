import React from "react";
import { observer, inject } from "mobx-react";
import { action } from "mobx";
import * as Icons from "../../img/icons/*.ico";

@inject('store')
@observer
export default class Folder extends React.Component<{ item: any, newInstance?: boolean, store?: any, instance?: any }> {
  @action open = () => {
    if (this.props.newInstance) {
      this.props.store.createNew(this.props.item);
    } else {
      this.props.store.openFolder(this.props.item, this.props.instance);
    }
  }

  render () {
    return (
      <a tabIndex={0} onDoubleClick={this.open} data-folder={this.props.item.id} data-parent={this.props.item.parent} className={`desktop-icon folder`}>
        <img src={this.props.item.open ? Icons.directory_open : Icons.directory_closed} />
        <span>{this.props.item.name.length > 10 ? `${this.props.item.name.substring(0, 10)}...` : this.props.item.name}</span>
      </a>
    )
  }
}
