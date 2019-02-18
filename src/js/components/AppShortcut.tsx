import React from "react";
import { inject, observer } from "mobx-react";

const AppShortcut = inject('store')(observer(props => (
  <span onDoubleClick={props.item.action} tabIndex={0} data-id={props.item.id} data-parent={props.item.parent}>
    <img src={props.item.icon} style={{ maxWidth: "24px", height: "auto" }} />
    {props.item.name} 
  </span>
)));

export default AppShortcut