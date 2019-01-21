import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

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
              <span>P</span>rograms
              <ul className="sub-menu">
                <li onMouseDown={e => e.preventDefault()}>Accessories</li>
                <li onMouseDown={e => e.preventDefault()}>StartUp</li>
                <li onMouseDown={e => e.preventDefault()}>Microsoft Exchange</li>
              </ul>
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <span>D</span>ocuments
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <span>S</span>ettings
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <span>F</span>ind
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <span>H</span>elp
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              <span>R</span>un
            </li>
            <li onMouseDown={e => e.preventDefault()}>
              Sh<span>u</span>t Down...
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}