## Tile

### NormalTile

- rotatable
- movable
- ridable
- direction
  乗ったら+1コイン

### BuffTile

- rotatable
- movable
- ridable
- direction
  隣接するタイルでコインを獲得した時、2倍

## 変更先

TilesModelをinterface依存に
TilesViewをDIにしてinterface依存に
Tile/を全体的に変更
Inventory/Interface依存と複数種類対応
GameSceneのcreateDiceのコイン計算ロジックの切り出し