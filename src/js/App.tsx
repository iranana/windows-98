import React from "react";
import TaskBar from "./components/TaskBar";
import Store from "./Store";
import { Provider, observer, inject } from "mobx-react";
import Explorer from "./components/Explorer";
import { HashRouter as Router, Route } from "react-router-dom";
import { RouterProps } from "react-router";
import { isEqual } from "lodash";
import { directoryFactory } from "./Utils";
import AppContainer from "./components/AppContainer";

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
            <div id="desktop">
              {directoryFactory({ items: this.store.desktop, newInstance: true, instance: null })}
              {this.store.explorerInstances.map((instance, i) => (
                <Explorer key={i} instance={instance} />
              ))}
              {this.store.appInstances.map((instance, i) => {
                return <AppContainer appInstance={instance} />
              })}
            </div>
            <a style={{ position: "absolute", zIndex: 999999 }} onClick={() => this.store.launchNes()}>NES</a>
            <TaskBar />
          </>
        </Provider>
      </main>
    )
  }
}

@inject('store')
@observer
class RenderCurrentView extends React.Component<{ store?: any, routeProps: RouterProps }> {

  constructor (props) {
    super(props);
    this.handleRouteChange(this.props.routeProps);
  }

  componentDidUpdate (prevProps) {
    if (!isEqual(this.props.routeProps, prevProps.routeProps)) {
      this.handleRouteChange(this.props.routeProps);
    }
  }

  handleRouteChange (route) {
    switch (route.match.path) {
      case "/":
        break;
      case "/nes":
        this.props.store.loadNes();
        break;

    }
  }

  render () {
    let $Component = this.props.store.currentView.component;
    return <$Component routeProps={this.props.routeProps} />
  }
}