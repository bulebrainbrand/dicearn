import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter.js";
import { Direction } from "@/Direction.ts";

export class Tile extends EventEmitter {
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
}