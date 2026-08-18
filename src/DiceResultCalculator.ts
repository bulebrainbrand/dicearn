import { Tiles } from "./Tiles/Model";

export class DiceResultCalculator {
  constructor(private readonly tiles: Tiles) {}
  roll(): number {
    const min = 1;
    const max = 6;
    let result = Math.floor(Math.random() * (max - min + 1)) + 1;
    if (this.hasGeta()) {
      result += 1;
    }
    return result;
  }
  private hasGeta() {
    return this.tiles.some((tile) => {
      if (tile === undefined) return false;
      return tile.name === "geta";
    });
  }
}