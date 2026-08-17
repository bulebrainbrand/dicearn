import { Pan, Pinch } from "phaser4-rex-plugins/plugins/gestures";

export class CameraController {
  constructor(scene: Phaser.Scene) {
    const background = scene.add
      .zone(0, 0, scene.scale.width, scene.scale.height)
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(-1)
      .setInteractive();
    background.on("resize", () => {
      background.setSize(scene.scale.width, scene.scale.height);
    });
    scene.rexGestures.add
      .pan(background, { threshold: 10 })
      .on("pan", (pan: Pan) => {
        const cam = scene.cameras.main;
        cam.scrollX -= pan.dx / cam.zoom;
        cam.scrollY -= pan.dy / cam.zoom;
      });
    scene.rexGestures.add.pinch(background).on("pinch", (pinch: Pinch) => {
      const cam = scene.cameras.main;
      console.log(pinch.scaleFactor);
      cam.zoom *= pinch.scaleFactor;
    });
  }
}