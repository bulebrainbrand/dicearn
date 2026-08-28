import { EditMode } from "./Model";
import { DiceModel } from "@/Dice/Model";
import { CursorModel } from "@/cursor/Model";
import { InventoryModel } from "@/inventory/Model";

export const applyEditModeListen = (
  editMode: EditMode,
  cursor: CursorModel,
  diceModel: DiceModel,
  inventoryModel: InventoryModel,
) => {
  editMode.on("enable", () => {
    cursor.setVisible(false);
    diceModel.disable();
    inventoryModel.enable();
  });
  editMode.on("disable", () => {
    cursor.setVisible(true);
    diceModel.enable();
    inventoryModel.disable();
  });
};