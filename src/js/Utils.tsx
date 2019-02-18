import React from "react";
import Folder from "./components/Folder";
import DraggableContainer from "./components/DraggableContainer";
import AppShortcut from "./components/AppShortcut";
import { ExplorerInstance } from "./Types";

type FactoryProps = {
  items: any,
  explorerInstance: ExplorerInstance,
  newInstance?: boolean
}

export const directoryFactory = ({ items, newInstance, explorerInstance } : FactoryProps) => {
  return items.map((item, i) => {
    switch (item.type) {
      case "folder":
        return (
          <DraggableContainer key={item.id}>
            <Folder key={i} item={item} newInstance={newInstance} explorerInstance={explorerInstance} />
          </DraggableContainer>
        )
      case "appShortcut":
        return (
          <DraggableContainer key={item.id}>
            <AppShortcut key={i} item={item} />
          </DraggableContainer>
        )
    }
  })
}