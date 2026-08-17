import Phaser from "phaser";
import { Board as RexBoard } from "phaser4-rex-plugins/plugins/board-components";
import { BoardSize } from "@/types";
import { CELL_GAP_PX, CELL_SIZE_PX } from "@/constants";
const DEFAULT_CONFIG = {
  grid: {
    gridType: "quadGrid", // 'quadGrid' | 'hexagonGrid'
    x: 0, // グリッド原点のワールドX座標
    y: 0, // グリッド原点のワールドY座標
    cellWidth: CELL_SIZE_PX + CELL_GAP_PX,
    cellHeight: CELL_SIZE_PX + CELL_GAP_PX,
    type: "orthogonal",
  },

  infinity: true,
  wrap: true,
} as const satisfies RexBoard.IConfig;
export class BoardView extends RexBoard {
  constructor(
    scene: Phaser.Scene,
    config: RexBoard.IConfig,
    boardSize: BoardSize,
  ) {
    super(scene, { ...DEFAULT_CONFIG, ...config });
    this.updateBoardSize(boardSize);
    boardSize.on("change", () => this.updateBoardSize(boardSize));
  }
  updateBoardSize(boardSize: BoardSize) {
    this.setBoardWidth(boardSize.maxX - boardSize.minX + 1);
    this.setBoardHeight(boardSize.maxY - boardSize.minY + 1);
  }
  addChess(
    gameObject: Phaser.GameObjects.GameObject,
    tileX: number,
    tileY: number,
    tileZ: number | string,
    align?: boolean,
  ): this {
    super.addChess(gameObject, tileX, tileY, tileZ, align);
    this.scene.cameras.getCamera("UI")?.ignore(gameObject);
    return this;
  }
}