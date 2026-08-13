import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
import { TODO } from "untodo";
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
    TODO({ reason: "選ぶかんじのやつ" });
  }
  public show(rewords: Rewords) {
    TODO({ reason: "有効にする感じ" });
  }
}