import Phaser from "phaser";
import { Board as RexBoard } from "phaser4-rex-plugins/plugins/board-components";
import { Board } from "./Model";
import { BoardSize } from "@/types";
import { CELL_SIZE_PX } from "@/constants";
const DEFAULT_CONFIG = {
  grid: {
    gridType: "quadGrid", // 'quadGrid' | 'hexagonGrid'
    x: 0, // グリッド原点のワールドX座標
    y: 0, // グリッド原点のワールドY座標
    cellWidth: CELL_SIZE_PX,
    cellHeight: CELL_SIZE_PX,
    type: "orthogonal",
  },

  infinity: true,
  wrap: true,
} as const satisfies RexBoard.IConfig;
export class BoardView extends RexBoard {
  constructor(
    scene: Phaser.Scene,
    config: RexBoard.IConfig,
    boardModel: Board,
  ) {
    super(scene, { ...DEFAULT_CONFIG, ...config });
    boardModel.addListener("updateBoardSize", (size: BoardSize) => {
      this.updateBoardSize(size);
    });
  }
  updateBoardSize(boardSize: BoardSize) {
    this.setBoardWidth(boardSize.maxX - boardSize.minX + 1);
    this.setBoardHeight(boardSize.maxY - boardSize.minY + 1);
  }
}