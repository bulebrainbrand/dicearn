import { CursorModel } from "@/cursor/Model";
import { RouteTransition } from "./RouteSearcher";

export class RouteExecutor {
  constructor(private readonly cursor: CursorModel) {}

  execute({ kind, destination }: RouteTransition) {
    if (kind === "reset" || kind === "warp") {
      this.cursor.warp(destination.x, destination.y);
      return;
    }
    this.cursor.move(destination.x, destination.y);
  }
}