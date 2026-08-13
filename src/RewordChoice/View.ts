import Phaser from "phaser";
import { RewordChoice, RewordChoiceModelEvent, Rewords } from "./Model";
import { TODO } from "untodo";

export class RewordChoiceView extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private readonly rewordChoiceModel: RewordChoice,
  ) {
    super(scene, x, y);
    rewordChoiceModel.addListener(
      "show",
      (arg: RewordChoiceModelEvent["show"]) => this.show(arg.rewords),
    );
    rewordChoiceModel.addListener(
      "hide",
      (arg: RewordChoiceModelEvent["hide"]) => this.hide(),
    );
    rewordChoiceModel.addListener(
      "choice",
      (arg: RewordChoiceModelEvent["choice"]) => this.choice(arg.index),
    );
  }
  private show(rewords: Rewords): void {
    TODO({ reason: "後回し" });
  }
  private hide(): void {
    TODO({ reason: "後回し" });
  }
  private choice(index: number): void {
    TODO({ reason: "後回し" });
  }
}