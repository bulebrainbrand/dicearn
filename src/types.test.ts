import { describe, expect, it, vi } from "vite-plus/test";
import { BoardSize } from "./types";

describe("BoardSize", () => {
  it("updates bounds and emits one change event with the previous bounds", () => {
    const boardSize = new BoardSize(0, 0, 5, 5);
    const listener = vi.fn();
    boardSize.on("change", listener);

    boardSize.expand(1);

    expect(boardSize.toValues()).toEqual({
      minX: -1,
      minY: -1,
      maxX: 6,
      maxY: 6,
    });
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({
      minX: 0,
      minY: 0,
      maxX: 5,
      maxY: 5,
    });
  });
  it("contain", () => {
    const boardSize = new BoardSize(0, 0, 5, 5);
    expect(boardSize.contains(0, 0)).toBe(true);
    expect(boardSize.contains(-1, -1)).toBe(false);
  });
});