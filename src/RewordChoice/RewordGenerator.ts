import { Rewords } from "./Model";
import { InventoryModel } from "@/inventory/Model";
import { BoardSize } from "@/types";

export class RewordGenerator {
  constructor(
    private readonly inventoryModel: InventoryModel,
    private readonly boardSize: BoardSize,
  ) {}
  generate(): Rewords {
    const rewords = [
      {
        type: "normal",
        name: "ノーマルタイル",
        desc: "1枚のノーマルタイルを獲得します",
        callback: () => {
          this.inventoryModel.addTile("normal", 1);
        },
      },
      {
        type: "buffer",
        name: "バッファータイル",
        desc: "隣接するタイルでの稼ぎを倍にするバッファータイルを1枚獲得します",
        callback: () => {
          this.inventoryModel.addTile("buffer", 1);
        },
      },
      {
        type: "geta",
        name: "下駄タイル",
        desc: "毎回の出目が1増える下駄タイルを1枚獲得します。重複しません",
        callback: () => {
          this.inventoryModel.addTile("geta", 1);
        },
      },
      {
        type: "mark",
        name: "的タイル",
        desc: "ワープで乗った場合にたくさんのコインが手に入るワープタイルを1枚獲得します",
        callback: () => {
          this.inventoryModel.addTile("mark", 1);
        },
      },
      {
        type: "random",
        name: "ランダムタイル",
        desc: "駒がランダムに移動するランダムタイルを1枚獲得します",
        callback: () => {
          this.inventoryModel.addTile("random", 1);
        },
      },
      {
        type: "lack",
        name: "ラックタイル",
        desc: "ランダムに獲得量が決まるラックタイルを1枚獲得します",
        callback: () => {
          this.inventoryModel.addTile("lack", 1);
        },
      },
      {
        type: "stop",
        name: "ストップタイル",
        desc: "乗るとその日が終わるストップタイルを1枚獲得します",
        callback: () => {
          this.inventoryModel.addTile("stop", 1);
        },
      },
      {
        type: "stone",
        name: "ストーンタイル",
        desc: "3回乗るごとにコインがもらえるストーンタイルを1枚獲得します",
        callback: () => {
          this.inventoryModel.addTile("stop", 1);
        },
      },
      {
        type: "upgrade",
        name: "ボードをアップグレード",
        desc: "ボードを上下左右に1マスずつ広げます",
        callback: () => {
          this.boardSize.expand(1);
        },
      },
    ] as const;
    const indices = Array.from(rewords.keys());
    for (let i = 0; i < 3; i++) {
      const j = i + Math.floor(Math.random() * (indices.length - i));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const select = indices.slice(0, 3).sort((a, b) => a - b);
    return [rewords[select[0]], rewords[select[1]], rewords[select[2]]];
  }
}