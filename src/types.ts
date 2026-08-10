import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter.js";

export type BoardSizeValues = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export class BoardSize extends EventEmitter {
  constructor(
    public minX: number,
    public minY: number,
    public maxX: number,
    public maxY: number,
  ) {
    super();
  }

  update({ minX, minY, maxX, maxY }: BoardSizeValues): void {
    const previous = this.toValues();
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.emit("change", previous);
  }

  expand(amount: number): void {
    this.update({
      minX: this.minX - amount,
      minY: this.minY - amount,
      maxX: this.maxX + amount,
      maxY: this.maxY + amount,
    });
  }

  contains(x: number, y: number): boolean {
    return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
  }

  toValues(): BoardSizeValues {
    return {
      minX: this.minX,
      minY: this.minY,
      maxX: this.maxX,
      maxY: this.maxY,
    };
  }
}