import Phaser from "phaser";
import { DICE_DEPTH_RANGE } from "@/layer";
import { DiceModel } from "./Model";
import { INK_COLOR } from "@/colors";
import { CursorView } from "@/cursor/View";

export class DiceView extends Phaser.GameObjects.Container {
  private canRoll: boolean;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    cursor: CursorView,
    private readonly diceModel: DiceModel,
  ) {
    super(scene, x, y);
    this.canRoll = diceModel.canRoll();
    scene.add.existing(this);
    scene.events.on("postupdate", () => {
      this.setPosition(cursor.x, cursor.y);
    });
    this.setSize(cursor.width, cursor.height);
    this.enableRoll();

    this.setDepth(DICE_DEPTH_RANGE.getDepth(0));
  }
  disableRoll() {
    this.canRoll = false;
    this.disableInteractive();
  }
  enableRoll() {
    this.canRoll = true;
    this.setInteractive();
    this.on("pointerdown", () => {
      if (this.canRoll) {
        this.diceModel.roll();
      }
    });
  }
  showRollResult(result: number) {
    const text = this.scene.add.text(this.x, this.y, String(result), {
      fontSize: "128px",
      color: INK_COLOR,
    });
    text.setOrigin(0.5, 0.5);
    this.scene.cameras.getCamera("UI")?.ignore(text);
    this.scene.tweens.add({
      targets: text,
      y: text.y - 256,
      duration: 800,
      alpha: 0,
      onComplete: () => {
        text.destroy();
      },
    });
  }
}