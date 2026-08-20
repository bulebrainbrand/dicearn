import { Position } from "@/board/BoardViewCoordinateCalculator";
import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter.js";
import { BoardSize } from "@/types";

export class CursorModel extends EventEmitter {
  private movable: boolean = true;
  private visible: boolean = true;
  constructor(
    private x: number,
    private y: number,
    private readonly boardSize: BoardSize,
  ) {
    super();
    boardSize.on("change", () => this.assetsValidPosition(this.x, this.y));
  }
  /**
   * @fires Cursor#event:move
   * @param x
   * @param y
   */
  move(x: number, y: number) {
    if (!this.movable) {
      throw new Error("Cursor is not movable");
    }
    const oldX = this.x;
    const oldY = this.y;
    this.x = x;
    this.y = y;
    /**
     * @event Cursor#event:move
     * @param { {old: [number, number], new: [number, number]} } data
     */
    this.emit("move", { old: [oldX, oldY], new: [x, y] });
  }
  /**
   * @fires Cursor#event:warp
   * @param x
   * @param y
   */
  warp(x: number, y: number) {
    this.x = x;
    this.y = y;
    /**
     * @event Cursor#event:warp
     * @param { {new: [number, number]} }
     */
    this.emit("warp", { new: [x, y] });
  }
  private assetsValidPosition(x: number, y: number) {
    if (!this.boardSize.contains(x, y)) {
      throw new Error(`Invalid position: (${x}, ${y})`);
    }
  }
  getPosition(): Position {
    return { x: this.x, y: this.y };
  }
  isMovable(): boolean {
    return this.movable;
  }
  setMovable(value: boolean) {
    this.movable = value;
  }
  setVisible(value: boolean) {
    this.visible = value;
    this.emit("visible", value);
  }
}