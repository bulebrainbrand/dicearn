import Phaser from "phaser";
import { DayModel } from "./Model";
import { DayView } from "./View";

export const dayFactory = (
  scene: Phaser.Scene,
  x: number,
  y: number,
): { model: DayModel; view: DayView } => {
  const model = new DayModel();
  const view = new DayView(scene, x, y, model.getDay());
  return { model, view };
};