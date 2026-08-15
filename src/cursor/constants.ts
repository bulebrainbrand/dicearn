import { ACCENT_COLOR } from "@/colors";
import { CELL_SIZE_PX } from "@/constants";
import Phaser from "phaser";
export const CURSOR_RADIUS = CELL_SIZE_PX / 3;
export const CURSOR_COLOR =
  Phaser.Display.Color.HexStringToColor(ACCENT_COLOR).color;

export const CURSOR_TILE_Z = 1;