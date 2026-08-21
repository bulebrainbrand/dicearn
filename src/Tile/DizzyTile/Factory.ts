import type Phaser from "phaser";
import { TileFactory } from "../types";
import { DizzyTileModel } from "./Model";
import { DizzyTileView } from "./View";
import { TileTheme } from "../TileTheme";
import { TILE_BACKGRAOUND_COLOR, TILE_BOARDER_COLOR } from "./constants";
import { TileDrawer } from "../TileDrawer";

export class DizzyTileFactory implements TileFactory<
  DizzyTileModel,
  DizzyTileView
> {
  withModel(scene: Phaser.Scene): DizzyTileView {
    const theme = this.createTheme();
    const drawer = new TileDrawer(theme);
    const view = new DizzyTileView(scene, drawer);
    return view;
  }
  view(scene: Phaser.Scene): DizzyTileView {
    const theme = this.createTheme();
    const drawer = new TileDrawer(theme);
    return new DizzyTileView(scene, drawer);
  }
  model(): DizzyTileModel {
    return new DizzyTileModel();
  }
  all(scene: Phaser.Scene): {
    model: DizzyTileModel;
    view: DizzyTileView;
    theme: TileTheme;
  } {
    const model = new DizzyTileModel();
    const theme = this.createTheme();
    const drawer = new TileDrawer(theme);
    const view = new DizzyTileView(scene, drawer);
    return { model, view, theme };
  }
  private createTheme() {
    return new TileTheme(TILE_BOARDER_COLOR, TILE_BACKGRAOUND_COLOR);
  }
}