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
    name: "Pictures",
    minimised: false,
    parent: null,
    children: [
      {
        type: "folder",
        id: 11,
        name: "Yoshi",
        minimised: false,
        parent: 1,
        children: []
      },
      {
        type: "folder",
        id: 12,
        name: "Isla",
        minimised: false,
        parent: 1,
        children: []
      }
    ]
  },
  {
    type: "folder",
    id: 4,
    name: "My Documents",
    minimised: false,
    parent: null,
    children: [
      {
        icon: Icons.notepad_file,
        type: "appShortcut",
        id: 12123123123,
        name: "todo.txt",
        minimised: false,
        parent: null,
        action: () => RootStore.launchNotepad(TodoDocument)
      },
    ]
  },
  {
    icon: Icons.notepad_file,
    type: "appShortcut",
    id: 2,
    name: "about.txt",
    minimised: false,
    parent: null,
    action: () => RootStore.launchNotepad(AboutMeDocument)
  },
  {
    icon: Icons.notepad_file,
    type: "appShortcut",
    id: 1231232,
    name: "todo.txt",
    minimised: false,
    parent: null,
    action: () => RootStore.launchNotepad(TodoDocument)
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
    icon: GameIcons.AddamsFamily,
    id: 71238,
    name: "Addams Family",
    minimised: false,
    parent: null,
    action: () => RootStore.launchNes(NesRoms.AddamsFamilyThe)
  },
  {
    type: "appShortcut",
    icon: Icons.kodak_imaging_file,
    id: 799,
    name: "cat.jpg",
    minimised: false,
    parent: null,
    action: () => RootStore.launchImageViewer(Files.testImage)
  }
];

const AboutMeDocument = `
ABOUT

An experiement to create a 'windows-like' UI in the browser. Currently based around two key states:

1. ExplorerInstances - all instances of the "explorer window".
2. AppInstances - all instances of any app (e.g. NES, Notepad).

UI is product of these states, allows for any number of Explorers/Apps to be used. 
Folders and files can be dragged and dropped between folders. Honestly it's kind of bizarre and unlike anything I've built before.
`

const TodoDocument = `
TODO:

- better z-indexing for focus
- scaling of NES? swap emu? doesn't handle multiple instances.
- use localStorage for file system
- context menu?
- taskbar and minimised state
- the google!
- start menu?
`