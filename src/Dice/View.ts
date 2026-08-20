import Phaser from "phaser";
import { DICE_DEPTH_RANGE } from "@/layer";
import { DiceModel } from "./Model";
import { BUTTON_COLOR } from "./constants";
import { INK_COLOR } from "@/colors";

export class DiceView extends Phaser.GameObjects.Container {
  private text: Phaser.GameObjects.Text;
  private button: Phaser.GameObjects.Arc;
  private canRoll: boolean;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private readonly diceModel: DiceModel,
  ) {
    super(scene, x, y);
    this.canRoll = diceModel.canRoll();
    scene.add.existing(this);
    const text = scene.add.text(0, 0, "-", {
      fontSize: "256px",
      color: INK_COLOR,
    });
    this.text = text;
    const button = scene.add.circle(0, 0, 128, BUTTON_COLOR);
    this.add(button);
    this.add(text);
    this.button = button;
    text.setOrigin(0.5, 0.5);
    this.setSize(
      Math.max(text.width, button.width),
      Math.max(text.height, button.height),
    );
    this.setInteractive();
    this.on("pointerdown", () => {
      if (this.canRoll) {
        this.diceModel.roll();
      }
    });

    this.setDepth(DICE_DEPTH_RANGE.getDepth(0));
  }
  disableRoll() {
    this.canRoll = false;
  }
  enableRoll() {
    this.canRoll = true;
    this.text.text = "-";
  }
  showRollResult(result: number) {
    this.text.text = String(result);
  }
}