import Phaser from "phaser";
import { Direction } from "@/Direction";
import { TileFactory } from "../types";
import { BufferTileModel } from "./Model";
import { BufferTileView } from "./View";
import {
  BUFF_AREA_COLOR,
  ICON_COLOR,
  TILE_ARROW_COLOR,
  TILE_BACKGRAOUND_COLOR,
  TILE_BOARDER_COLOR,
} from "./constants";
import { DirectionTileTheme } from "../TileTheme";
import { DirectionTileDrawer } from "../DirectionTileDrawer";
import { BufferIconDrawer } from "./BufferTileIconDrawer";
import { TileOverlayDrawer } from "../TileOverlayDrawer";

export class BufferTileFactory implements TileFactory<
  BufferTileModel,
  BufferTileView
> {
  withModel(scene: Phaser.Scene, model: BufferTileModel): BufferTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new BufferIconDrawer(ICON_COLOR);
    const tileOverlayDrawer = new TileOverlayDrawer(BUFF_AREA_COLOR);
    const view = new BufferTileView(
      scene,
      model.getDirection(),
      drawer,
      iconDrawer,
      tileOverlayDrawer,
    );
    model.addListener("changeDirection", (dir: Direction) =>
      view.changeDirection(dir),
    );
    return view;
  }
  readonly DEFAULT_DIR: Direction = "u";
  view(scene: Phaser.Scene, dir: Direction = this.DEFAULT_DIR): BufferTileView {
    const theme = this.createTheme();
    const drawer = new DirectionTileDrawer(theme);
    const iconDrawer = new BufferIconDrawer(ICON_COLOR);
    const tileOverlayDrawer = new TileOverlayDrawer(BUFF_AREA_COLOR);
    return new BufferTileView(
      scene,
      dir,
      drawer,
      iconDrawer,
      tileOverlayDrawer,
    );
  }
  model(dir: Direction = this.DEFAULT_DIR): BufferTileModel {
    return new BufferTileModel(dir);
  }
  all(
    scene: Phaser.Scene,
    dir: Direction = this.DEFAULT_DIR,
  ): {
    model: BufferTileModel;
    view: BufferTileView;
    theme: DirectionTileTheme;
  } {
    const model = new BufferTileModel(dir);
    const theme = this.createTheme();
    const tileDrawer = new DirectionTileDrawer(theme);
    const iconDrawer = new BufferIconDrawer(ICON_COLOR);
    const tileOverlayDrawer = new TileOverlayDrawer(BUFF_AREA_COLOR);
    const view = new BufferTileView(
      scene,
      dir,
      tileDrawer,
      iconDrawer,
      tileOverlayDrawer,
    );
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