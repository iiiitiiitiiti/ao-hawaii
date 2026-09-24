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
    id: "kunihi-ka-mauna",
    title: "Kūnihi ka Mauna",
    composer: "伝承（Hiʻiaka の物語の詠唱。N. B. Emerson が採録）",
    year: "1909年刊",
    protection: "public",
    summary: "hālau の戸口で入室を請う mele kāhea。Kauaʻi の Wailua 川で、橋の板を外されて答えを待つ Hiʻiaka の場面を詠む。",
    background: [
      "Emerson『Unwritten Literature of Hawaii』（1909）の p.40 に、hālau に入るときの合言葉の詠唱（mele kahea）の一つとして全文と英訳が載る。巻末索引にも「KUNIHI KA MAUNA i ka la’i, e: mele kahea, password to the halau」の項が立つ。RealHula の kumu は、hālau に入るときに最もよく使われる oli kāhea がこの歌だと書く。答えの歌は Oli Komo。",
      "Emerson によれば、詞章は Hiʻiaka が Lohiʻau を迎えに行く旅の途中、Kauaʻi の Wailua 川で渡し板を外され、呼びかけても答えが返らない場面から取られている。Place Names of Hawaiʻi も5〜7行目を「Hula chant by Hiʻiaka」として引く。Waiʻaleʻale と Kawaikini、Wailua、Nounou、Kaipuhaʻa、Kapaʻa と、Kauaʻi の中央から東側の地名が並ぶ。",
    ],
    related: ["hula/lesson-05", "hula/lesson-04", "moolelo/lesson-03", "olelo/lesson-03"],
  },
  {
    id: "oli-komo",
    title: "Oli Komo",
    composer: "伝承（N. B. Emerson が採録）",
    year: "1909年刊",
    protection: "public",
    summary: "戸口で入室を請う mele kāhea に、中から答えて入ることを許す詠唱。客を呼び入れてもてなし、見返りには声だけを求める。",
    background: [
      "Emerson『Unwritten Literature of Hawaii』（1909）の p.41 に、戸口の mele kāhea への答え（mele komo、英訳 Welcoming-Song）として全文と英訳が載る。PE も hewa の項に1・2行目を例文として引く。",
      "RealHula の kumu は、oli kāhea には oli komo が答えるものだとし、kumu が返すいつもの oli komo としてこの歌の書き出しを挙げる。4行と短く、命令の e と従属節の e、照応の ai、同格の ʻo、wale nō と、文法の要所が詰まっている。",
    ],
    related: ["hula/lesson-05", "hula/lesson-04", "olelo/lesson-04", "olelo/lesson-03", "olelo/lesson-07"],
  },
  {
    id: "e-ho-mai",
    title: "E Hō Mai",
    composer: "Edith Kanakaʻole（1913–1979）",
    year: "不詳（作者が oli を作り始めた1946年以降）",
    protection: "locked",
    summary: "稽古の始めに、上から知恵を授けてほしいと願う oli。Hilo の kumu hula Edith Kanakaʻole が自分の hālau のために作った。",
    background: [
      "作者は Edith Kanakaʻole。Hawaiʻi 島の Honomū に生まれ、1946年に oli を作り始め、1953年に母をたたえて Hālau O Kekuhi を開いた。深く膝を曲げる Hilo の様式を弟子に伝え、娘の Nalani と Pualani が hālau を継いだ。英題は Grant Me The Understanding（いずれも Wikipedia が Hopkins 1984、Pualani Kanakaʻole Kanahele 1995 などを引く）。",
      "Kamehameha Schools の Aloha ʻĀina Project によれば、Kanakaʻole は Hālau O Kekuhi のためにこの oli を作り、生徒は稽古の始めに唱えて、目の前の務めを果たすための知恵を祖先の神々に請うた。UH Mānoa の教材と Kanu o ka ʻĀina の教材もこの oli を載せる。",
    ],
    related: ["hula/lesson-05", "hula/lesson-04", "olelo/lesson-04", "olelo/lesson-05"],
  },
  {
    id: "oli-aloha",
    title: "Oli Aloha",
    composer: "Mary Kawena Pūkuʻi の収集（huapala.org）",
    year: "不詳",
    protection: "locked",
    summary: "来た人を迎える挨拶の oli。hala と lehua の香り、霧の宿る lehua の家、待ちわびた到着、そして一緒にやって来る aloha。",
    background: [
      "huapala.org は Mary Kawena Pūkuʻi の収集として、Pūkuʻi の英訳とともに載せる。1929年より前の出版を確かめられないので、このサイトでは鍵付きにしている。",
      "UH Maui College の Kīpaepae（ハワイの儀礼）講座の教材は、迎えの挨拶の oli（Welcome/Greeting Chant）としてこれを載せる。",
    ],
    related: ["hula/lesson-04", "hula/lesson-05", "mea-ola/lesson-03", "olelo/lesson-07"],
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
