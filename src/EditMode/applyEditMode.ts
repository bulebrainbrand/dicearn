import { EditMode } from "./Model";
import { DiceModel } from "@/Dice/Model";
import { CursorModel } from "@/cursor/Model";

export const applyEditModeListen = (
  editMode: EditMode,
  cursor: CursorModel,
  diceModel: DiceModel,
) => {
  editMode.on("enable", () => {
    cursor.setVisible(false);
    diceModel.disable();
  });
  editMode.on("disable", () => {
    cursor.setVisible(true);
    diceModel.enable();
  });
};