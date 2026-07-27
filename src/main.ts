import { BACKGROUND_COLOR } from "./colors.ts";
import { CELL_SIZE_PX, GAME_PARENT_ELEMENT_ID } from "./constants.ts";
import "./style.css";
import RexBoardPlugin from "phaser4-rex-plugins/plugins/board-plugin.js";
import * as Phaser from "phaser";
import { GameScene } from "./GameScene.ts";

declare module "phaser" {
  interface Scene {
    rexBoard: RexBoardPlugin;
  }
}

const config: Phaser.Types.Core.GameConfig = {
  width: 7 * CELL_SIZE_PX,
  height: 7 * CELL_SIZE_PX + 256 * 2,
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
    ],
  },
};
new Phaser.Game(config);
