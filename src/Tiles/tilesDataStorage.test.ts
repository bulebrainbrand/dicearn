import { describe, expect, it } from "vite-plus/test";
import { BoardSize } from "@/types";
import { TilesDataStorage } from "./tilesDataStorage";

describe("TilesDataStorage", () => {
  it("resizes itself when the shared BoardSize changes", () => {
    const boardSize = new BoardSize(0, 0, 5, 5);
    const storage = new TilesDataStorage<string>(boardSize);
    storage.setTile(0, 0, "tile");

    boardSize.expand(1);

    expect(storage.getTile(0, 0)).toBe("tile");
    expect(storage.getTile(-1, -1)).toBeUndefined();
  });
});