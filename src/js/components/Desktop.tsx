import React from "react";
import { inject, observer } from "mobx-react";
import { directoryFactory } from "../Utils";

@inject('store')
@observer
export default class Desktop extends React.Component<any> {

  render () {
    return (
      <div id="desktop">
        {directoryFactory({ items: this.props.store.desktop, newInstance: true, instance: null })}
      </div>
    )
  }
}