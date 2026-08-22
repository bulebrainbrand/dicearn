import Phaser from "phaser";
import Board from "phaser4-rex-plugins/plugins/board/board/Board";
import {
  Tiles,
  TilesModelRemoveEvent,
  TilesModelSetEvent,
  TilesModelSwapEvent,
} from "./Model";
import Drag from "phaser4-rex-plugins/plugins/input/drag/Drag";
import { TilesDataStorage } from "./tilesDataStorage";
import { TILE_TILE_Z } from "./constants";
import { BOARD_DEPTH_RANGE } from "@/layer";
import { BoardViewCoordinateCalculator } from "@/board/BoardViewCoordinateCalculator";
import { Direction } from "@/Direction";
import { TileView, TileViewFactory } from "@/Tile/types";
import { TileTypeChecker } from "@/Tile/TileTypeChecker";
import { TileModelUnion } from "@/Tile/TileDifinition";
export class TilesView {
  private tiles: TilesDataStorage<TileView>;
  constructor(
    private scene: Phaser.Scene,
    private board: Board,
    private chessContainer: Phaser.GameObjects.Container,
    private tilesModel: Tiles,
    private boardViewCoordinateCalculator: BoardViewCoordinateCalculator,
    private readonly tileViewFactory: TileViewFactory,
    private readonly tileTypeChecker: TileTypeChecker,
  ) {
    this.tiles = new TilesDataStorage(
      tilesModel.getBoardSize(),
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
    tilesModel.addListener("swap", (arg: TilesModelSwapEvent) =>
      this.swapTiles(arg),
    );
  }
  private createTileSprite(
    x: number,
    y: number,
    tile: TileModelUnion,
  ): TileView {
    const sprite = this.tileViewFactory.create(tile);
    this.board.addChess(sprite, x, y, TILE_TILE_Z, true);
    this.chessContainer.add(sprite);
    this.tiles.setTile(x, y, sprite);
    sprite.setDepth(BOARD_DEPTH_RANGE.getDepth(0));
    sprite.setInteractive({ draggable: true, cursor: "grab" });
    const drag = new Drag(sprite);
    drag.setEnable(true);
    if (this.tileTypeChecker.isMovable(tile) && tile.getMovable()) {
      sprite.on("drag", () => {
        const tileXY = this.board.worldXYToTileXY(sprite.x, sprite.y, true);

        const clampedPosition =
          this.boardViewCoordinateCalculator.clampPosition(tileXY);

        const newPosition = this.board.tileXYToWorldXY(
          clampedPosition.x,
          clampedPosition.y,
        );
        sprite.setPosition(newPosition.x, newPosition.y);
      });
      sprite.on("dragend", (pointer: Phaser.Input.Pointer) => {
        if (this.isDrag(pointer, sprite)) {
          const tileXY = this.board.worldXYToTileXY(sprite.x, sprite.y, true);
          console.log("dragend", pointer.downTime);
          const newPosition =
            this.boardViewCoordinateCalculator.clampPosition(tileXY);
          this.tilesModel.swapTile(
            sprite.getData("x"),
            sprite.getData("y"),
            newPosition.x,
            newPosition.y,
          );
        }
      });
    }
    if (this.tileTypeChecker.isRotatable(tile)) {
      sprite.on("dragend", (pointer: Phaser.Input.Pointer) => {
        if (!this.isDrag(pointer, sprite)) {
          const getNextDirection = (dir: Direction): Direction => {
            if (dir === "d") return "l";
            if (dir === "l") return "u";
            if (dir === "r") return "d";
            return "r";
          };
          tile.changeDirection(getNextDirection(tile.getDirection()));
        }
      });
    }
    return sprite;
  }
  private isDrag(pointer: Phaser.Input.Pointer, sprite: TileView): boolean {
    const distanceX = Math.abs(pointer.upX - pointer.downX);
    const distanceY = Math.abs(pointer.upY - pointer.downY);
    const threshold = 5;
    const minimumDragTime = 1000; // ms
    const tileXY = this.board.worldXYToTileXY(sprite.x, sprite.y, true);

    return (
      distanceX > threshold ||
      distanceY > threshold ||
      pointer.upTime - pointer.downTime > minimumDragTime ||
      sprite.getData("x") !== tileXY.x ||
      sprite.getData("y") !== tileXY.y
    );
  }
  setTile(x: number, y: number, tile: TileModelUnion) {
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
}