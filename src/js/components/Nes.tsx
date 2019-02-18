import React from "react";
import NesNes from "nesnes";
import * as NesRoms from "../../files/roms/nes/*.nes";
import Draggable from "react-draggable";
import { inject, observer } from "mobx-react";

@inject('store')
@observer
export default class Nes extends React.Component<any> {
  canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
  nes: any;

  componentDidMount () {
    this.nes = new NesNes(this.canvas.current);
    this.nes.load(NesRoms.SuperMarioBros, true);
  }

  componentWillUnmount () {
    this.nes = null;
  }

  render () {
    return (
      <canvas width="256" height="240" ref={this.canvas} />
    )
  }
}