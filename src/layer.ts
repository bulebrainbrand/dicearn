export class DepthRange {
  constructor(
    readonly min: number,
    readonly max: number,
  ) {
    if (Number.isNaN(min) || Number.isNaN(max))
      throw new TypeError(`can't set min/max to NaN`);
  }
  getDepth(offset: number) {
    if (Number.isNaN(offset)) throw new TypeError(`can't use NaN offset`);
    if (this.min + offset < this.min || this.min + offset > this.max)
      throw new RangeError(
        `can't use that depth on this range. offset:${offset} min:${this.min} max:${this.max}`,
      );
    return this.min + offset;
  }
}

export const BOARD_DEPTH_RANGE = new DepthRange(0, 10);
export const CURSOR_DEPTH_RANGE = new DepthRange(11, 20);
export const DICE_DEPTH_RANGE = new DepthRange(21, 30);
export const MONEY_DEPTH_RANGE = new DepthRange(31, 40);
export const INVENTORY_DEPTH_RANGE = new DepthRange(41, 50);
export const DRAGGING_DEPTH_RANGE = new DepthRange(1001, 1010);
export const REWORDS_DEPTH_RANGE = new DepthRange(100, 110);