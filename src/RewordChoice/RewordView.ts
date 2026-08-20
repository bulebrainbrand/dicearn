import { INK_COLOR } from "@/colors";
import Phaser from "phaser";
import {
  DESC_FONT_SIZE_PX,
  REWORD_BACKGROUND_COLOR,
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
    const background = scene.add.rectangle(
      0,
      0,
      REWORD_WIDTH_PX,
      REWORD_HEIGHT_PX,
      REWORD_BACKGROUND_COLOR,
    );
    this.add(background);
    const title = scene.add.text(0, -REWORD_HEIGHT_PX / 2, name, {
      fontSize: TITLE_FONT_SIZE_PX,
      color: INK_COLOR,
      wordWrap: {
        width: REWORD_WIDTH_PX - REWORD_BOARDER_SIZE_PX,
        useAdvancedWrap: true,
      },
    });
    title.setOrigin(0.5, 0.5);
    title.y += title.height / 2;
    this.add(title);
    const descText = scene.add.text(0, title.y + title.height / 2 + 32, desc, {
      fontSize: DESC_FONT_SIZE_PX,
      color: INK_COLOR,
      wordWrap: {
        width: REWORD_WIDTH_PX - REWORD_BOARDER_SIZE_PX,
        useAdvancedWrap: true,
      },
    });
    descText.y += descText.height / 2;
    descText.setOrigin(0.5, 0.5);
    this.add(descText);
    this.setSize(REWORD_WIDTH_PX, REWORD_HEIGHT_PX);
  }
}