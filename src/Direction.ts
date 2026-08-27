import Phaser from "phaser";

export type Direction = (typeof DIRECTION_TAPLE)[number];
export const DIRECTION_TAPLE = ["u", "d", "l", "r"] as const;
export const DIRECTION_OFFSET = {
  d: [0, 1],
  u: [0, -1],
  r: [1, 0],
  l: [-1, 0],
} as const satisfies Record<Direction, [number, number]>;

export const DIRECTION_RADIAN = {
  u: Phaser.Math.DegToRad(0),
  r: Phaser.Math.DegToRad(90),
  d: Phaser.Math.DegToRad(180),
  l: Phaser.Math.DegToRad(270),
} as const satisfies Record<Direction, number>;

export const getNextDirection = (dir: Direction): Direction => {
  if (dir === "d") return "l";
  if (dir === "l") return "u";
  if (dir === "r") return "d";
  return "r";
};