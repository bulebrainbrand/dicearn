import Phaser from "phaser";
import { MONEY_FADEOUT_TEXT_SIZE_PX, MONEY_TEXT_SIZE_PX } from "./constants";
import { MoneyModelEvent } from "./Model";
import { MONEY_DEPTH } from "@/layor";

export class MoneyView extends Phaser.GameObjects.Container {
  private text: Phaser.GameObjects.Text;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private readonly color: string,
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    const text = scene.add.text(0, 0, "", {
      color: color,
      fontSize: MONEY_TEXT_SIZE_PX,
    });
    this.add(text);
    this.text = text;
    text.setOrigin(0.5, 0.5);
    this.setScrollFactor(0, 0);
    this.setDepth(MONEY_DEPTH);
  }
  updateMoney({ money, diff }: MoneyModelEvent["updateMoney"]) {
    this.text.text = String(money);
    if (diff === 0) return;
    const segment = diff > 0 ? "+" : "-";
    const text = this.scene.add.text(
      0,
      -100,
      segment + String(Math.abs(diff)),
      { color: this.color, fontSize: MONEY_FADEOUT_TEXT_SIZE_PX },
    );
    text.setOrigin(0.5, 0.5);
    this.add(text);
    this.scene.tweens.add({
      targets: text,
      y: text.y - 50,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        text.destroy();
      },
    });
  }
}