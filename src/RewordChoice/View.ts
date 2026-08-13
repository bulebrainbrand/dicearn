import Phaser from "phaser";
import { Reword, RewordChoice, RewordChoiceModelEvent, Rewords } from "./Model";
import { RewordView } from "./RewordView";
import { REWORD_DEPTH } from "@/layor";
import { REWORD_WIDTH_PX, REWORDS_GAP_PX } from "./constants";

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
    this.setScrollFactor(0, 0);
    this.setSize(300, 500);
    this.setVisible(false);
  }
  private show(rewords: Rewords): void {
    rewords
      .map((data) =>
        data ? this.createReword(data) : this.createUndefinedReword(),
      )
      .forEach((container, i) => {
        this.add(container);
        container.setInteractive();
        container.setPosition(i * (REWORD_WIDTH_PX + REWORDS_GAP_PX), -200);
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