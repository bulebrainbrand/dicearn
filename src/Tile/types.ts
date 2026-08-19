import { Direction } from "@/Direction";
import EventEmitter from "phaser4-rex-plugins/plugins/utils/eventemitter/EventEmitter";
import { TileTheme } from "./TileTheme";

export interface TileModel extends EventEmitter {
  readonly name: string;
}

export interface DirectionTileModel extends TileModel {
  getDirection(): Direction;
}

export interface RotatableTileModel extends DirectionTileModel {
  /**
   * @fires changeDirection
   * @param {Direction} dir
   */
  changeDirection(dir: Direction): void;
}

export interface MovableTileModel extends TileModel {
  getMovable(): boolean;
}

export interface TileView extends Phaser.GameObjects.Container {
  readonly name: string;
}
export interface TileFactory<M extends TileModel, V extends TileView> {
  all(scene: Phaser.Scene): { model: M; view: V; theme: TileTheme };
  view(scene: Phaser.Scene): V;
  model(): M;
  withModel(scene: Phaser.Scene, model: M): V;
}

export interface TileViewFactory {
  create(tile: TileModel): TileView;
}