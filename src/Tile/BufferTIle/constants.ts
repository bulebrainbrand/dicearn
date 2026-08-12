import {
  SECONDARY_COLOR,
  BASE_COLOR,
  ICON_COLOR as ICON_COLOR2,
  LIGHT_COLOR,
} from "@/colors";
import Phaser from "phaser";
export const TILE_BOARDER_COLOR =
  Phaser.Display.Color.HexStringToColor(BASE_COLOR).color;

export const TILE_BACKGRAOUND_COLOR =
  Phaser.Display.Color.HexStringToColor(SECONDARY_COLOR).color;

export const TILE_ARROW_COLOR = TILE_BOARDER_COLOR;

export const ICON_COLOR =
  Phaser.Display.Color.HexStringToColor(ICON_COLOR2).color;
const instance = Phaser.Display.Color.HexStringToColor(LIGHT_COLOR);
instance.alpha = 256 * 0.5;
export const BUFF_AREA_COLOR = instance;