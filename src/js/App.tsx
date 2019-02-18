import React from "react";
import TaskBar from "./components/TaskBar";
import Store from "./Store";
import { Provider, observer } from "mobx-react";
import Explorer from "./components/Explorer";
import { directoryFactory } from "./Utils";
import AppContainer from "./components/AppContainer";

export const RootStore = new Store();

@observer
export default class App extends React.Component<{}> {
  store: Store;

  constructor (props) {
    super(props);
    this.store = RootStore;
  }

  render () {
    return (
      <main id="wrapper">
        <Provider store={this.store}>
          <>
            <div id="desktop">
              {directoryFactory({ items: this.store.desktop, newInstance: true, explorerInstance: null })}
              
              {this.store.explorerInstances.map((instance, i) => (
                <Explorer key={i} explorerInstance={instance} />
              ))}

              {this.store.appInstances.map((instance, i) => (
                <AppContainer appInstance={instance} />
              ))}
            </div>
            <TaskBar />
          </>
        </Provider>
      </main>
    )
  }
}