import { observable, action, toJS } from "mobx";
import uuidv1 from "uuid/v1";

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
  @observable explorerInstances: Array<{ id: string, stack: Folder[] }> = [];
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
          url: "./dist/files/testImage.jpg",
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
      return false
    }

    this.explorerInstances.push({
      id: item.id,
      stack: [ item ]
    });
  }

  @action openFolder (item, instance) {
    instance.stack.push(item);
  }

  @action closeExplorer (instanceId) {
    const instance = this.explorerInstances.find(instance => instance.id === instanceId);
    this.explorerInstances.splice(this.explorerInstances.indexOf(instance), 1);
  }

  @action goBack (instanceId) {
    const instance = this.explorerInstances.find(instance => instance.id === instanceId);
    instance.stack.pop();
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
        let match = searchTree(items[i].children, id)
        if (match) {
          return match;
        }
      }
    }
  }
}