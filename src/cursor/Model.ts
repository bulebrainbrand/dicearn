import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter.js";

export class Cursor extends EventEmitter {
  private movable: boolean = true;
  constructor(
    private x: number,
    private y: number,
    private minX: number,
    private maxX: number,
    private minY: number,
    private maxY: number,
  ) {
    super();
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
    if (x < this.minX || x > this.maxX || y < this.minY || y > this.maxY) {
      throw new Error(`Invalid position: (${x}, ${y})`);
    }
  }
  updateBoardSize({
    maxX,
    maxY,
    minX,
    minY,
  }: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  }) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.assetsValidPosition(this.x, this.y);
  }
  getPosition(): [number, number] {
    return [this.x, this.y];
  }
  isMovable(): boolean {
    return this.movable;
  }
  setMovable(value: boolean) {
    this.movable = value;
  }
}