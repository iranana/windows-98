import * as Files from "../files/img/*.jpg";
import * as Icons from "../img/icons/*.ico";
import * as GameIcons from "../img/game_icons/*.png";
import * as NesRoms from "../files/roms/nes/*.nes";
import * as PDFs from "../files/pdfs/*.pdf";
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
        children: [
          {
            type: "appShortcut",
            icon: Icons.kodak_imaging_file,
            id: 8983224,
            name: "yoshi1.jpg",
            minimised: false,
            parent: 11,
            action: () => RootStore.launchImageViewer(Files.yoshi1)
          },
          {
            type: "appShortcut",
            icon: Icons.kodak_imaging_file,
            id: 765765,
            name: "yoshi2.jpg",
            minimised: false,
            parent: 11,
            action: () => RootStore.launchImageViewer(Files.yoshi2)
          },
          {
            type: "appShortcut",
            icon: Icons.kodak_imaging_file,
            id: 128748,
            name: "yoshi3.jpg",
            minimised: false,
            parent: 11,
            action: () => RootStore.launchImageViewer(Files.yoshi3)
          }
        ]
      },
      {
        type: "folder",
        id: 12,
        name: "Isla",
        minimised: false,
        parent: 1,
        children: [
          {
            type: "appShortcut",
            icon: Icons.kodak_imaging_file,
            id: 89845224,
            name: "isla1.jpg",
            minimised: false,
            parent: 12,
            action: () => RootStore.launchImageViewer(Files.isla1)
          },
          {
            type: "appShortcut",
            icon: Icons.kodak_imaging_file,
            id: 89845443224,
            name: "isla2.jpg",
            minimised: false,
            parent: 12,
            action: () => RootStore.launchImageViewer(Files.isla2)
          }
        ]
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
        icon: Icons.document,
        type: "appShortcut",
        id: 32434,
        name: "RD400.pdf",
        minimised: false,
        parent: 4,
        action: () => RootStore.launchPDFViewer(PDFs.RD400C)
      },
      {
        icon: Icons.document,
        type: "appShortcut",
        id: 9375,
        name: "RD400_US_Wiring_Diagram.pdf",
        minimised: false,
        parent: 4,
        action: () => RootStore.launchPDFViewer(PDFs.RD400USwiringdiagram)
      }
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
    icon: GameIcons.ParasolStars,
    id: 71238,
    name: "Parasol Stars",
    minimised: false,
    parent: null,
    action: () => RootStore.launchNes(NesRoms.ParasolStars)
  },
  {
    type: "appShortcut",
    icon: Icons.kodak_imaging_file,
    id: 799,
    name: "bike.jpg",
    minimised: false,
    parent: null,
    action: () => RootStore.launchImageViewer(Files.bike)
  },
  {
    type: "appShortcut",
    icon: Icons.kodak_imaging_file,
    id: 4982,
    name: "gt750_1.jpg",
    minimised: false,
    parent: null,
    action: () => RootStore.launchImageViewer(Files.gt750_1)
  },
  {
    type: "appShortcut",
    icon: Icons.kodak_imaging_file,
    id: 7938299,
    name: "gt750_2.jpg",
    minimised: false,
    parent: null,
    action: () => RootStore.launchImageViewer(Files.gt750_2)
  }
];

const AboutMeDocument = `
ABOUT THIS THING:

------------------------

Play some Mario!!

It's experiement to create a 'windows-like' UI in the browser. Currently based around two key states:

1. ExplorerInstances - all instances of the "explorer window".
2. AppInstances - all instances of any app (e.g. NES, Notepad).

Folders and files can be dragged and dropped between folders, kind of. You can't drop onto the desktop (yet).
Honestly it's kind of bizarre and unlike anything I've built before, but that's the point.
`

const TodoDocument = `
TODO:

------------------------

- better z-indexing for focus
- better definitions of file "types" to automagically render the right app
- scaling of NES? swap emu? doesn't handle multiple instances, events are bound to window.
- use localStorage for file system
- context menu?
- taskbar and minimised state
- the google!
- start menu?
`