export class DepthRange {
  constructor(
    readonly min: number,
    readonly max: number,
  ) {
    if (Number.isNaN(min) || Number.isNaN(max))
      throw new TypeError(`can't set min/max to NaN`);
    if (min > max)
      throw new RangeError(
        `min (${min}) must not be greater than max (${max})`,
      );
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

export const UI_DEPTH_RANGE = new DepthRange(201, 210);

export const BOARD_DEPTH_RANGE = new DepthRange(0, 10);
export const CURSOR_DEPTH_RANGE = new DepthRange(11, 20);
export const DICE_DEPTH_RANGE = new DepthRange(211, 220);
export const MONEY_DEPTH_RANGE = new DepthRange(221, 230);
export const INVENTORY_DEPTH_RANGE = new DepthRange(231, 240);
export const DRAGGING_DEPTH_RANGE = new DepthRange(151, 160);
export const REWORDS_DEPTH_RANGE = new DepthRange(241, 250);