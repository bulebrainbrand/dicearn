/**
 * 開区間
 */
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
  subRange(min: number, max: number) {
    const range = this.max - this.min;
    if (max < min)
      throw new RangeError(
        `min (${min}) must not be greater than max (${max})`,
      );
    if (min < 0 || range < min)
      throw new RangeError(
        `invalid min: ${min}. it should be 0 =< min =< range(${range})`,
      );
    if (max < 0 || range < max)
      throw new RangeError(
        `invalid max: ${max}. it should be 0 =< max =< range(${range})`,
      );
    return new DepthRange(this.min + min, this.max + max);
  }
}

export const UI_DEPTH_RANGE = new DepthRange(201, 250);
export const BOARD_DEPTH_RANGE = new DepthRange(0, 10);
export const CURSOR_DEPTH_RANGE = new DepthRange(11, 20);
export const DICE_DEPTH_RANGE = UI_DEPTH_RANGE.subRange(10, 20);
export const MONEY_DEPTH_RANGE = UI_DEPTH_RANGE.subRange(21, 30);
export const INVENTORY_DEPTH_RANGE = new DepthRange(191, 200);
export const DRAGGING_DEPTH_RANGE = new DepthRange(151, 160);
export const REWORDS_DEPTH_RANGE = UI_DEPTH_RANGE.subRange(31, 40);