import React from "react";
import StartMenu from "./StartMenu";

export default class TaskBar extends React.Component<any> {

  render () {
    return (
      <section id="taskbar">
        <StartMenu />
        {this.props.children}
      </section>
    )
  }
}