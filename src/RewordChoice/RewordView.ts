import { INK_COLOR } from "@/colors";
import Phaser from "phaser";
import {
  DESC_FONT_SIZE_PX,
  REWORD_BOARDER_SIZE_PX,
  REWORD_HEIGHT_PX,
  REWORD_WIDTH_PX,
  TITLE_FONT_SIZE_PX,
} from "./constants";

export class RewordView extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    desc: string,
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    const title = scene.add.text(0, 0, name, {
      fontSize: TITLE_FONT_SIZE_PX,
      color: INK_COLOR,
      wordWrap: {
        width: REWORD_WIDTH_PX - REWORD_BOARDER_SIZE_PX,
        useAdvancedWrap: true,
      },
    });
    this.add(title);
    const descText = scene.add.text(0, title.height + 10, desc, {
      fontSize: DESC_FONT_SIZE_PX,
      color: INK_COLOR,
      wordWrap: {
        width: REWORD_WIDTH_PX - REWORD_BOARDER_SIZE_PX,
        useAdvancedWrap: true,
      },
    });
    this.add(descText);
    this.setSize(REWORD_WIDTH_PX, REWORD_HEIGHT_PX);
  }
}