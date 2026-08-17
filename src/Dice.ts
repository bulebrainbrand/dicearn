import Phaser from "phaser";
import { DICE_DEPTH_RANGE } from "./layer";
export class Dice extends Phaser.GameObjects.Container {
  private maxDiceValue: number = 6;
  private minDiceValue: number = 1;
  private canRoll: boolean = true;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    const dice = scene.add.text(0, 0, "-", {
      fontSize: "256px",
      color: "#000000",
    });
    this.add(dice);
    dice.setOrigin(0.5, 0.5);
    dice.setInteractive();
    dice.on("pointerdown", () => {
      if (this.canRoll) {
        const rollValue = this.roll();
        dice.text = String(rollValue);
        this.emit("roll", rollValue);
      }
    });
    this.setDepth(DICE_DEPTH_RANGE.getDepth(0));
  }
  private roll() {
    return Phaser.Math.Between(this.minDiceValue, this.maxDiceValue);
  }
  setRollable(value: boolean) {
    this.canRoll = value;
  }
}