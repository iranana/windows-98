export type Folder = {
  type: "folder";
  id: number;
  name: string;
  openIcon?: string;
  closedIcon?: string;
  open?: boolean;
  minimised: boolean;
  children: Array<Folder | AppShortcut>;
  parent: number;
}

export type AppShortcut = {
  type: "appShortcut",
  id: number,
  icon: string,
  name: string,
  open?: boolean;
  minimised: false,
  parent: number,
  action: any
}

export type ExplorerInstance = {
  id: number, 
  stack: Folder[], 
  inFocus: boolean, 
  minimised: boolean, 
  maximized: boolean
}

export type AppInstance = {
  id: string,
  inFocus: boolean,
  minimised: boolean,
  maximized: boolean,
  app: React.StatelessComponent | React.ComponentClass,
  name: string,
  data: any
}