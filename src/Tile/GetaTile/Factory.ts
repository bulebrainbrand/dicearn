import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { GetaTileModel } from "./Model";
import { GetaTileView } from "./View";
import { DirectionTileTheme } from "../TileTheme";
import {
  TILE_ARROW_COLOR,
  TILE_BACKGRAOUND_COLOR,
  TILE_BOARDER_COLOR,
} from "./constants";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { GetaIconDrawer } from "./GetaTileIconDrawer";
import { ICON_COLOR } from "./constants";

export class GetaTileFactory implements TileFactory<
  GetaTileModel,
  GetaTileView
> {
  withModel(scene: Phaser.Scene, model: GetaTileModel): GetaTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new GetaIconDrawer(ICON_COLOR);
    const view = new GetaTileView(
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
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): GetaTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new GetaIconDrawer(ICON_COLOR);
    return new GetaTileView(scene, dir, drawer, iconDrawer);
  }
  model(dir: Direction = this.DEFAULT_DIR): GetaTileModel {
    return new GetaTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): { model: GetaTileModel; view: GetaTileView; theme: DirectionTileTheme } {
    const model = new GetaTileModel(dir);
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new GetaIconDrawer(ICON_COLOR);
    const view = new GetaTileView(scene, dir, drawer, iconDrawer);
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