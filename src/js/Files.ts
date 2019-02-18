import * as Images from "../files/img/*.jpg";

export const Files = [
  {
    type: "folder",
    id: 1,
    name: "Yamaha Manuals",
    minimised: false,
    parent: null,
    children: [
      {
        type: "folder",
        id: 11,
        name: "RD400",
        minimised: false,
        parent: 1,
        children: []
      },
      {
        type: "folder",
        id: 12,
        name: "RD250",
        minimized: false,
        parent: 1,
        children: []
      }
    ]
  },
  {
    type: "folder",
    id: 2,
    name: "Pictures",
    minimised: false,
    parent: null,
    children: [
      {
        type: "folder",
        id: 21,
        name: "Yoshi",
        minimised: false,
        children: [],
        parent: 2
      },
      {
        type: "folder",
        id: 22,
        name: "Isla",
        minimised: false,
        children: [],
        parent: 2
      }
    ]
  }
];