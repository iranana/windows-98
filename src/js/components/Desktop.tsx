import React from "react";
import Folder from "./Folder";
import { inject, observer } from "mobx-react";

const directoryFactory = (items) => {
  return items.map(item => {
    switch (item.type) {
      case "folder":
        return (
          <Folder item={item}>
            {directoryFactory(item.children)}
          </Folder>
        )
      case "file":
        return <span></span>
    }
  })
}

@inject('store')
@observer
export default class Desktop extends React.Component<any> {

  render () {
    return (
      <div id="desktop">
        {directoryFactory(this.props.store.desktop)}
      </div>
    )
  }
}