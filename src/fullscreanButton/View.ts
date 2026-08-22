import Phaser from "phaser";

export class FullScreanButton extends Phaser.GameObjects.Rectangle {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width?: number,
    height?: number,
    fillColor?: number,
    fillAlpha?: number,
  ) {
    super(scene, x, y, width, height, fillColor, fillAlpha);
    scene.add.existing(this);
    this.setInteractive();

    this.on("pointerdown", () => {
      void document.documentElement.requestFullscreen();
    });
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        this.setVisible(false);
        this.disableInteractive();
      } else {
        this.setVisible(true);
        this.setInteractive();
      }
    });
  }
  update(...args: any[]): void {
    super.update(...args);
  }
}