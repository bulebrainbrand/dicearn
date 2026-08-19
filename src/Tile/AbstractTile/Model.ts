import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter.js";
import { Direction } from "@/Direction.ts";
import { MovableTileModel, RotatableTileModel } from "../types";

export abstract class AbstrastMovableRotatableTile
  extends EventEmitter
  implements RotatableTileModel, MovableTileModel
{
  abstract readonly name: string;
  constructor(private dir: Direction) {
    super();
  }
  getDirection(): Direction {
    return this.dir;
  }
  /**
   * @fires Tile#event:changeDirection
   * @param dir
   */
  changeDirection(dir: Direction) {
    this.dir = dir;
    /**
     * @event Tile#event:changeDirection
     * @param {Direction} dir
     */
    this.emit("changeDirection", dir);
  }
  getMovable(): boolean {
    return true;
  }
}

export abstract class AbstrastMovableTile
  extends EventEmitter
  implements MovableTileModel
{
  abstract readonly name: string;
  constructor() {
    super();
  }
  getMovable(): boolean {
    return true;
  }
}