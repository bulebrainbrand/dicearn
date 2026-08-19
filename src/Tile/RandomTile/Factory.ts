import type Phaser from "phaser";
import { TileFactory } from "../types";
import { RandomTileModel } from "./Model";
import { RandomTileView } from "./View";
import { TileTheme } from "../TileTheme";
import { TILE_BACKGRAOUND_COLOR, TILE_BOARDER_COLOR } from "./constants";
import { TileDrawer } from "../TileDrawer";

export class RandomTileFactory implements TileFactory<
  RandomTileModel,
  RandomTileView
> {
  withModel(scene: Phaser.Scene): RandomTileView {
    const theme = this.createTheme();
    const drawer = new TileDrawer(theme);
    const view = new RandomTileView(scene, drawer);
    return view;
  }
  view(scene: Phaser.Scene): RandomTileView {
    const theme = this.createTheme();
    const drawer = new TileDrawer(theme);
    return new RandomTileView(scene, drawer);
  }
  model(): RandomTileModel {
    return new RandomTileModel();
  }
  all(scene: Phaser.Scene): {
    model: RandomTileModel;
    view: RandomTileView;
    theme: TileTheme;
  } {
    const model = new RandomTileModel();
    const theme = this.createTheme();
    const drawer = new TileDrawer(theme);
    const view = new RandomTileView(scene, drawer);
    return { model, view, theme };
  }
  private createTheme() {
    return new TileTheme(TILE_BOARDER_COLOR, TILE_BACKGRAOUND_COLOR);
  }
}