import { INK_COLOR, LIGHT_BACKGROUND_COLOR } from "@/colors";
import Phaser from "phaser";

export class Description extends Phaser.GameObjects.Container {
  private readonly textObject: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x, y);
    scene.add.existing(this);
    this.textObject = scene.add.text(0, 0, "", {
      color: INK_COLOR,
      fontSize: "48px",
      fontStyle: "bold",
      fontFamily: '"Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
      wordWrap: { width: 600, useAdvancedWrap: true },
      padding: { left: 32, top: 32 },
    });

    this.add(
      scene.add
        .rectangle(
          0,
          0,
          640,
          320,
          Phaser.Display.Color.HexStringToColor(LIGHT_BACKGROUND_COLOR).color,
          0.3,
        )
        .setOrigin(0, 0),
    );
    this.add(this.textObject);
  }
  show(text: string) {
    this.setVisible(true);
    this.textObject.text = text;
  }
  hide() {
    this.setVisible(false);
  }
}