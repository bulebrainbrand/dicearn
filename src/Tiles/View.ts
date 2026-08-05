import Phaser from "phaser";
import { TileView } from "@/Tile/View";
import Board from "phaser4-rex-plugins/plugins/board/board/Board";
import {
  Tiles,
  TilesModelBoardSizeUpdateEvent,
  TilesModelRemoveEvent,
  TilesModelSetEvent,
  TilesModelSwapEvent,
} from "./Model";
import Drag from "phaser4-rex-plugins/plugins/input/drag/Drag";
import { Tile } from "@/Tile/Model";
import { TilesDataStorage } from "./tilesDataStorage";
import { TILE_TILE_Z } from "./constants";
import { TILE_DEPTH } from "@/layor";
import { BoardViewCoordinateCalculator } from "@/board/BoardViewCoordinateCalculator";
import { CELL_SIZE_PX } from "@/constants";
export class TilesView {
  private tiles: TilesDataStorage<TileView>;
  constructor(
    private scene: Phaser.Scene,
    private board: Board,
    private tilesModel: Tiles,
    private boardViewCoordinateCalculator: BoardViewCoordinateCalculator,
  ) {
    const { maxX, maxY, minX, minY } = tilesModel.getBoardSize();
    this.tiles = new TilesDataStorage(
      minX,
      maxX,
      minY,
      maxY,
      (tile) => {
        if (tile) tile.destroy();
      },
      (x, y, sprite) => {
        sprite?.setData("x", x).setData("y", y);
      },
    );
    tilesModel.forEach((tile, x, y) => {
      if (tile === undefined) return;
      this.createTileSprite(x, y, tile);
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
    tilesModel.addListener("swap", (arg: TilesModelSwapEvent) =>
      this.swapTiles(arg),
    );
  }
  private createTileSprite(x: number, y: number, tile: Tile): TileView {
    console.log(x, y);
    const sprite = new TileView(this.scene, tile.getDirection());
    this.board.addChess(sprite, x, y, TILE_TILE_Z, true);
    this.tiles.setTile(x, y, sprite);
    sprite.setDepth(TILE_DEPTH);

    sprite.setInteractive({ draggable: true });

    const drag = new Drag(sprite);
    drag.setEnable(true);

    sprite.on("drag", (pointer, dragX: number, dragY: number) => {
      const tileXY = this.board.worldXYToTileXY(sprite.x, sprite.y, true);
      console.log(tileXY);
      const clampedPosition =
        this.boardViewCoordinateCalculator.clampPosition(tileXY);

      const newPosition = this.board.tileXYToWorldXY(
        clampedPosition.x,
        clampedPosition.y,
      );
      //console.log("dragging", newPosition);
      sprite.setPosition(newPosition.x, newPosition.y);
    });
    sprite.on("dragend", () => {
      console.log(sprite.x, sprite.y);
      const tileXY = this.board.worldXYToTileXY(sprite.x, sprite.y, true);
      console.log(tileXY);
      const newPosition =
        this.boardViewCoordinateCalculator.clampPosition(tileXY);

      console.log(
        "dragend",
        sprite.getData("x"),
        sprite.getData("y"),
        newPosition,
      );
      this.tilesModel.swapTile(
        sprite.getData("x"),
        sprite.getData("y"),
        newPosition.x,
        newPosition.y,
      );
    });

    return sprite;
  }
  setTile(x: number, y: number, tile: Tile) {
    this.createTileSprite(x, y, tile);
  }
  swapTiles({ first, second }: TilesModelSwapEvent) {
    // 昔の場所からとる
    const firstSprite = this.tiles.getTile(second.x, second.y);
    const secondSprite = this.tiles.getTile(first.x, first.y);
    const newFirstPosition = this.board.tileXYToWorldXY(first.x, first.y);
    const newSecondPosition = this.board.tileXYToWorldXY(second.x, second.y);
    if (firstSprite) {
      firstSprite.setPosition(newFirstPosition.x, newFirstPosition.y);
    }
    if (secondSprite) {
      secondSprite.setPosition(newSecondPosition.x, newSecondPosition.y);
    }
    this.tiles.swap(first.x, first.y, second.x, second.y);
  }
  removeTile(x: number, y: number) {
    this.tiles.removeTile(x, y);
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
