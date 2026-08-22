import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";

export class PaymentModel extends EventEmitter {
  constructor(
    private readonly paymentData: Array<{ day: number; money: number }>,
  ) {
    super();
  }
  getPaymentByDay(targetDay: number): number | null {
    for (const { day, money } of this.paymentData) {
      if (day === targetDay) return money;
    }
    return null;
  }
  getNextPaymentByDay(
    targetDay: number,
  ): { day: number; money: number } | null {
    let closePayment: { day: number; money: number } | null = null;
    for (const { day, money } of this.paymentData) {
      if (closePayment === null) {
        if (targetDay - day < 0) continue;
        closePayment = { day, money };
      }
      if (targetDay - closePayment.day > targetDay - day) {
        closePayment = { day, money };
      }
    }
    return closePayment;
  }
}