import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { StopTileModel } from "./Model";
import { StopTileView } from "./View";
import { DirectionTileTheme } from "../TileTheme";
import {
  TILE_ARROW_COLOR,
  TILE_BACKGRAOUND_COLOR,
  TILE_BOARDER_COLOR,
  ICON_COLOR,
} from "./constants";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { StopIconDrawer } from "./StopTileIconDrawer";

export class StopTileFactory implements TileFactory<
  StopTileModel,
  StopTileView
> {
  withModel(scene: Phaser.Scene, model: StopTileModel): StopTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new StopIconDrawer(ICON_COLOR);
    const view = new StopTileView(
      scene,
      model.getDirection(),
      drawer,
      iconDrawer,
    );
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return view;
  }
  readonly DEFAULT_DIR: Direction = "u";
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): StopTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new StopIconDrawer(ICON_COLOR);
    return new StopTileView(scene, dir, drawer, iconDrawer);
  }
  model(dir: Direction = this.DEFAULT_DIR): StopTileModel {
    return new StopTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): { model: StopTileModel; view: StopTileView; theme: DirectionTileTheme } {
    const model = new StopTileModel(dir);
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new StopIconDrawer(ICON_COLOR);
    const view = new StopTileView(scene, dir, drawer, iconDrawer);
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return { model, view, theme };
  }
  private createTheme() {
    return new DirectionTileTheme(
      TILE_BOARDER_COLOR,
      TILE_BACKGRAOUND_COLOR,
      TILE_ARROW_COLOR,
    );
  }
}