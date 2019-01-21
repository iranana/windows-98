import React from "react";
import TaskBar from "./components/TaskBar";
import Desktop from "./components/Desktop";

export default class App extends React.Component<any> {

  render () {
    return (
      <main id="wrapper">
        <Desktop />
        <TaskBar />
      </main>
    )
  }
}