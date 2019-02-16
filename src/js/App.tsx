import React from "react";
import TaskBar from "./components/TaskBar";
import Desktop from "./components/Desktop";
import Store from "./Store";
import { Provider, observer } from "mobx-react";
import Explorer from "./components/Explorer";

@observer
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
            {this.store.explorerInstances.map((instance, i) => (
              <Explorer key={i} instance={instance} />
            ))}
            <Desktop />
            <TaskBar />
          </>
        </Provider>
      </main>
    )
  }
}