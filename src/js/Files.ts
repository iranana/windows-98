import * as Files from "../files/img/*.jpg";
import * as Icons from "../img/icons/*.ico";
import * as GameIcons from "../img/game_icons/*.png";
import * as NesRoms from "../files/roms/nes/*.nes";
import { Folder, AppShortcut } from "./Types";
import { RootStore } from "./App";

export const DesktopItems: Array<Folder | AppShortcut> = [
  {
    type: "folder",
    id: 1,
    name: "Carrots",
    minimised: false,
    parent: null,
    children: [
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
  },
  {
    icon: GameIcons.SuperMario,
    type: "appShortcut",
    id: 2,
    name: "about.txt",
    minimised: false,
    parent: null,
    action: () => RootStore.launchNotepad("Blah")
  },
  {
    type: "appShortcut",
    icon: GameIcons.SuperMario,
    id: 78,
    name: "Super Mario",
    minimised: false,
    parent: null,
    action: () => RootStore.launchNes(NesRoms.SuperMarioBros)
  },
  {
    type: "appShortcut",
    icon: GameIcons.SuperMario,
    id: 799,
    name: "Image",
    minimised: false,
    parent: null,
    action: () => RootStore.launchImageViewer(Files.testImage)
  }
];