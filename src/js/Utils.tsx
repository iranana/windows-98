import React from "react";
import Folder from "./components/Folder";
import DraggableContainer from "./components/DraggableContainer";
import AppShortcut from "./components/AppShortcut";
import { ExplorerInstance } from "./Types";

type FactoryProps = {
  items: any,
  explorerInstance: ExplorerInstance,
  newInstance?: boolean,
  draggableBounds?: string
}

export const directoryFactory = ({ items, newInstance, explorerInstance, draggableBounds } : FactoryProps) => {
  return items.map((item, i) => {
    switch (item.type) {
      case "folder":
        return (
          <DraggableContainer draggableBounds={draggableBounds} key={item.id}>
            <Folder item={item} newInstance={newInstance} explorerInstance={explorerInstance} />
          </DraggableContainer>
        )
      case "appShortcut":
        return (
          <DraggableContainer draggableBounds={draggableBounds} key={item.id}>
            <AppShortcut item={item} />
          </DraggableContainer>
        )
    }
  })
}