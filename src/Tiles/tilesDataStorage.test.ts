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

  it("allows traversal of every cell including boundaries after expansion", () => {
    const boardSize = new BoardSize(0, 0, 5, 5);
    const storage = new TilesDataStorage<string>(boardSize);

    boardSize.expand(1);

    const visitedCells: string[] = [];
    storage.forEach((data, x, y) => {
      visitedCells.push(`${x},${y}`);
    });

    expect(visitedCells).toContain("-1,6");
    expect(visitedCells.length).toBe(8 * 8);
  });
});