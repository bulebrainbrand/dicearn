import Phaser from "phaser";
import { Reword, RewordChoice, RewordChoiceModelEvent, Rewords } from "./Model";
import { RewordView } from "./RewordView";
import { REWORDS_DEPTH_RANGE } from "@/layer";
import {
  REWORD_HEIGHT_PX,
  REWORD_WIDTH_PX,
  REWORDS_BACKGROUND_ALPTA,
  REWORDS_BACKGROUND_COLOR,
  REWORDS_GAP_PX,
} from "./constants";

export class RewordChoiceView extends Phaser.GameObjects.Container {
  private backgroundRectangle: Phaser.GameObjects.Rectangle | null = null;
  private rewordContainers: Phaser.GameObjects.Container[] = [];
  private resizeHandler: (() => void) | null = null;

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
    this.setSize(width, height);
    this.setVisible(false);

    // Set up resize handler
    this.resizeHandler = () => {
      if (this.visible) {
        const { width, height } = this.scene.scale;
        this.layout(width, height);
      }
    };
    this.scene.scale.on("resize", this.resizeHandler);
  }
  private show(rewords: Rewords): void {
    const { width, height } = this.scene.scale;

    // Create background rectangle
    this.backgroundRectangle = this.scene.add
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
      .setDepth(REWORDS_DEPTH_RANGE.getDepth(1));
    this.add(this.backgroundRectangle);

    // Create reword containers
    this.rewordContainers = rewords.map((data) =>
      data ? this.createReword(data) : this.createUndefinedReword(),
    );

    this.rewordContainers.forEach((container, i) => {
      this.add(container);
      container.setInteractive();
      container.setDepth(REWORDS_DEPTH_RANGE.getDepth(2));
      container.on("pointerdown", () => {
        // 3 element taple. so actually, `i` is 0 | 1 | 2
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        this.rewordChoiceModel.choice(i as 0 | 1 | 2);
      });
    });

    // Apply initial layout
    this.layout(width, height);

    this.setVisible(true);
    this.setDepth(REWORDS_DEPTH_RANGE.getDepth(0));
  }
  private hide(): void {
    this.removeAll(true);
    this.backgroundRectangle = null;
    this.rewordContainers = [];
    this.setVisible(false);
  }

  private layout(width: number, height: number): void {
    // Update container size
    this.setSize(width, height);

    // Update background rectangle size
    if (this.backgroundRectangle) {
      this.backgroundRectangle.setSize(width, height);
    }

    // Compute positions for reword containers
    const rewordsWidth = 3 * REWORD_WIDTH_PX + 2 * REWORDS_GAP_PX;
    const left = (width - rewordsWidth) / 2;
    const top = (height - REWORD_HEIGHT_PX) / 2;

    // Position each reword container
    this.rewordContainers.forEach((container, i) => {
      container.setPosition(left + i * (REWORD_WIDTH_PX + REWORDS_GAP_PX), top);
    });
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

  override destroy(fromScene?: boolean): void {
    // Clean up resize listener
    if (this.resizeHandler) {
      this.scene.scale.off("resize", this.resizeHandler);
      this.resizeHandler = null;
    }
    super.destroy(fromScene);
  }
}