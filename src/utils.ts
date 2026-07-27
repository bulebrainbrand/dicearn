import { CELL_SIZE_PX } from "./constants.ts";
import { Route } from "./BoardViewCoordinateCalculator.ts";

export const modulo = (n: number, d: number) => ((n % d) + d) % d;

export const routeToPxPos = (
  pos: Route,
): { x: number; y: number; type: "set" | "move" } => ({
  x: pos.x * CELL_SIZE_PX,
  y: pos.y * CELL_SIZE_PX,
  type: pos.type,
});

export const times = (func: Function, times: number) => {
  for (let i = 0; i < times; i++) func();
};
