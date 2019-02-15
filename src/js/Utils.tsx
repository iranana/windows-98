import React from "react";
import Folder from "./components/Folder";

export const directoryFactory = ({ items, newInstance, instance } : { items: any, newInstance?: boolean, instance: any }) => {
  return items.map(item => {
    switch (item.type) {
      case "folder":
        return (
          <Folder item={item} newInstance={newInstance} instance={instance} />
        )
      case "file":
        return <span>{item.name}</span>
    }
  })
}