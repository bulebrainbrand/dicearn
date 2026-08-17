import Phaser from "phaser";
import { Pan, Pinch } from "phaser4-rex-plugins/plugins/gestures";

export class CameraController {
  readonly background: Phaser.GameObjects.Zone;
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
    this.background = background;
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
    scene.input.on(
      "wheel",
      (
        pointer: Phaser.Input.Pointer,
        _: Phaser.GameObjects.GameObject,
        dx: number,
        dy: number,
        _dz: number,
      ) => {
        const DY_FACTOR = 0.02;
        // x * -0.1 + 1でズームを計算
        const zoom = dy * DY_FACTOR * -0.1 + 1;
        const cam = scene.cameras.main;
        const newZoom = Phaser.Math.Clamp(cam.zoom * zoom, 0.5, 4);
        const before = cam.getWorldPoint(pointer.x, pointer.y);
        scene.cameras.main.zoom = newZoom;

        cam.preRender();
        const after = cam.getWorldPoint(pointer.x, pointer.y);
        cam.scrollX += before.x - after.x;
        cam.scrollY += before.y - after.y;
      },
    );
  }
}