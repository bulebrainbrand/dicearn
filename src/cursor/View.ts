import Phaser from "phaser";
import Board from "phaser4-rex-plugins/plugins/board/board/Board.js";
import { CURSOR_COLOR, CURSOR_RADIUS, CURSOR_TILE_Z } from "./constants";

import {
  BoardViewCoordinateCalculator,
  Route,
} from "@/board/BoardViewCoordinateCalculator";
import BoardPlugin from "phaser4-rex-plugins/plugins/board-plugin";
import MoveTo from "phaser4-rex-plugins/plugins/board/moveto/MoveTo";
import { CELL_SIZE_PX } from "@/constants";
import { CURSOR_DEPTH_RANGE } from "@/layer";
import { Direction } from "@/Direction";
export class CursorView extends Phaser.GameObjects.Container {
  private moveToPosititon: MoveTo;
  private setToPosition: MoveTo;
  constructor(
    scene: Phaser.Scene,
    boardView: Board,
    plugin: BoardPlugin,
    tileX: number,
    tileY: number,
    private readonly boardViewCoodinateCalculator: BoardViewCoordinateCalculator,
  ) {
    super(scene, CELL_SIZE_PX * tileX, CELL_SIZE_PX * tileY);
    this.setDepth(CURSOR_DEPTH_RANGE.getDepth(0));
    const arc = scene.add.circle(0, 0, CURSOR_RADIUS, CURSOR_COLOR, 1);
    this.add(arc);
    scene.add.existing(this);
    boardView.addChess(this, tileX, tileY, CURSOR_TILE_Z, true);
    this.moveToPosititon = plugin.add.moveTo(this, { speed: 900 });
    this.setToPosition = plugin.add.moveTo(this, { speed: Infinity });
    this.setSize(arc.width, arc.height);
  }
  animateCursorMove(
    oldPos: [number, number],
    newPos: [number, number],
    dir: Direction,
  ): Promise<void> {
    const route = this.boardViewCoodinateCalculator.twoPosToRoute(
      { x: oldPos[0], y: oldPos[1] },
      { x: newPos[0], y: newPos[1] },
      dir,
    );
    console.log("animateCursorMove", { oldPos, newPos, route });
    return this.playRoute(route);
  }
  async playRoute([step, ...rest]: Route[]): Promise<void> {
    if (step === undefined) {
      return;
    }
    const action =
      step.type === "set" ? this.setToPosition : this.moveToPosititon;
    await new Promise<void>((resolve) => {
      action.once("complete", resolve);
      action.moveTo(step.x, step.y);
    });
    return await this.playRoute(rest);
  }
  async playWarp({ new: newPos }: { new: [number, number] }) {
    await this.playRoute([
      { x: newPos[0], y: newPos[1], type: "set" },
      { x: newPos[0], y: newPos[1], type: "move" },
    ]);
  }
  onChangeCursorVisible(value: boolean) {
    if (value === true) {
      this.setAlpha(1);
    } else {
      this.setAlpha(0.4);
    }
  }
}