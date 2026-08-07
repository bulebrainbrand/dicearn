import * as Phaser from "phaser";
import { DIRECTION_TAPLE } from "./Direction.ts";
import { Tiles } from "./Tiles/Model.ts";
import { Dice } from "./Dice.ts";
import { Shop } from "./Shop.ts";
import { Board } from "./board/Model.ts";
import { BoardViewCoordinateCalculator } from "./board/BoardViewCoordinateCalculator.ts";
import { Tile } from "./Tile/Model.ts";
import { Cursor as CursorModel } from "@/cursor/Model.ts";
import { CELL_SIZE_PX } from "@/constants.ts";
import { CursorView } from "./cursor/View.ts";
import { TilesView } from "./Tiles/View.ts";
import { Pan } from "phaser4-rex-plugins/plugins/gestures";
import { MONEY_DEPTH } from "./layor.ts";
import { BoardView } from "./board/View.ts";
import { DayModel } from "./day/Model.ts";
import { DayView } from "./day/View.ts";
import { dayFactory } from "./day/factory.ts";

export class GameScene extends Phaser.Scene {
  boardModel!: Board;
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
  dayModel!: DayModel;
  dayView!: DayView;
  constructor() {
    super();
  }
  create() {
    this.createModel();
    this.createView();
    this.createDay();
    this.createDice();
    this.createMoney();
    this.createShop();
    this.registorEventListener();
    this.initTiles();
    const pan = this.rexGestures.add.pan(this, { threshold: 10 });
    let shouldMove = true;
    pan.on("panstart", (pan: Pan) => {
      console.log("panstart");
      shouldMove = !this.boardView
        .getBoardBounds()
        .contains(pan.worldX, pan.worldY);
    });
    pan.on("pan", (pan: Pan) => {
      if (!shouldMove) return;

      const cam = this.cameras.main;
      cam.scrollX -= pan.dx / cam.zoom;
      cam.scrollY -= pan.dy / cam.zoom;
    });
    pan.on("panend", (_pan: Pan) => {
      console.log("panEnd");
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
  createDay() {
    const { model, view } = dayFactory(
      this,
      CELL_SIZE_PX * 13,
      CELL_SIZE_PX * 8,
    );
    this.dayModel = model;
    this.dayView = view;
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
    this.dayModel.addListener("checkMoney", (money: number) => {
      this.checkMoney(money);
    });
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
    money.setDepth(MONEY_DEPTH);
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
    this.boardModel = board;
  }
  createBoardView() {
    const board = new BoardView(this, {}, this.boardModel);
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
    this.tilesView = new TilesView(
      this,
      this.boardView,
      this.tiles,
      this.boardViewCoodinateCalculator,
    );
  }
  createDice() {
    const dice = new Dice(this, CELL_SIZE_PX * 11, CELL_SIZE_PX * 8);
    dice.on("roll", async (value: number) => {
      dice.setRollable(false);
      const gene = this.boardModel.moveCursor(value);
      for (const _ of gene) {
        // cursorModel の "move" イベント経由でキューに積まれたアニメーションが
        // 実際に終わるまで待ってから次の1マスへ進む
        await this.cursorAnimationQueue;
        this.applyMoney(1);
      }
      this.dayModel.nextDay();
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
        const gridSize = this.boardModel.getBoardSize();
        const newGridSize = {
          minX: gridSize.minX - 1,
          minY: gridSize.minY - 1,
          maxX: gridSize.maxX + 1,
          maxY: gridSize.maxY + 1,
        };
        this.boardModel.updateBoardSize(newGridSize);
        this.boardViewCoodinateCalculator.updateGridSize(newGridSize);
        return true;
      }
      return false;
    });
  }
  checkMoney(needMoney: number) {
    if (this.money < needMoney) {
      console.log("pass");
    } else {
      console.log("game over");
    }
  }
}
