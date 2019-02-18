import React from "react";
import { inject, observer } from "mobx-react";
import { directoryFactory } from "../Utils";
import Explorer from "./Explorer";

@inject('store')
@observer
export default class Desktop extends React.Component<any> {

  render () {
    return (
      <div id="desktop">
        {directoryFactory({ items: this.props.store.desktop, newInstance: true, instance: null })}
        {this.props.store.explorerInstances.map((instance, i) => (
            <Explorer key={i} instance={instance} />
          ))}
      </div>
    )
  }
}