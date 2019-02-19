import React from "react";
import NesNes from "nesnes";
import { inject, observer } from "mobx-react";

@inject('store')
@observer
export default class Nes extends React.Component<any> {
  canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
  nes: any = null;

  componentDidMount () {
    this.nes = new NesNes(this.canvas.current);
    this.nes.load(this.props.appInstance.data, true);
  }

  componentWillUnmount () {
    // kinda hacky
    this.nes.tickAPU = false;  
    this.nes.running = false;
    this.nes.paused = true;  
    this.nes = null;
  }

  render () {
    return (
      <>
        <canvas width="256" height="225" ref={this.canvas} />
        <div>
          <p><strong>Controls:</strong></p>
          <ul>
            <li>Arrows = d-pad</li>
            <li>Shift = select</li>
            <li>Return = start</li>
            <li>x = B</li>
            <li>z = A</li>
          </ul>
        </div>
      </>
    )
  }
}