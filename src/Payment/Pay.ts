import { DayModel } from "@/day/Model";
import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
import { PaymentModel } from "./Model";
import { MoneyModel } from "@/Money/Model";

export class Pay extends EventEmitter {
  constructor(day: DayModel, payment: PaymentModel, money: MoneyModel) {
    super();
    day.addListener("nextDay", (day: number) => {
      const todayPayment = payment.getPaymentByDay(day);
      if (todayPayment === null) return;
      if (money.getMoney() > todayPayment) {
        money.applyMoney(-todayPayment);
        this.emit("pay", todayPayment);
      } else {
        this.emit("failed");
      }
    });
  }
}