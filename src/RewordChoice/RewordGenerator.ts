import { TODO } from "untodo";
import { Rewords } from "./Model";

export class RewordGenerator {
  generate(): Rewords {
    TODO({ reason: "後回し" });
  }
}