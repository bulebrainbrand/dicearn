import { Direction } from "@/Direction";

export const CELL_COLOR = {
  d: 0x440000,
  u: 0x004400,
  r: 0x000044,
  l: 0x004444,
} as const satisfies Record<Direction, number>;