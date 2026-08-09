export const TILE_NAMES = new Set(["normal"] as const);
export type TileName = typeof TILE_NAMES extends Set<infer I> ? I : never;