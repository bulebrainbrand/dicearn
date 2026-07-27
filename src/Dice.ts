import Phaser from "phaser";
export class Dice extends Phaser.GameObjects.Container {
  private maxDiceValue: number = 6;
  private minDiceValue: number = 1;
  private canRoll: boolean = true;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    const dice = scene.add.text(256 * 3, 256 * 6.5, "-", {
      fontSize: "256px",
      color: "#000000",
    });
    dice.setOrigin(0.5, 0.5);
    dice.setInteractive();
    dice.on("pointerdown", () => {
      if (this.canRoll) {
        const rollValue = this.roll();
        dice.text = String(rollValue);
        this.emit("roll", rollValue);
      }
    });
  }
  private roll() {
    return Phaser.Math.Between(this.minDiceValue, this.maxDiceValue);
  }
  setRollable(value: boolean) {
    this.canRoll = value;
  }
}
