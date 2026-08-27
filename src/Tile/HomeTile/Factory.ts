import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { HomeTileModel } from "./Model";
import { HomeTileView } from "./View";
import { DirectionTileTheme } from "../TileTheme";
import {
  TILE_ARROW_COLOR,
  TILE_BACKGRAOUND_COLOR,
  TILE_BOARDER_COLOR,
} from "./constants";
import { DirectionTileDrawer } from "../DirectionTileDrawer";

export class HomeTileFactory implements TileFactory<
  HomeTileModel,
  HomeTileView
> {
  withModel(scene: Phaser.Scene, model: HomeTileModel): HomeTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const view = new HomeTileView(scene, model.getDirection(), drawer);
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return view;
  }
  readonly DEFAULT_DIR: Direction = "u";
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): HomeTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    return new HomeTileView(scene, dir, drawer);
  }
  model(dir: Direction = this.DEFAULT_DIR): HomeTileModel {
    return new HomeTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): { model: HomeTileModel; view: HomeTileView; theme: DirectionTileTheme } {
    const model = new HomeTileModel(dir);
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const view = new HomeTileView(scene, dir, drawer);
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