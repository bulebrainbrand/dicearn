import { BACKGROUND_COLOR } from "./colors.ts";
import {
  GAME_HEIGHT,
  GAME_PARENT_ELEMENT_ID,
  GAME_WIDTH,
} from "./constants.ts";
import "./style.css";
import RexBoardPlugin from "phaser4-rex-plugins/plugins/board-plugin.js";
import RexGesturesPlugin from "phaser4-rex-plugins/plugins/gestures-plugin.js";
import * as Phaser from "phaser";
import { GameScene } from "./GameScene.ts";

declare module "phaser" {
  interface Scene {
    rexBoard: RexBoardPlugin;
    rexGestures: RexGesturesPlugin;
  }
}

const config: Phaser.Types.Core.GameConfig = {
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: GAME_PARENT_ELEMENT_ID,
  backgroundColor: BACKGROUND_COLOR,
  render: {
    roundPixels: true,
    antialias: true,
  },
  scene: GameScene,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  plugins: {
    scene: [
      {
        key: "rexBoard",
        plugin: RexBoardPlugin,
        mapping: "rexBoard",
      },
      {
        key: "rexGestures",
        plugin: RexGesturesPlugin,
        mapping: "rexGestures",
      },
    ],
  },
};
new Phaser.Game(config);
