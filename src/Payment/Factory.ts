import { DayModel } from "@/day/Model";
import { PaymentModel } from "./Model";
import { PaymentScheduleView } from "./View";

export class PaymentFactory {
  static model(): PaymentModel {
    return new PaymentModel([
      { day: 7, money: 20 },
      { day: 14, money: 250 },
      { day: 21, money: 700 },
    ]);
  }
  static create(
    scene: Phaser.Scene,
    x: number,
    y: number,
    day: DayModel,
  ): { model: PaymentModel; view: PaymentScheduleView } {
    const model = this.model();
    const view = new PaymentScheduleView(scene, x, y);
    day.addListener("nextDay", (day: number) => {
      view.nextDay(day, model.getNextPaymentByDay(day));
    });
    view.nextDay(day.getDay(), model.getNextPaymentByDay(day.getDay()));
    return { model, view };
  }
}