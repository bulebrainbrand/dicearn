import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { MarkTileModel } from "./Model";
import { MarkTileView } from "./View";
import { DirectionTileTheme } from "../TileTheme";
import {
  TILE_ARROW_COLOR,
  TILE_BACKGRAOUND_COLOR,
  TILE_BOARDER_COLOR,
  ICON_COLOR,
} from "./constants";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { MarkIconDrawer } from "./MarkTileIconDrawer";

export class MarkTileFactory implements TileFactory<
  MarkTileModel,
  MarkTileView
> {
  withModel(scene: Phaser.Scene, model: MarkTileModel): MarkTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new MarkIconDrawer(ICON_COLOR);
    const view = new MarkTileView(
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
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): MarkTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new MarkIconDrawer(ICON_COLOR);
    return new MarkTileView(scene, dir, drawer, iconDrawer);
  }
  model(dir: Direction = this.DEFAULT_DIR): MarkTileModel {
    return new MarkTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): { model: MarkTileModel; view: MarkTileView; theme: DirectionTileTheme } {
    const model = new MarkTileModel(dir);
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new MarkIconDrawer(ICON_COLOR);
    const view = new MarkTileView(scene, dir, drawer, iconDrawer);
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