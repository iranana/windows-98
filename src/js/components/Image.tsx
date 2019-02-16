import React from "react";

const Image = props => (
  <span tabIndex={0} data-folder={props.item.id} data-parent={props.item.parent}>
    <img src={props.item.url} style={{ maxWidth: "64px", height: "auto" }} />
    {props.item.name}
  </span>
)

export default Image