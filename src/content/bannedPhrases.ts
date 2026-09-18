// 2026-09-18 の方針（docs/decisions/007）: 「○○に記述がないため怪しい」型の書き方をしない。
// 出典が複数あれば言い切る、1つならその出典を名指しする、0なら書かない。
// tests/hedging.test.ts（本文 MDX）と src/mele/validate.ts（曲データ）が使う。
export const BANNED_PHRASES: RegExp[] = [
  /kind="unverified"/,
  /本サイトの調査では/,
  /記述がな/,
  /裏取り/,
  /未確認/,
  /未検証/,
  /可能性あり/,
  /断定は避け/,
  /諸説あり/,
  /確認できていません/,
  /確認できませんでした/,
];
