import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter.js";
import { Direction } from "@/Direction.ts";
import { MovaleTileModel, RotatableTileModel } from "../types";

export class BufferTileModel
  extends EventEmitter
  implements RotatableTileModel, MovaleTileModel
{
  readonly name = "buffer";
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