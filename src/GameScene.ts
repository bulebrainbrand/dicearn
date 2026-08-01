import * as Phaser from "phaser";
import { DIRECTION_TAPLE } from "./Direction.ts";
import {
  Tiles,
  TilesModelBoardSizeUpdateEvent,
  TilesModelRemoveEvent,
  TilesModelSetEvent,
} from "./Tiles/Model.ts";
import { Dice } from "./Dice.ts";
import { Shop } from "./Shop.ts";
import { default as BoardView } from "phaser4-rex-plugins/plugins/board/board/Board.js";
import { Board } from "./board/Board.ts";
import { BoardViewCoordinateCalculator } from "./board/BoardViewCoordinateCalculator.ts";
import { Tile } from "./Tile/Model.ts";
import { Cursor as CursorModel } from "@/cursor/Model.ts";
import { CELL_SIZE_PX } from "@/constants.ts";
import { CursorView } from "./cursor/View.ts";
import { TilesView } from "./Tiles/View.ts";
import { Pan } from "phaser4-rex-plugins/plugins/gestures";

export class GameScene extends Phaser.Scene {
  board!: Board;
  tiles!: Tiles;
  tilesView!: TilesView;
  cursorModel!: CursorModel;
  cursor!: CursorView;
  private cursorAnimationQueue: Promise<void> = Promise.resolve();
  money: number = 0;
  moneyObject!: Phaser.GameObjects.Text;
  boardViewCoodinateCalculator: BoardViewCoordinateCalculator =
    new BoardViewCoordinateCalculator(0, 5, 0, 5);
  boardView!: BoardView;
  constructor() {
    super();
  }
  create() {
    this.createModel();
    this.createView();
    this.createDice();
    this.createMoney();
    this.createShop();
    this.registorEventListener();
    this.initTiles();
    const pan = this.rexGestures.add.pan(this, { threshold: 10 });
    pan.on("pan", (pan: Pan) => {
      const cam = this.cameras.main;
      cam.scrollX -= pan.dx / cam.zoom;
      cam.scrollY -= pan.dy / cam.zoom;
    });
  }
  createModel() {
    this.createTilesModel();
    this.createCursorModel();
    this.createBoardModel();
  }
  createView() {
    this.createBoardView();
    this.createTilesView();
    this.createCursorView();
  }

  initTiles() {
    Array.from({ length: 6 }, (_, x) =>
      Array.from({ length: 6 }, (_, y) =>
        this.tiles.setTile(
          x,
          y,
          new Tile(DIRECTION_TAPLE[Phaser.Math.Between(0, 3)]),
        ),
      ),
    );
  }
  registorEventListener() {
    this.cursorModel.addListener(
      "move",
      (event: { old: [number, number]; new: [number, number] }) => {
        this.cursorAnimationQueue = this.cursorAnimationQueue.then(() =>
          this.cursor.animateCursorMove(event.old, event.new),
        );
      },
    );
    this.cursorModel.addListener("warp", (event: { new: [number, number] }) => {
      this.cursorAnimationQueue = this.cursorAnimationQueue.then(() =>
        this.cursor.playWarp(event),
      );
    });
    this.tiles.addListener("set", (arg: TilesModelSetEvent) =>
      this.tilesView.setTile(arg.x, arg.y, arg.newTile),
    );
    this.tiles.addListener("remove", (arg: TilesModelRemoveEvent) =>
      this.tilesView.removeTile(arg.x, arg.y),
    );
    this.tiles.addListener(
      "updateBoardSize",
      (arg: TilesModelBoardSizeUpdateEvent) =>
        this.tilesView.updateBoardSize(arg),
    );
  }
  createMoney() {
    const money = this.add.text(
      CELL_SIZE_PX * 9,
      CELL_SIZE_PX * 8,
      String(this.money),
      {
        color: "#000000",
        fontSize: "256px",
      },
    );
    this.moneyObject = money;
    money.setOrigin(0.5, 0.5);
    this.syncMoney();
    money.setScrollFactor(0, 0);
    money.setDepth(2);
  }
  applyMoney(num: number) {
    this.money += num;
    this.syncMoney();
  }
  syncMoney() {
    this.moneyObject.text = String(this.money);
  }
  createTilesModel() {
    const tiles = new Tiles(0, 5, 0, 5);

    this.tiles = tiles;
  }
  createCursorModel() {
    const cursor = new CursorModel(0, 0, 0, 5, 0, 5);
    this.cursorModel = cursor;
  }
  createBoardModel() {
    const board = new Board(this.tiles, this.cursorModel, 0, 5, 0, 5);
    this.board = board;
  }
  createBoardView() {
    const board = this.rexBoard.add.board({
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
    });
    this.boardView = board;
  }
  createCursorView() {
    const [x, y] = this.cursorModel.getPosition();
    this.cursor = new CursorView(
      this,
      this.boardView,
      this.rexBoard,
      x,
      y,
      this.boardViewCoodinateCalculator,
    );
  }
  createTilesView() {
    this.tilesView = new TilesView(this, this.boardView, this.tiles);
  }
  createDice() {
    const dice = new Dice(this, CELL_SIZE_PX * 11, CELL_SIZE_PX * 8);
    dice.on("roll", async (value: number) => {
      dice.setRollable(false);
      const gene = this.board.moveCursor(value);
      for (const _ of gene) {
        // cursorModel の "move" イベント経由でキューに積まれたアニメーションが
        // 実際に終わるまで待ってから次の1マスへ進む
        await this.cursorAnimationQueue;
        this.applyMoney(1);
      }
      dice.setRollable(true);
    });
  }
  createShop() {
    const shop = new Shop(this, CELL_SIZE_PX * 15, CELL_SIZE_PX * 3);
    this.add.existing(shop);
    shop.addItem("Upsize Grid", () => {
      if (this.money >= 5) {
        this.applyMoney(-5);
        console.log("Bought Upsize Grid");
        const gridSize = this.board.getBoardSize();
        const newGridSize = {
          minX: gridSize.minX - 1,
          minY: gridSize.minY - 1,
          maxX: gridSize.maxX + 1,
          maxY: gridSize.maxY + 1,
        };
        this.board.updateBoardSize(newGridSize);
        this.boardViewCoodinateCalculator.updateGridSize(newGridSize);
        return true;
      }
      return false;
    });
  }
}
