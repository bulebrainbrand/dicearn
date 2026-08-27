import { INK_COLOR, SECONDARY_COLOR } from "@/colors";
import Phaser from "phaser";
export const TILE_BOARDER_COLOR =
  Phaser.Display.Color.HexStringToColor(INK_COLOR).color;

export const TILE_BACKGRAOUND_COLOR =
  Phaser.Display.Color.HexStringToColor(SECONDARY_COLOR).color;

export const TILE_ARROW_COLOR = TILE_BOARDER_COLOR;