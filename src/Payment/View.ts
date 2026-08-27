import { INK_COLOR } from "@/colors";
import Phaser from "phaser";

export class PaymentScheduleView extends Phaser.GameObjects.Container {
  private textObject: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    const text = scene.add.text(0, 0, String(`___`), {
      color: INK_COLOR,
      fontSize: "64px",
    });
    text.setOrigin(1, 0);
    this.add(text);
    this.textObject = text;
    this.setSize(text.width, text.height);
  }
  nextDay(
    currentDay: number,
    nextPayment: { money: number; day: number } | null,
  ) {
    console.log(currentDay);
    if (nextPayment === null) {
      this.textObject.text = `もう支払いはありません`;
      this.setSize(this.textObject.width, this.textObject.height);
      return;
    }
    this.textObject.text = `${nextPayment.day - currentDay}日後に${nextPayment.money}の支払い`;
    this.setSize(this.textObject.width, this.textObject.height);
  }
}