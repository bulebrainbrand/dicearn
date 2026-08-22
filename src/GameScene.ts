import * as Phaser from "phaser";
import { DIRECTION_TAPLE } from "./Direction.ts";
import { Tiles } from "./Tiles/Model.ts";
import { BoardViewCoordinateCalculator } from "./board/BoardViewCoordinateCalculator.ts";
import { CursorModel } from "@/cursor/Model.ts";
import { CELL_SIZE_PX, DEBUG } from "@/constants.ts";
import { CursorView } from "./cursor/View.ts";
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
import { CameraController } from "./CameraController.ts";
import { UI_DEPTH_RANGE } from "./layer.ts";
import { DiceResultCalculator } from "./DiceResultCalculator.ts";
import { DiceModel } from "./Dice/Model.ts";
import { DiceView } from "./Dice/View.ts";
import { EditMode } from "./EditMode/Model.ts";
import { EditModeButton } from "./EditMode/View.ts";
import { applyEditModeListen } from "./EditMode/applyEditMode.ts";
import { Board } from "./board/Model.ts";
import { DizzyTileModel } from "./Tile/DizzyTile/Model.ts";
import { PaymentModel } from "./Payment/Model.ts";
import { PaymentFactory } from "./Payment/Factory.ts";
import { Pay } from "./Payment/Pay.ts";

export class GameScene extends Phaser.Scene {
  board!: Board;
  tiles!: Tiles;
  cursorModel!: CursorModel;
  cursor!: CursorView;
  private cursorAnimationQueue: Promise<void> = Promise.resolve();
  private money!: MoneyModel;
  boardSize!: BoardSize;
  dayModel!: DayModel;
  dayView!: DayView;
  moneyCalculator!: MoneyCalculator;
  routeSearcher!: RouteSearcher;
  routeExecutor!: RouteExecutor;
  inventoryModel!: InventoryModel;
  dice!: DiceModel;
  UIContainer!: Phaser.GameObjects.Container;
  GameContainer!: Phaser.GameObjects.Container;
  paymentModel!: PaymentModel;
  rewordModel!: RewordChoice;
  rewordGenerator!: RewordGenerator;
  constructor() {
    super();
  }
  preload() {
    this.load.svg("random_tile_icon", "/question.svg", {
      width: 80,
      height: 80,
    });
    this.load.svg("dizzy_tile_icon", "/dizzy.svg", { width: 80, height: 80 });
  }
  create() {
    this.createUIContainer();
    this.createGameContainer();
    this.createUICamera();
    const {
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
      boardModel,
    } = this.createBoardContext();
    const { inventoryModel, inventoryView } = this.createInventoryContext(
      boardView,
      tiles,
      coordinateCalculator,
      tileTypeChecker,
    );
    inventoryModel.addTile("normal", 1);
    inventoryModel.addTile("buffer", 1);
    this.cameras.main.ignore(inventoryView);
    this.board = boardModel;
    this.tiles = tiles;
    this.cursorModel = cursorModel;
    this.cursor = cursor;
    this.moneyCalculator = moneyCalculator;
    this.routeSearcher = routeSearcher;
    this.routeExecutor = routeExecutor;
    this.boardSize = boardSize;
    this.inventoryModel = inventoryModel;
    this.createDay();
    this.createDice();
    this.createMoney();
    this.registorEventListener();
    this.initTiles();
    this.createReword();
    this.createEditMode();
    const { model } = this.createPayment();
    this.paymentModel = model;
    this.createPay();
    const cameraController = new CameraController(this);
    this.GameContainer.addAt(cameraController.background, 0);
    this.UIContainer.setScrollFactor(0, 0, true);
    this.initCameras();
    if (DEBUG) {
      this.input.on(
        "pointerdown",
        (a: Phaser.Input.Pointer, b: Phaser.GameObjects.GameObject) => {
          console.log("clicked gameobject:", b);
        },
      );
    }
  }
  private createPay() {
    new Pay(this.dayModel, this.paymentModel, this.money)
      .addListener("pay", () => {
        this.rewordModel.show(this.rewordGenerator.generate());
      })
      .addListener("failed", () => {
        console.log("failed");
      });
  }
  private createEditMode() {
    const model = new EditMode();
    const view = new EditModeButton(this, 0, 0, model);
    applyEditModeListen(model, this.cursorModel, this.dice);
    this.UIContainer.add(view);
  }
  private createUICamera() {
    this.cameras.add(0, 0, this.scale.width, this.scale.height, false, "UI");
  }
  private createUIContainer() {
    this.UIContainer = this.add
      .container(0, 0)
      .setScrollFactor(0, 0)
      .setDepth(UI_DEPTH_RANGE.getDepth(0));
  }
  private createGameContainer() {
    this.GameContainer = this.add.container(0, 0);
  }
  private initCameras() {
    this.cameras.main.ignore(this.UIContainer);
    this.cameras.getCamera("UI")?.ignore(this.GameContainer);
  }
  private createReword() {
    const model = new RewordChoice();
    const view = new RewordChoiceView(this, 0, 0, model);
    const generator = new RewordGenerator(this.inventoryModel, this.boardSize);
    model.on("hide", () => {
      this.dice.enable();
    });
    model.on("show", () => {
      this.dice.disable();
    });
    this.UIContainer.add(view);
    this.rewordModel = model;
    this.rewordGenerator = generator;
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
    this.UIContainer.add(view);
  }
  private createPayment() {
    const { view, model } = PaymentFactory.create(
      this,
      this.scale.width - 800,
      100,
      this.dayModel,
    );
    this.cameras.main.ignore(view);
    return { view, model };
  }
  createBoardContext() {
    const chessContainer = this.add.container();
    this.GameContainer.add(chessContainer);
    return BoardContextFactory.create(
      this,
      { maxX: 5, maxY: 5, minX: 0, minY: 0 },
      { x: 0, y: 0 },
      chessContainer,
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
      this.GameContainer,
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
    this.UIContainer.add(view);
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
    this.tiles.setTile(1, 1, new DizzyTileModel());
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
    this.dayModel.addListener("nextDay", (day: number) => {
      this.dayView.updateDay(day);
    });
  }

  createDice() {
    const dice = new DiceModel(new DiceResultCalculator(this.tiles));
    const diceView = new DiceView(
      this,
      CELL_SIZE_PX * 11,
      CELL_SIZE_PX * 8,
      this.cursor,
      dice,
    );
    dice.on("roll", async (value: number) => {
      dice.disable();
      for (const { transition, beforePosition } of this.board.moveCursor(
        value,
      )) {
        await this.cursorAnimationQueue;
        this.money.applyMoney(
          this.moneyCalculator.calcMoneyBySnapshotRoute(
            beforePosition,
            transition.destination,
            transition.kind,
          ),
        );
      }
      dice.enable();
      this.dayModel.nextDay();
    });
    dice.on("enableRoll", () => {
      diceView.enableRoll();
    });
    dice.on("disableRoll", () => {
      diceView.disableRoll();
    });
    dice.on("roll", (result: number) => {
      diceView.showRollResult(result);
    });
    this.dice = dice;
    this.GameContainer.add(diceView);
  }
}