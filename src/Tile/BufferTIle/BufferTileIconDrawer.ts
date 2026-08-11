import Phaser from "phaser";

export class BufferIconDrawer {
  constructor(private readonly iconColor: number) {}
  draw(g: Phaser.GameObjects.Graphics) {
    const lowerWidth = 32;
    const lowerHeight = 48;
    const upperWidth = 48;
    const upperHeight = 32;
    const bottom = (upperHeight + lowerHeight) / 2;
    const top = -(upperHeight + lowerHeight) / 2;
    g.fillStyle(this.iconColor);
    g.beginPath();
    g.moveTo(-lowerWidth / 2, bottom);
    g.lineTo(-lowerWidth / 2, bottom - lowerHeight);
    g.lineTo(-upperWidth / 2, bottom - lowerHeight);
    g.lineTo(0, top);
    g.lineTo(upperWidth / 2, bottom - lowerHeight);
    g.lineTo(lowerWidth / 2, bottom - lowerHeight);
    g.lineTo(lowerWidth / 2, bottom);
    g.lineTo(-lowerWidth / 2, bottom);
    g.fill();
  }
}