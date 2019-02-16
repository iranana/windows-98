import { observable, action, toJS } from "mobx";
import image2base64 from "image-to-base64";
import * as Files from "../img/files/*.jpg";

interface Folder {
  type: "folder";
  id: number;
  name: string;
  minimised: boolean;
  children: Array<Folder | File>;
  parent: number;
}

interface File {
  type: "file" | "image";
  id: number;
  name: string;
  open: boolean;
  minimised: boolean;
  parent: number;
  url: string;
}

export default class Store {
  @observable explorerInstances: Array<{ id: string, stack: Folder[], inFocus: boolean, minimized: boolean, maximized: boolean }> = [];
  @observable explorerState = [];
  @observable desktop: Array<Folder | File> = [
    {
      type: "folder",
      id: 1,
      name: "Carrots",
      minimised: false,
      parent: null,
      children: [
        {
          type: "image",
          id: 2,
          name: "testImage.jpg", 
          url: Files.testImage,
          open: false,
          minimised: false,
          parent: 1
        },
        {
          type: "folder",
          id: 3,
          name: "Cats",
          minimised: false,
          children: [],
          parent: 1
        },
        {
          type: "folder",
          id: 5,
          name: "Cucumbers",
          minimised: false,
          parent: 1,
          children: [
            {
              type: "folder",
              id: 99,
              name: "Cucumber Seeds",
              minimised: false,
              children: [],
              parent: 5
            }
          ]
        }
      ]
    },
    {
      type: "folder",
      id: 4,
      name: "Pictures",
      minimised: false,
      parent: null,
      children: [
        {
          type: "folder",
          id: 88,
          name: "Cat Pictures",
          minimised: false,
          children: [],
          parent: 4
        }
      ]
    }
  ]

  @action createNew (item) {
    const existingInstance = this.explorerInstances.find(instance => instance.id === item.id);

    if (existingInstance) {
      //return false
    }

    this.explorerInstances.push({
      id: item.id,
      stack: [ item ],
      inFocus: false,
      minimized: false,
      maximized: false
    });
  }

  @action openFolder (item, instance) {
    instance.stack.push(item);
  }

  @action closeExplorer (instance) {
    this.explorerInstances.splice(this.explorerInstances.indexOf(instance), 1);
  }

  @action goBack (instance) {
    instance.stack.pop();
  }

  @action setInstanceFocus (instance) {
    this.explorerInstances.forEach(inst => inst !== instance ? inst.inFocus = false : null);
    instance.inFocus = true;
  }

  // todo fix the mutations
  @action moveFolder (folderToMove, targetFolderId) {
    let targetFolder = searchTree(this.desktop, parseInt(targetFolderId));

    if (targetFolder) {
      let clone = toJS(folderToMove);
      const oldParent = folderToMove.parent;

      clone.parent = targetFolder.id;
      targetFolder.children.push(clone);

      if (oldParent) {
        const parent = searchTree(this.desktop, oldParent);
        parent.children.splice(parent.children.indexOf(folderToMove), 1);
      } else {
        const root = this.desktop.find(item => item.id === folderToMove.id);
        this.desktop.splice(this.desktop.indexOf(root), 1);
      }
    }
  }
}

export function searchTree (items, id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    } else {
      if (items[i].children) {
        const match = searchTree(items[i].children, id)
        if (match) {
          return match;
        }
      }
    }
  }
}