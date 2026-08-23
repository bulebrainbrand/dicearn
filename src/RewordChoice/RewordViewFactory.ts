import { TILE_DIFINITION } from "@/Tile/TileDifinition";
import Phaser from "phaser";
import { RewordView } from "./RewordView";

export class RewordViewFactory {
  create(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    desc: string,
    type: string,
  ) {
    const icon = this.createIcon(scene, type);
    return new RewordView(scene, x, y, name, desc, icon);
  }
  private createIcon(
    scene: Phaser.Scene,
    name: string,
  ): Phaser.GameObjects.Container {
    switch (name) {
      case "normal":
        return TILE_DIFINITION.normal.factory.view(scene);
      case "buffer":
        return TILE_DIFINITION.buffer.factory.view(scene);
      case "geta":
        return TILE_DIFINITION.geta.factory.view(scene);
      case "mark":
        return TILE_DIFINITION.mark.factory.view(scene);
      case "random":
        return TILE_DIFINITION.random.factory.view(scene);
      case "stop":
        return TILE_DIFINITION.stop.factory.view(scene);
      case "dizzy":
        return TILE_DIFINITION.dizzy.factory.view(scene);
      case "upgrade":
        return scene.add.container();
      default:
        throw new TypeError(`unexpected icon name:${name}`);
    }
  }
}