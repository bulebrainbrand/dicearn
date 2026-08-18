import Phaser from "phaser";

export class MarkIconDrawer {
  constructor(private readonly iconColor: number) {}

  draw(g: Phaser.GameObjects.Graphics) {
    const lineWidth = 12;
    const outRadius = 36;
    const innerRadius = 20;
    g.lineStyle(lineWidth, this.iconColor);
    g.beginPath();
    g.arc(0, 0, outRadius, 0, 2 * Math.PI);
    g.stroke();
    g.beginPath();
    g.arc(0, 0, innerRadius, 0, Math.PI * 2);
    g.fillStyle(this.iconColor);
    g.fill();
  }
}