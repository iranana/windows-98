import React from "react";
import StartMenu from "./StartMenu";
import { inject, observer } from "mobx-react";

@inject('store')
@observer
export default class TaskBar extends React.Component<any> {

  render () {
    return (
      <section id="taskbar">
        <StartMenu />
      </section>
    )
  }
}