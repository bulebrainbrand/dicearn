import Phaser from "phaser";

export class MarkIconDrawer {
  constructor(
    private readonly iconColor: number,
    private readonly cornerRadius: number = 6,
    private readonly curveSegments: number = 8, // 1つの角を何本の線分で近似するか
  ) {}

  draw(g: Phaser.GameObjects.Graphics) {
    const width = 86;
    const middleDownOffset = 10;
    const mainHeight = 12;
    const middleDownHeight = 18;
    const middleDownWidth = 16;
    const leftDownWidth = 16;
    const leftDownOffset = -20;
    const leftDownHeight = 18;
    const left = -width / 2;
    const right = width / 2;
    const mainTop = -mainHeight / 2;
    const mainBottom = mainHeight / 2;
    const middleDownLeft = -middleDownWidth / 2 + middleDownOffset;
    const middleDownRight = middleDownWidth / 2 + middleDownOffset;
    const middleDownBottom = mainBottom + middleDownHeight;
    const leftDownLeft = -leftDownWidth / 2 + leftDownOffset;
    const leftDownBottom = mainBottom + leftDownHeight;
    const leftDownRight = leftDownWidth / 2 + leftDownOffset;
    const points: Phaser.Math.Vector2[] = [
      [left, mainBottom],
      [left, mainTop],
      [right, mainTop],
      [right, mainBottom],
      [middleDownRight, mainBottom],
      [middleDownRight, middleDownBottom],
      [middleDownLeft, middleDownBottom],
      [middleDownLeft, mainBottom],
      [leftDownRight, mainBottom],
      [leftDownRight, leftDownBottom],
      [leftDownLeft, leftDownBottom],
      [leftDownLeft, mainBottom],
    ].map((a) => new Phaser.Math.Vector2(a[0], a[1]));

    const roundedPoints = this.buildRoundedPolygonPoints(
      points,
      this.cornerRadius,
    );

    g.fillStyle(this.iconColor);
    g.fillPoints(roundedPoints, true, true);
  }

  /**
   * 各頂点を、隣接辺方向にradiusだけ引っ込めた2点を作り、
   * その間を「元の頂点を制御点とする2次ベジェ曲線」でサンプリングして
   * 折れ線の点列に変換する。
   */
  private buildRoundedPolygonPoints(
    points: Phaser.Math.Vector2[],
    radius: number,
  ): Phaser.Math.Vector2[] {
    const n = points.length;
    const result: Phaser.Math.Vector2[] = [];

    for (let i = 0; i < n; i++) {
      const prev = points[(i - 1 + n) % n];
      const curr = points[i];
      const next = points[(i + 1) % n];

      const toPrev = prev.clone().subtract(curr);
      const toNext = next.clone().subtract(curr);

      const r = Math.min(radius, toPrev.length() / 2, toNext.length() / 2);

      const startPoint = curr.clone().add(toPrev.clone().normalize().scale(r));
      const endPoint = curr.clone().add(toNext.clone().normalize().scale(r));

      result.push(startPoint);

      // 2次ベジェ曲線 B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
      // P0 = startPoint, P1 = curr(制御点), P2 = endPoint
      for (let s = 1; s <= this.curveSegments; s++) {
        const t = s / this.curveSegments;
        const mt = 1 - t;
        const x =
          mt * mt * startPoint.x + 2 * mt * t * curr.x + t * t * endPoint.x;
        const y =
          mt * mt * startPoint.y + 2 * mt * t * curr.y + t * t * endPoint.y;
        result.push(new Phaser.Math.Vector2(x, y));
      }
    }

    return result;
  }
}