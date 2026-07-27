export type Direction = (typeof DIRECTION_TAPLE)[number];
export const DIRECTION_TAPLE = ["u", "d", "l", "r"] as const;
export const DIRECTION_OFFSET = {
  d: [0, 1],
  u: [0, -1],
  r: [1, 0],
  l: [-1, 0],
} as const satisfies Record<Direction, [number, number]>;
