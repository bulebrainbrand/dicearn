import Phaser from "phaser";
import { TileView } from "@/Tile/View";
import Board from "phaser4-rex-plugins/plugins/board/board/Board";
import {
  Tiles,
  TilesModelBoardSizeUpdateEvent,
  TilesModelRemoveEvent,
  TilesModelSetEvent,
} from "./Model";
import { Tile } from "@/Tile/Model";
import { TilesDataStorage } from "./tilesDataStorage";
import { TILE_TILE_Z } from "./constants";
import { TILE_DEPTH } from "@/layor";
export class TilesView {
  private tiles: TilesDataStorage<TileView>;
  constructor(
    private scene: Phaser.Scene,
    private board: Board,
    tilesModel: Tiles,
  ) {
    const { maxX, maxY, minX, minY } = tilesModel.getBoardSize();
    this.tiles = new TilesDataStorage(minX, maxX, minY, maxY, (tile) => {
      if (tile) tile.destroy();
    });
    tilesModel.forEach((tile, x, y) => {
      if (tile === undefined) return;
      const sprite = new TileView(scene, tile.getDirection());
      this.board.addChess(sprite, x, y, TILE_TILE_Z, false);
      this.tiles.setTile(x, y, sprite);
      sprite.setDepth(TILE_DEPTH);
    });
    tilesModel.addListener("set", (arg: TilesModelSetEvent) => {
      this.setTile(arg.x, arg.y, arg.newTile);
    });
    tilesModel.addListener("remove", (arg: TilesModelRemoveEvent) => {
      this.removeTile(arg.x, arg.y);
    });
    tilesModel.addListener(
      "updateBoardSize",
      (arg: TilesModelBoardSizeUpdateEvent) => {
        this.updateBoardSize(arg);
      },
    );
  }
  setTile(x: number, y: number, tile: Tile) {
    const sprite = new TileView(this.scene, tile.getDirection());
    this.tiles.setTile(x, y, sprite);
    this.board.addChess(sprite, x, y, TILE_TILE_Z, true);
    sprite.setDepth(TILE_DEPTH);
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
