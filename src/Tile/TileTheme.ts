/**
 *
 */
export class TileTheme {
  constructor(
    readonly boarderColor: number,
    readonly backgroundColor: number,
  ) {}
}

export class DirectionTileTheme extends TileTheme {
  constructor(
    readonly boarderColor: number,
    readonly backgroundColor: number,
    readonly arrowColor: number,
  ) {
    super(boarderColor, backgroundColor);
  }
}