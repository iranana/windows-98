import React from "react";
import { inject, observer } from "mobx-react";

const AppShortcut = inject('store')(observer(props => (
  <a tabIndex={0} className="desktop-icon" onDoubleClick={props.item.action} data-id={props.item.id} data-parent={props.item.parent}>
    <img draggable={false} src={props.item.icon} style={{ maxWidth: "24px", height: "auto" }} />
    {props.item.name} 
  </a>
)));

export default AppShortcut