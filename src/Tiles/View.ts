import Phaser from "phaser";
import { TileView } from "@/Tile/View";
import Board from "phaser4-rex-plugins/plugins/board/board/Board";
import { Tiles } from "./Model";
import { Tile } from "@/Tile/Model";
import { TilesDataStorage } from "./tilesDataStorage";
export class TilesView extends Board {
  private tiles: TilesDataStorage<TileView>;
  constructor(scene: Phaser.Scene, config: Board.IConfig, tilesModel: Tiles) {
    super(scene, config);
    const { maxX, maxY, minX, minY } = tilesModel.getBoardSize();
    this.tiles = new TilesDataStorage(minX, maxX, minY, maxY, (tile) => {
      if (tile) tile.destroy();
    });
    tilesModel.forEach((tile, x, y) => {
      if (tile === undefined) return;
      const sprite = new TileView(scene, tile.getDirection());
      this.addChess(sprite, x, y, 0, true);
      this.tiles.setTile(x, y, sprite);
    });
  }
  setTile(x: number, y: number, tile: Tile) {
    const sprite = new TileView(this.scene, tile.getDirection());
    this.tiles.setTile(x, y, sprite);
    this.addChess(sprite, x, y, 0, true);
  }
  removeTile(x: number, y: number) {
    this.tiles.removeTile(x, y);
  }
  getBoardSize() {
    return this.tiles.getBoardSize();
  }
  updateBoardSize(boardSize: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  }) {
    this.tiles.updateBoardSize(boardSize);
  }
}
