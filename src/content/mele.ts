import type { MeleMeta } from "../mele/types.ts";

/**
 * 「メレを読む」の曲の目次。ここは保護曲でも公開する部分だけを持つ（歌詞は引かない）。
 * 本体（歌詞・逐語注・行訳・kaona）の置き場所は protection で決まる（src/mele/types.ts）。
 * 並びはこの配列の順に一覧へ出る。
 */
export const MELE: MeleMeta[] = [
  {
    id: "kaulana-na-pua",
    title: "Kaulana Nā Pua",
    composer: "Ellen Kekoaohiwaikalani Wright Prendergast（1865–1902）",
    year: "1893（2月10日作）",
    protection: "public",
    summary: "王国転覆の翌月、署名を拒んで辞めた Royal Hawaiian Band の楽団員のために書かれた抗議の歌。別名 Mele ʻAi Pōhaku（石を食う歌）。",
    background: [
      "1893年1月17日の転覆のあと、Royal Hawaiian Band の楽団員は暫定政府への忠誠の誓約書に署名せず、2月1日に抗議して辞めた。彼らは Kapālama の Puahaulani Hale の庭にいた Prendergast を訪ね、「haole の紙には署名しない。残されたもの、石、この土地の神秘の食物で満足する」と語り、それを歌にしてくれと頼んだ（Kamehameha Schools）。",
      "作者は Liliʻuokalani の女官。作曲日は1893年5月12日付 Ka Leo o ka Lahui 紙のクレジット行にある2月10日を採る（Stillman 1999）。初出は同年3月25日の Hawaii Holomua 紙。1895年に San Francisco で出版された楽譜の旋律は、いま歌われている旋律と同じである。",
    ],
    related: ["moaukala/lesson-04", "hula/lesson-04", "olelo/lesson-04", "aina/lesson-03"],
  },
];

export function findMele(id: string): MeleMeta | undefined {
  return MELE.find((m) => m.id === id);
}
