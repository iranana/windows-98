import { observable, action, toJS } from "mobx";

interface Folder {
  type: "folder";
  id: number;
  name: string;
  open: boolean;
  minimised: boolean;
  children: Array<Folder | File>
}

interface File {
  type: "file";
  id: number;
  name: string;
  open: boolean;
  minimised: boolean;
}

export default class Store {
  @observable desktop: Array<Folder | File> = [
    {
      type: "folder",
      id: 1,
      name: "test",
      open: false,
      minimised: false,
      children: [
        {
          type: "file",
          id: 2,
          name: "xxx.jpg",
          open: false,
          minimised: false
        },
        {
          type: "folder",
          id: 3,
          name: "secret",
          open: false,
          minimised: false,
          children: []
        },
        {
          type: "folder",
          id: 5,
          name: "wow wow",
          open: false,
          minimised: false,
          children: []
        }
      ]
    },
    {
      type: "file",
      id: 4,
      name: "picture.png",
      open: false,
      minimised: false,
    }
  ]

  @action openFolder (id) {
    const item = searchTree(this.desktop, id);
    item.open = true;
  }

  @action closeFolder (id) {
    const item = searchTree(this.desktop, id);
    item.open = false;

    item.children.forEach(child => {
      child.open = false;
    })
  }
}

// don't be a dumbass
function searchTree (items, id) {
  let match;
  items.some(item => {
    if (item.id === id) {
      match = item;
      return match;
    } else {
      if (item.children) {
        match = searchTree(item.children, id)
      }
      return match;
    }
  });
  return match;
}