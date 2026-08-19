import Phaser from "phaser";
import { DICE_DEPTH_RANGE } from "@/layer";
import { DiceModel } from "./Model";

export class DiceView extends Phaser.GameObjects.Container {
  private dice: Phaser.GameObjects.Text;
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
      color: "#000000",
    });
    this.add(text);
    this.dice = text;
    text.setOrigin(0.5, 0.5);
    this.setSize(text.width, text.height);
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
  }
  showRollResult(result: number) {
    this.dice.text = String(result);
  }
}