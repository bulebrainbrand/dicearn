import Phaser from "phaser";
export class Shop extends Phaser.GameObjects.Container {
  private items: Phaser.GameObjects.Text[] = [];
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
  }
  addItem(name: string, onClick: () => boolean) {
    const item = this.scene.add.text(0, this.items.length * 32, name, {
      fontSize: "32px",
      color: "#000000",
    });
    item.setOrigin(0, 0);
    item.setInteractive();
    item.on("pointerdown", () => {
      const canBuy = onClick();
      if (canBuy) {
        item.destroy();
        this.items = this.items.filter((i) => i !== item);
        this.updateItemsPosition();
      }
    });
    this.items.push(item);
    this.add(item);
  }
  updateItemsPosition() {
    this.items.forEach((item, index) => {
      item.setPosition(0, index * 32);
    });
    this.setSize(200, this.items.length * 32);
  }
}
