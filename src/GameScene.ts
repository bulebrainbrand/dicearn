import * as Phaser from "phaser";
import { DIRECTION_TAPLE } from "./Direction.ts";
import { Tiles } from "./Tiles/Model.ts";
import { Dice } from "./Dice.ts";
import { Shop } from "./Shop.ts";
import { Board } from "./board/Model.ts";
import { BoardViewCoordinateCalculator } from "./board/BoardViewCoordinateCalculator.ts";
import { CursorModel } from "@/cursor/Model.ts";
import { CELL_SIZE_PX } from "@/constants.ts";
import { CursorView } from "./cursor/View.ts";
import { Pan } from "phaser4-rex-plugins/plugins/gestures";
import { BoardView } from "./board/View.ts";
import { DayModel } from "./day/Model.ts";
import { DayView } from "./day/View.ts";
import { dayFactory } from "./day/factory.ts";
import { TileTypeChecker } from "./Tile/TileTypeChecker.ts";
import { NormalTileModel } from "./Tile/NormalTile/Model.ts";
import { BoardContextFactory } from "./boardContextFactory.ts";
import { InventoryContextFactory } from "./inventoryContextFactory.ts";
import { MoneyCalculator } from "./board/MoneyCalculator.ts";
import { RouteExecutor } from "./board/RouteExecutor.ts";
import { RouteSearcher } from "./board/RouteSearcher.ts";
import { BoardSize } from "./types.ts";
import { BufferTileModel } from "./Tile/BufferTIle/Model.ts";
import { MoneyModel, MoneyModelEvent } from "./Money/Model.ts";
import { MoneyView } from "./Money/View.ts";
import { INK_COLOR } from "./colors.ts";
import { RewordChoice } from "./RewordChoice/Model.ts";
import { RewordChoiceView } from "./RewordChoice/View.ts";
import { RewordGenerator } from "./RewordChoice/RewordGenerator.ts";
import { InventoryModel } from "./inventory/Model.ts";

export class GameScene extends Phaser.Scene {
  boardModel!: Board;
  tiles!: Tiles;
  cursorModel!: CursorModel;
  cursor!: CursorView;
  private cursorAnimationQueue: Promise<void> = Promise.resolve();
  private money!: MoneyModel;
  boardViewCoodinateCalculator!: BoardViewCoordinateCalculator;
  boardSize!: BoardSize;
  private boardPanZone!: Phaser.GameObjects.Zone;
  dayModel!: DayModel;
  dayView!: DayView;
  moneyCalculator!: MoneyCalculator;
  routeSearcher!: RouteSearcher;
  routeExecutor!: RouteExecutor;
  inventoryModel!: InventoryModel;
  dice!: Dice;
  constructor() {
    super();
  }
  create() {
    const {
      boardModel,
      boardView,
      tiles,
      coordinateCalculator,
      tileTypeChecker,
      cursorModel,
      cursor,
      moneyCalculator,
      routeSearcher,
      routeExecutor,
      boardSize,
    } = this.createBoardContext();
    const { inventoryModel } = this.createInventoryContext(
      boardView,
      tiles,
      coordinateCalculator,
      tileTypeChecker,
    );
    inventoryModel.addTile("normal", 1);
    inventoryModel.addTile("buffer", 1);
    this.boardModel = boardModel;
    this.tiles = tiles;
    this.cursorModel = cursorModel;
    this.boardViewCoodinateCalculator = coordinateCalculator;
    this.cursor = cursor;
    this.moneyCalculator = moneyCalculator;
    this.routeSearcher = routeSearcher;
    this.routeExecutor = routeExecutor;
    this.boardSize = boardSize;
    this.inventoryModel = inventoryModel;
    this.createDay();
    this.createDice();
    this.createMoney();
    this.createShop();
    this.registorEventListener();
    this.initTiles();
    this.createBoardPanZone();
    this.createReword();
    const pan = this.rexGestures.add.pan(this.boardPanZone, { threshold: 10 });
    pan.on("panstart", () => {
      console.log("panstart");
    });
    pan.on("pan", (pan: Pan) => {
      const cam = this.cameras.main;
      cam.scrollX -= pan.dx / cam.zoom;
      cam.scrollY -= pan.dy / cam.zoom;
    });
    pan.on("panend", (_pan: Pan) => {
      console.log("panEnd");
    });
  }
  private createReword() {
    const model = new RewordChoice();
    const view = new RewordChoiceView(this, 300, 300, model);
    const generator = new RewordGenerator(this.inventoryModel, this.boardSize);
    this.dayModel.addListener("nextDay", () => {
      model.show(generator.generate());
    });
    model.on("hide", () => {
      this.dice.setRollable(true);
    });
    model.on("show", () => {
      this.dice.setRollable(false);
    });
  }
  private createBoardPanZone() {
    this.boardPanZone = this.add
      .zone(0, 0, this.scale.width, this.scale.height)
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(-1)
      .setInteractive();
    this.scale.on("resize", () => {
      this.boardPanZone.setSize(this.scale.width, this.scale.height);
    });
  }
  private createMoney() {
    this.money = new MoneyModel(0);
    const view = new MoneyView(
      this,
      this.scale.width / 2,
      this.scale.height / 8,
      INK_COLOR,
    );
    this.money.addListener(
      "updateMoney",
      (arg: MoneyModelEvent["updateMoney"]) => view.updateMoney(arg),
    );
    this.money.applyMoney(0);
  }
  createBoardContext() {
    return BoardContextFactory.create(
      this,
      { maxX: 5, maxY: 5, minX: 0, minY: 0 },
      { x: 0, y: 0 },
    );
  }
  createInventoryContext(
    board: BoardView,
    tiles: Tiles,
    boardViewCoordinateCalculator: BoardViewCoordinateCalculator,
    tileTypeChecker: TileTypeChecker,
  ) {
    return InventoryContextFactory.create(
      this,
      board,
      tiles,
      boardViewCoordinateCalculator,
      tileTypeChecker,
    );
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
          Math.random() > 0.5
            ? new NormalTileModel(DIRECTION_TAPLE[Phaser.Math.Between(0, 3)])
            : new BufferTileModel(DIRECTION_TAPLE[Phaser.Math.Between(0, 3)]),
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
    this.dayModel.addListener("nextDay", (day: number) => {
      this.dayView.updateDay(day);
    });
  }

  createDice() {
    const dice = new Dice(this, CELL_SIZE_PX * 11, CELL_SIZE_PX * 8);
    dice.on("roll", async (value: number) => {
      dice.setRollable(false);
      for (let i = 0; i < value; i++) {
        const beforePosition = this.cursorModel.getPosition();
        const transition = this.routeSearcher.search(beforePosition);
        this.routeExecutor.execute(transition);
        // cursorModel の "move" イベント経由でキューに積まれたアニメーションが
        // 実際に終わるまで待ってから次の1マスへ進む
        await this.cursorAnimationQueue;
        this.money.applyMoney(
          this.moneyCalculator.calcMoneyBySnapshotRoute(
            beforePosition,
            transition.destination,
          ),
        );
      }
      dice.setRollable(true);
      this.dayModel.nextDay();
    });
    this.dice = dice;
  }
  createShop() {
    const shop = new Shop(this, CELL_SIZE_PX * 15, CELL_SIZE_PX * 3);
    this.add.existing(shop);
    shop.addItem("Upsize Grid", () => {
      if (this.money.getMoney() >= 5) {
        this.money.applyMoney(-5);
        console.log("Bought Upsize Grid");
        this.boardSize.expand(1);
        return true;
      }
      return false;
    });
  }
  checkMoney(needMoney: number) {
    if (this.money.getMoney() < needMoney) {
      console.log("game over");
    } else {
      console.log("pass");
    }
  }
}