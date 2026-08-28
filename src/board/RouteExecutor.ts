import { CursorModel } from "@/cursor/Model";
import { RouteTransition } from "./RouteSearcher";

export class RouteExecutor {
  constructor(private readonly cursor: CursorModel) {}

  execute(route: RouteTransition) {
    if (route.kind === "move" || route.kind === "stop") {
      return this.cursor.move(
        route.destination.x,
        route.destination.y,
        route.dir,
      );
    }

    this.cursor.warp(route.destination.x, route.destination.y);
    return;
  }
}