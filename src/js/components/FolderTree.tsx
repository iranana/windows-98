import React from "react";
import { observer, inject } from "mobx-react";
import { action, observable } from "mobx";
import Store from "../Store";
import { ExplorerInstance } from "../Types";
import * as Icons from "../../img/icons/*.ico";

type IProps = {
  store?: Store, 
  item: any, 
  explorerInstance: ExplorerInstance
}

@inject('store')
@observer
export default class FolderTree extends React.Component<IProps> {
  @observable expanded: boolean = true;

  @action open = (e, item) => {
    e.stopPropagation();
    switch (item.type) {
      case "folder":
        this.props.store.openFolder(item, this.props.explorerInstance);
        break;
      case "appShortcut":
        item.action();
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
          <span onDoubleClick={(e) => this.open(e, this.props.item)}>
            <img draggable={false} src={this.props.item.icon ? this.props.item.icon : this.expanded ? Icons.directory_open : Icons.directory_closed} style={{ maxWidth: "24px", height: "auto" }} />
            {this.props.item.name}
          </span>
          {children && (
            <ul style={{ display: this.expanded ? "block" : "none" }}>
              {children.map((item, j) => <FolderTree item={item} explorerInstance={this.props.explorerInstance} key={j} />)}
            </ul>
          )}
        </li>
      </>
    )
  }
}