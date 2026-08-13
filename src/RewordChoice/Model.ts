import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";

export type Reword = { name: string; desc: string; callback: CallableFunction };
export type Rewords = [
  Reword | undefined,
  Reword | undefined,
  Reword | undefined,
];
export type RewordChoiceStatus =
  | { type: "shown"; rewords: Rewords }
  | { type: "hidden" };
export type RewordChoiceModelEvent = {
  choice: { index: number; rewords: Rewords };
  show: { rewords: Rewords };
  hide: undefined;
};
export class RewordChoice extends EventEmitter {
  private status: RewordChoiceStatus;
  constructor() {
    super();
    this.status = { type: "hidden" };
  }
  public choice(index: 0 | 1 | 2): void {
    if (this.status.type === "hidden")
      throw new TypeError(`can't choice when reword is hidden`);
    this.emit("choice", {
      index,
      rewords: this.status.rewords,
    } satisfies RewordChoiceModelEvent["choice"]);
  }
  public show(rewords: Rewords) {
    this.status = { rewords, type: "shown" };
    this.emit("show", { rewords } satisfies RewordChoiceModelEvent["show"]);
  }
  public hide() {
    this.status = { type: "hidden" };
    this.emit("hide");
  }
}