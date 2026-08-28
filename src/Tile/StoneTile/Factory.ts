import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { StoneTileModel } from "./Model";
import { StoneTileView } from "./View";
import { DirectionTileTheme } from "../TileTheme";
import {
  TILE_ARROW_COLOR,
  TILE_BACKGRAOUND_COLOR,
  TILE_BOARDER_COLOR,
} from "./constants";
import { DirectionTileDrawer } from "../DirectionTileDrawer";

export class StoneTileFactory implements TileFactory<
  StoneTileModel,
  StoneTileView
> {
  withModel(scene: Phaser.Scene, model: StoneTileModel): StoneTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const view = new StoneTileView(scene, model.getDirection(), drawer);
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    model.addListener("count", (count: 0 | 1 | 2) => {
      view.changeCount(count);
    });
    return view;
  }
  readonly DEFAULT_DIR: Direction = "u";
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): StoneTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    return new StoneTileView(scene, dir, drawer);
  }
  model(dir: Direction = this.DEFAULT_DIR): StoneTileModel {
    return new StoneTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): { model: StoneTileModel; view: StoneTileView; theme: DirectionTileTheme } {
    const model = new StoneTileModel(dir);
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const view = new StoneTileView(scene, dir, drawer);
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    model.addListener("count", (count: 0 | 1 | 2) => {
      view.changeCount(count);
    });
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