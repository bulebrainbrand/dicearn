import { INK_COLOR } from "@/colors";

export class PaymentScheduleView extends Phaser.GameObjects.Container {
  private textObject: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    const text = scene.add.text(0, 0, String(`___`), {
      color: INK_COLOR,
      fontSize: "256px",
    });
    this.add(text);
    this.textObject = text;
  }
  nextDay(
    currentDay: number,
    nextPayment: { money: number; day: number } | null,
  ) {
    if (nextPayment === null) {
      this.textObject.text = `もう支払いはありません`;
      return;
    }
    this.textObject.text = `${currentDay - nextPayment.day}日後に${nextPayment.money}の支払い`;
  }
}