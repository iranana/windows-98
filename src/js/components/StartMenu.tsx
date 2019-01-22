import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import * as Icons from "../../img/icons/*.ico"

@observer
export default class StartMenu extends React.Component<any> {
  @observable open: boolean = false;

  @action toggle = () => {
    this.open = !this.open;
  }

  @action close = () => {
    this.open = false;
  }

  render () {
    return (
      <div id="start-menu" tabIndex={0} onBlur={this.close}>
        <button onClick={this.toggle}>Start</button>
        <nav className={this.open ? "open" : undefined}>
          <ul>
            <li onMouseDown={e => e.preventDefault()}>
              <img src={Icons.directory_program_group} /> <span>P</span>rograms
              <ul className="sub-menu">
                <li onMouseDown={e => e.preventDefault()}>Accessories</li>
                <li onMouseDown={e => e.preventDefault()}>StartUp</li>
                <li onMouseDown={e => e.preventDefault()}>Microsoft Exchange</li>
              </ul>
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <img src={Icons.directory_favorites} /> <span>D</span>ocuments
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <img src={Icons.gears} /> <span>S</span>ettings
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <img src={Icons.search_file} /> <span>F</span>ind
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <img src={Icons.help_book_big} /> <span>H</span>elp
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <img src={Icons.executable_gear} /> <span>R</span>un
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <img src={Icons.shut_down_with_computer} /> Sh<span>u</span>t Down...
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}