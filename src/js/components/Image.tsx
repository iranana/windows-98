import React from "react";
import { inject, observer } from "mobx-react";

const Image = inject('store')(observer(props => (
  <span onDoubleClick={() => props.store.launchImageViewer(props.item)} tabIndex={0} data-folder={props.item.id} data-parent={props.item.parent}>
    <img src={props.item.url} style={{ maxWidth: "64px", height: "auto" }} />
    {props.item.name}
  </span>
)));

export default Image