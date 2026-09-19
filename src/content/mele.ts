import type { LessonRef, MeleMeta } from "../mele/types.ts";

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
    related: ["moaukala/lesson-04", "hula/lesson-04", "olelo/lesson-04", "olelo/lesson-07", "aina/lesson-03"],
  },
  {
    id: "noho-paipai",
    title: "Noho Paipai",
    composer: "John Kameaaloha Almeida（1897–1985）",
    year: "1938年ごろ",
    protection: "locked",
    summary: "揺り椅子に二人で座る情景を歌う hula ʻauana の定番。英題 Rocking Chair Hula。作者 Almeida 自身の録音が残る。",
    background: [
      "作者は John Kameaaloha Almeida。Oʻahu の Pauoa 谷に生まれ、10歳までに視力を失い、1930年代の KGU のラジオ番組で「The Dean of Hawaiian Music」と呼ばれた。300曲以上を作り、Genoa Keawe を見いだした人でもある（Wikipedia が Kanahele『Hawaiian Music & Musicians』を引く）。",
      "作者自身の録音が2点残る。Hawaiʻi State Archives が所蔵する1938年ごろの KGU 放送用原盤と、49th State Records 盤で、どちらもクレジットは Almeida。huapala.org は伝承曲（Traditional）として掲げ、広めた Almeida の名を添える。",
    ],
    related: ["hula/lesson-02", "hula/lesson-04", "olelo/lesson-07"],
    ukulele: "/ukulele/songs/noho-paipai",
  },
  {
    id: "pauoa-ka-liko-ka-lehua",
    title: "Pauoa Ka Liko Ka Lehua",
    composer: "Emma Bush（クレジット上の作者）",
    year: "20世紀前半",
    protection: "locked",
    summary: "Honolulu の Pauoa 谷のレフアの若芽に、腰を揺らして歩く娘を重ねた hula ʻauana の定番。通称 Pauoa Liko Ka Lehua。",
    background: [
      "クレジット上の作者は Emma Bush。huapala.org は、Sam Kanahele か Charles W. Booth が作って Bush に贈った歌だと伝え、Bush を初期のラジオとナイトクラブの歌い手とする。",
      "Pauoa は Honolulu の Punchbowl の北東にある谷。歌はその谷のレフアの若芽（liko）を若い踊り手に重ね、腰の揺れとペチコートの縁飾りをちらりと見たいと歌う。歌詞カードは8連を載せるが、教室で歌う4連（Aia・Makemake・Nihoniho・Haʻina）だけを載せる。",
    ],
    related: ["hula/lesson-02", "hula/lesson-04", "olelo/lesson-05", "aina/lesson-06"],
    appleMusic: {
      url: "https://music.apple.com/jp/album/pauoa-liko-ka-lehua/316201322?i=316201426",
      note: "Chauncy Bermodez の歌（Aloha Festivals Hawaiian Falsetto Contest Winners Vol. 1、2000）",
    },
  },
  {
    id: "ka-ua-kilihune",
    title: "Ka Ua Kilihune",
    composer: "Leonard Kaleonahenaheokalani Spencer Beck & Al Makahinu Barcarse",
    year: "現代（2007年録音）",
    protection: "locked",
    summary: "Kāneʻohe の Koʻolau の山陰に降る雨 Kilihune と、湾に浮かぶ Mokoliʻi を歌う。締めは雨そのものへの感謝。",
    background: [
      "作者は Leonard Kaleonahenaheokalani Spencer Beck と Al Makahinu Barcarse。Barcarse は Kāneʻohe の hālau「Ka Ua Kilihune」の kumu hula で、弟子の Cameron Konapiliahi Barcarse が2016年に ʻūniki を受けて自分の hālau を開いた。Hoku Zuttermeister がアルバム Aina Kupuna（2007）で録音している。",
      "Kilihune は「霧雨」を表す普通名詞で、この歌では Kāneʻohe の雨の名として歌われる。歌詞カードの解説は、Kāneʻohe 湾の小島 Mokoliʻi をめぐる Hiʻiaka の伝えと、島の呼び方で作者二人が意見を分けた経緯を伝える。",
    ],
    related: ["aina/lesson-02", "aina/lesson-06", "moolelo/lesson-03", "hula/lesson-04"],
    appleMusic: {
      url: "https://music.apple.com/jp/album/ka-ua-kilihune/306218611?i=306218623",
      note: "Hoku Zuttermeister の歌（Aina Kupuna、2007）",
    },
  },
];

export function findMele(id: string): MeleMeta | undefined {
  return MELE.find((m) => m.id === id);
}

/** related にそのレッスンを挙げている曲（MelePage の「関連するレッスン」の逆引き） */
export function meleRelatedTo(lessonRef: LessonRef): MeleMeta[] {
  return MELE.filter((m) => m.related.includes(lessonRef));
}
