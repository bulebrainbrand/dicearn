import { DayModel } from "@/day/Model";
import { PaymentModel } from "./Model";
import { PaymentScheduleView } from "./View";

export class PaymentFactory {
  static model(): PaymentModel {
    return new PaymentModel([
      { day: 7, money: 20 },
      { day: 10, money: 50 },
      { day: 13, money: 80 },
      { day: 16, money: 120 },
      { day: 19, money: 250 },
      { day: 21, money: 350 },
      { day: 35, money: 3000 },
      { day: 42, money: 6000 },
      { day: 49, money: 9000 },
      { day: 56, money: 9000 },
      { day: 63, money: 9000 },
      { day: 70, money: 18000 },
      { day: 77, money: 36000 },
      { day: 84, money: 72000 },
      { day: 100, money: 250000 },
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