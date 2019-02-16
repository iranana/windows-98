import React from "react";
import Folder from "./components/Folder";
import DraggableContainer from "./components/DraggableContainer";
import File from "./components/File";
import Image from "./components/Image";

export const directoryFactory = ({ items, newInstance, instance } : { items: any, newInstance?: boolean, instance: any }) => {
  return items.map((item, i) => {
    switch (item.type) {
      case "folder":
        return <DraggableContainer><Folder key={i} item={item} newInstance={newInstance} instance={instance} /></DraggableContainer>
      case "image":
        return <DraggableContainer><Image item={item} /></DraggableContainer>
      case "file":
        return <DraggableContainer><File item={item} /></DraggableContainer>
    }
  })
}