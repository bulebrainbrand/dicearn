export const DAY_NEEDS_MANEY: Record<number, number> = { 5: 100, 15: 200 };

export const LAST_NEEDS_MANEY_DAY = Math.max(
  ...Object.keys(DAY_NEEDS_MANEY).map(Number),
);