/**
 * 用語集の正本。レッスン本文の <Terms ids={[...]} /> と /glossary の両方がここを読む。
 *
 * hawaiian は ʻokina（U+02BB）と kahakō を必ず付ける。sourceUrl と checkedAt は必須で、
 * 辞書（wehewehe.org）で確認した日を書く。tests/glossary.test.ts が形を検査する。
 */

export type TermCategory = "hula" | "olelo" | "aina" | "mea-ola" | "moolelo" | "moaukala";

export type Term = {
  id: string;
  hawaiian: string;
  /** 日本語の短い訳語（1行） */
  meaning: string;
  /** 補足。用法・流派差・語源など */
  note?: string;
  category: TermCategory;
  sourceUrl: string;
  checkedAt: string;
};

export const GLOSSARY: Term[] = [
  // ---- moolelo ----
  { id: "kumulipo", hawaiian: "Kumulipo", meaning: "起源、生命の源、深い闇の根。ハワイの創世系譜詠唱の題名", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=kumulipo", checkedAt: "2026-09-18" },
  { id: "wa", hawaiian: "wā", meaning: "時代、時期。クムリポの16の章を指す", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=w%C4%81", checkedAt: "2026-09-18" },
  { id: "po", hawaiian: "pō", meaning: "夜、闇。神々の領域", note: "クムリポ前半の世界。ao と対になる", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=p%C5%8D", checkedAt: "2026-09-18" },
  { id: "ao", hawaiian: "ao", meaning: "光、昼、夜明け、世界", note: "pō から ao へ、が創世の向き", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=ao", checkedAt: "2026-09-18" },
  { id: "koakoa", hawaiian: "koʻakoʻa", meaning: "サンゴ", note: "クムリポで最初に生まれる ʻukukoʻakoʻa（サンゴ虫）の語幹", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=ko%CA%BBako%CA%BBa", checkedAt: "2026-09-18" },
  { id: "mookuauhau", hawaiian: "moʻokūʻauhau", meaning: "系譜、血統", note: "moʻo（連なり）＋ kūʻauhau（系図）", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=mo%CA%BBok%C5%AB%CA%BBauhau", checkedAt: "2026-09-18" },
  { id: "koihonua", hawaiian: "koʻihonua", meaning: "系図の詠唱。mele koʻihonua はクムリポが属するジャンル", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=ko%CA%BBihonua", checkedAt: "2026-09-18" },
  { id: "kinolau", hawaiian: "kinolau", meaning: "神が取る多くの身体（化身）。動物・植物・自然現象", note: "kino（体）＋ lau（多くの）。Laka の kinolau は kuahu に置く植物になる", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=kinolau", checkedAt: "2026-09-18" },
  { id: "hookupu", hawaiian: "hoʻokupu", meaning: "供物、儀礼的な贈り物、貢納", note: "「成長させる」が語義。フラの場では kumu や神へ捧げる贈り物", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=ho%CA%BBokupu", checkedAt: "2026-09-18" },
  { id: "aumakua", hawaiian: "ʻaumakua", meaning: "家族・個人の守護霊。神格化された祖先", note: "複数形は ʻaumākua。サメ・フクロウ・タコなどの姿を取る", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=%CA%BBaumakua", checkedAt: "2026-09-18" },
  { id: "kapu", hawaiian: "kapu", meaning: "禁忌、神聖、立入禁止。古代の宗教・社会体系そのものの名でもある", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=kapu", checkedAt: "2026-09-18" },
  { id: "makahiki", hawaiian: "makahiki", meaning: "年。また、10〜11月頃に始まり約4か月続く Lono の祭りの季節", note: "戦は禁じられ、競技と貢納が行われた", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=makahiki", checkedAt: "2026-09-18" },
  { id: "akua", hawaiian: "akua", meaning: "神、霊的存在", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=akua", checkedAt: "2026-09-18" },
  { id: "heiau", hawaiian: "heiau", meaning: "神殿。石を積んだ祭祀の場", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=heiau", checkedAt: "2026-09-18" },
  { id: "ai-noa", hawaiian: "ʻai noa", meaning: "自由な食事。1819年に食の kapu が破られた出来事を指す", note: "ʻai（食べる）＋ noa（kapu から解かれた）", category: "moaukala", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=noa", checkedAt: "2026-09-18" },
  { id: "kupua", hawaiian: "kupua", meaning: "半神。変身の力を持つ英雄・魔物", note: "Māui も Kamapuaʻa も kupua", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=kupua", checkedAt: "2026-09-18" },
  { id: "kaona", hawaiian: "kaona", meaning: "隠された意味。詩歌における二重の意味、人や場所への暗示", category: "hula", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=kaona", checkedAt: "2026-09-18" },
  { id: "moolelo", hawaiian: "moʻolelo", meaning: "物語、歴史、伝承、記録。語りの連なり全般", note: "moʻo（連なり）＋ ʻōlelo（ことば）", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=mo%CA%BBolelo", checkedAt: "2026-09-18" },
  { id: "kaao", hawaiian: "kaʻao", meaning: "空想的な物語、伝説、ロマンス", note: "moʻolelo より狭く、娯楽として語られることが多い。境目は絶対ではない", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=ka%CA%BBao", checkedAt: "2026-09-18" },
  { id: "olelo-noeau", hawaiian: "ʻōlelo noʻeau", meaning: "ことわざ、詩的な言い回し", note: "Pukui『ʻŌlelo Noʻeau』（1983）が代表的な集成", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=no%CA%BBeau", checkedAt: "2026-09-18" },
  { id: "wiliwili", hawaiian: "wiliwili", meaning: "在来の落葉樹（Erythrina sandwicensis）。軽い材はサーフボードやカヌーの浮木に", note: "Māui が太陽を縛った木", category: "mea-ola", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=wiliwili", checkedAt: "2026-09-18" },
  { id: "alae", hawaiian: "ʻalae", meaning: "ハワイバン（ʻalae ʻula）。額が赤い水鳥", note: "Māui に火の秘密を明かした鳥", category: "mea-ola", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=%CA%BBalae", checkedAt: "2026-09-18" },
  { id: "hiiaka", hawaiian: "Hiʻiaka", meaning: "Pele の妹たちの共通の冠称。最年少で最も名高いのが Hiʻiakaikapoliopele（Pele の懐の Hiʻiaka）", category: "moolelo", sourceUrl: "https://wehewehe.org/gsdl2.85/cgi-bin/hdict?a=d&d=D3488&l=en", checkedAt: "2026-09-18" },
  { id: "hopoe", hawaiian: "Hōpoe", meaning: "Hiʻiaka の友で踊り手。Pele の怒りで Puna の岩に変えられた", note: "普通名詞 hōpoe は「十分に開いたレフアの花」", category: "moolelo", sourceUrl: "https://wehewehe.org/gsdl2.85/cgi-bin/hdict?a=d&d=D4446&l=en", checkedAt: "2026-09-18" },
  { id: "moo", hawaiian: "moʻo", meaning: "トカゲ、竜、水の精霊。Hiʻiaka が旅で戦う相手の総称", note: "「連なり」の意味の moʻo（moʻolelo, moʻokūʻauhau）と同じ綴り", category: "moolelo", sourceUrl: "https://wehewehe.org/gsdl2.85/cgi-bin/hdict?a=d&d=D125837&l=en", checkedAt: "2026-09-18" },
  { id: "lehua", hawaiian: "lehua", meaning: "ʻōhiʻa の花、またその木。ハワイ島の花", note: "Hiʻiaka と Hōpoe の象徴。Pele と Laka の両方の kinolau とされる", category: "mea-ola", sourceUrl: "https://wehewehe.org/gsdl2.85/cgi-bin/hdict?a=d&d=D10707&l=en", checkedAt: "2026-09-18" },
  { id: "kahiki", hawaiian: "Kahiki", meaning: "海の向こうの土地、祖先の故郷。Pele が来た場所", note: "Tahiti と同源だが、特定の島より「彼方の地」の意で使う", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=kahiki", checkedAt: "2026-09-18" },
  { id: "laka", hawaiian: "Laka", meaning: "フラの守護神。森の女神で、kuahu の植物が kinolau", note: "普通名詞 laka は「穏やかな、慣れた、引き寄せる」。カヌーの神 Laka（男神）は別人", category: "hula", sourceUrl: "https://hilo.hawaii.edu/wehe/?a=q&q=laka", checkedAt: "2026-09-18" },
  { id: "kapo", hawaiian: "Kapo", meaning: "Kapoʻulakīnaʻu。Laka と一体とも母とも語られる女神。呪術と憑依の神でもある", category: "hula", sourceUrl: "https://hilo.hawaii.edu/wehe/?a=q&q=kapo", checkedAt: "2026-09-18" },
  { id: "kuahu", hawaiian: "kuahu", meaning: "祭壇。hālau の中に立て、Laka の依代と植物を置く", category: "hula", sourceUrl: "https://hilo.hawaii.edu/wehe/?a=q&q=kuahu", checkedAt: "2026-09-18" },
  { id: "maile", hawaiian: "maile", meaning: "香りのよい蔓（Alyxia stellata）。kuahu の標準植物、レイの代表", note: "4姉妹の半神としても語られる", category: "mea-ola", sourceUrl: "https://hilo.hawaii.edu/wehe/?a=q&q=maile", checkedAt: "2026-09-18" },
  { id: "ieie", hawaiian: "ʻieʻie", meaning: "森の木に絡む蔓（Freycinetia arborea）。kuahu の標準植物", category: "mea-ola", sourceUrl: "https://hilo.hawaii.edu/wehe/?a=q&q=ieie", checkedAt: "2026-09-18" },
  { id: "palapalai", hawaiian: "palapalai", meaning: "シダ（Microlepia）。kuahu の標準植物、lei poʻo の材料", category: "mea-ola", sourceUrl: "https://hilo.hawaii.edu/wehe/?a=q&q=palapalai", checkedAt: "2026-09-18" },
  { id: "hala-pepe", hawaiian: "hala pepe", meaning: "在来の木（Dracaena 属）。kuahu の標準植物", category: "mea-ola", sourceUrl: "https://hilo.hawaii.edu/wehe/?a=q&q=hala%20pepe", checkedAt: "2026-09-18" },
  { id: "pule", hawaiian: "pule", meaning: "祈り、祈ること", note: "pule kuahu は祭壇への祈り", category: "hula", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=pule", checkedAt: "2026-09-18" },
  { id: "kuleana", hawaiian: "kuleana", meaning: "責任、権利、受け持ち", note: "年下の弟（人）が年上の兄（kalo）を世話する責任、の文脈で使う", category: "moolelo", sourceUrl: "https://wehe.hilo.hawaii.edu/?q=kuleana", checkedAt: "2026-09-18" },
];

export function findTerm(id: string): Term | undefined {
  return GLOSSARY.find((t) => t.id === id);
}
