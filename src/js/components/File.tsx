import React from "react";

const File = props => (
  <span tabIndex={0} data-folder={props.item.id} data-parent={props.item.parent}>FILE {props.item.name}</span>
)

export default File