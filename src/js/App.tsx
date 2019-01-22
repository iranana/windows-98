import React from "react";
import TaskBar from "./components/TaskBar";
import Desktop from "./components/Desktop";
import Store from "./Store";
import { Provider } from "mobx-react";

export default class App extends React.Component<any> {
  store: any;

  constructor (props) {
    super(props);
    this.store = new Store()
  }

  render () {
    return (
      <main id="wrapper">
        <Provider store={this.store}>
          <>
            <Desktop />
            <TaskBar />
          </>
        </Provider>
      </main>
    )
  }
}