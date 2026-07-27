import { Direction } from "@/Direction";

export const CELL_COLOR = {
  d: 0xff0000,
  u: 0x00ff00,
  r: 0x0000ff,
  l: 0x00ffff,
} as const satisfies Record<Direction, number>;
