import { observable, action, toJS } from "mobx";
import Nes from "./components/Nes";
import uuidv1 from "uuid/v1";
import ImageViewer from "./components/ImageViewer";
import Notepad from "./components/Notepad";
import { AppInstance, ExplorerInstance } from "./Types";
import { DesktopItems } from "./Files";
import { Folder } from "./Types";
import PDFViewer from "./components/PDFViewer";

export default class Store {
  @observable appInstances: AppInstance[] = [];
  @observable explorerInstances: ExplorerInstance[] = [];
  @observable desktop = DesktopItems;

  /**
   * Creates a new instance of an app.
   * @param app - React component to render
   * @param name - Name of app
   * @param data - Data for app (todo better definitions)
   */
  @action createAppInstance (app: React.StatelessComponent | React.ComponentClass, name: string, data: any) {
    this.unfocusExplorerInstances();
    this.appInstances.push({
      id: uuidv1(),
      inFocus: true,
      minimised: false,
      maximized: false,
      app: app,
      name: name,
      data: data
    });
  }

  /**
   * Kills a given appInstance
   * @param appInstance 
   */
  @action closeApp (appInstance: AppInstance) {
    const instanceIndex = this.appInstances.findIndex(instance => instance === appInstance);
    if (instanceIndex !== -1) {
      this.appInstances.splice(instanceIndex, 1);
    }
  }

  /**
   * Focuses a given appInstance
   * @param appInstance 
   */
  @action focusAppInstance (appInstance: AppInstance) {
    this.appInstances.forEach(inst => inst !== appInstance ? inst.inFocus = false : null);
    appInstance.inFocus = true;
  }

  /**
   * Launches notepad!
   * @param document 
   */
  @action launchNotepad (document) {
    this.createAppInstance(Notepad, "Notepad", document);
  }

  /**
   * Launches NES!
   * @param rom 
   */
  @action launchNes (rom) {
    this.createAppInstance(Nes, "NES Emulator", rom);
  }

  /**
   * Launches ImageViewer!
   * @param image 
   */
  @action launchImageViewer (image: File) {
    this.createAppInstance(ImageViewer, "Image Viewer", image);
  }

  /**
   * Launches PDF viewer!
   * @param item 
   */
  @action launchPDFViewer (pdf: File) {
    this.createAppInstance(PDFViewer, "PDF Viewer", pdf);
  }

  /**
   * Creates a given explorerInstance
   * @param item 
   */
  @action createExplorerInstance (item: Folder) {
    item.open = true;
    this.unfocusAppInstances();

    this.explorerInstances.push({
      id: item.id,
      stack: [ item ],
      inFocus: true,
      minimised: false,
      maximized: false
    });
  }

  /**
   * Kills a given explorerInstance
   * @param instance 
   */
  @action closeExplorer (explorerInstance: ExplorerInstance) {
    const item = searchTree(this.desktop, explorerInstance.id);
    item.open = false;
    this.explorerInstances.splice(this.explorerInstances.indexOf(explorerInstance), 1);
  }

  /**
   * Opens a folder, pushing it to the instance's stack.
   * @param item 
   * @param explorerInstance 
   */
  @action openFolder (item: Folder, explorerInstance: ExplorerInstance) {
    explorerInstance.stack.push(item);
  }

  /**
   * Go back through an explorerInstance's stack
   * @param explorerInstance - The instance we're moving back in
   */
  @action goBack (explorerInstance: ExplorerInstance) {
    explorerInstance.stack.pop();
  }

  /**
   * Focuses a given explorerInstance. Defocuses all others.
   * @param instance - The instance whose focus we are settings
   */
  @action focusExplorerInstance (instance) {
    this.unfocusAppInstances();
    this.explorerInstances.forEach(inst => inst !== instance ? inst.inFocus = false : null);
    instance.inFocus = true;
  }

  /**
   * Unfocus all appInstances.
   */
  @action unfocusAppInstances () {
    this.appInstances.forEach(inst => inst.inFocus = false);
  }
  
  /**
   * Unfocus all explorerInstances.
   */
  @action unfocusExplorerInstances () {
    this.explorerInstances.forEach(inst => inst.inFocus = false);
  }

  /**
   * Move a folder from one directory to another.
   * @param folderToMove - The folder to move
   * @param targetFolderId - Id of folder to move to
   */
  @action moveFolder (folderToMove: Folder, targetFolderId: string) {
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

/**
 * Find item in tree of files.
 * @param items - Items to traverse
 * @param id - Id to find
 */
export function searchTree (items: Array<any>, id: number) {
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