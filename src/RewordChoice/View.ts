import Phaser from "phaser";
import { Reword, RewordChoice, RewordChoiceModelEvent, Rewords } from "./Model";
import { RewordView } from "./RewordView";
import { REWORD_DEPTH } from "@/layor";
import {
  REWORD_HEIGHT_PX,
  REWORD_WIDTH_PX,
  REWORDS_BACKGROUND_ALPTA,
  REWORDS_BACKGROUND_COLOR,
  REWORDS_GAP_PX,
} from "./constants";

export class RewordChoiceView extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private readonly rewordChoiceModel: RewordChoice,
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    rewordChoiceModel.addListener(
      "show",
      (arg: RewordChoiceModelEvent["show"]) => this.show(arg.rewords),
    );
    rewordChoiceModel.addListener(
      "hide",
      (_arg: RewordChoiceModelEvent["hide"]) => this.hide(),
    );
    rewordChoiceModel.addListener(
      "choice",
      (arg: RewordChoiceModelEvent["choice"]) => this.choice(arg.index),
    );
    const { width, height } = scene.scale;
    this.setScrollFactor(0, 0);
    this.setSize(width, height);
    this.setVisible(false);
  }
  private show(rewords: Rewords): void {
    const { width, height } = this.scene.scale;
    this.add(
      this.scene.add
        .rectangle(
          0,
          0,
          width,
          height,
          REWORDS_BACKGROUND_COLOR,
          REWORDS_BACKGROUND_ALPTA,
        )
        .setOrigin(0, 0)
        .setInteractive()
        .setDepth(0),
    );
    const rewordsWidth = 3 * REWORD_WIDTH_PX + 2 * REWORDS_GAP_PX;
    const left = (width - rewordsWidth) / 2;
    const top = (height - REWORD_HEIGHT_PX) / 2;
    rewords
      .map((data) =>
        data ? this.createReword(data) : this.createUndefinedReword(),
      )
      .forEach((container, i) => {
        this.add(container);
        container.setInteractive();
        container.setPosition(
          left + i * (REWORD_WIDTH_PX + REWORDS_GAP_PX),
          top,
        );
        container.setDepth(3);
        container.on("pointerdown", () => {
          // 3 element taple. so actually, `i` is 0 | 1 | 2
          // oxlint-disable-next-line typescript/no-unsafe-type-assertion
          this.rewordChoiceModel.choice(i as 0 | 1 | 2);
        });
      });

    this.setVisible(true);
    this.setDepth(REWORD_DEPTH);
  }
  private hide(): void {
    this.removeAll(true);
    this.setVisible(false);
  }
  private choice(_index: number): void {
    this.rewordChoiceModel.hide();
  }
  private createReword({ name, desc }: Reword) {
    const rewordSprite = new RewordView(this.scene, 0, 0, name, desc);
    return rewordSprite;
  }
  private createUndefinedReword() {
    return this.scene.add.container(0, 0);
  }
}