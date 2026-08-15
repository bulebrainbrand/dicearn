export const MONEY_DEPTH = 3;
export const DICE_DEPTH = 3;
export const TILE_DEPTH = 0;
export const HOVER_TILE_DEPTH = 1;
export const INVENTORY_DEPTH = 3;

export const REWORD_DEPTH = 5;

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