/**
 * 講座（コース）とレッスンの目次。本文は content/<course>/lesson-NN.mdx にある。
 * ここに無いレッスンは画面に出ない。ここにあって本文が無いレッスンは「準備中」と出る。
 */

export type Lesson = {
  id: string;
  number: number;
  title: string;
  /** 1文で書く到達点。レッスン冒頭に出す */
  goal: string;
  /** 読む目安（分） */
  minutes: number;
};

export type Course = {
  slug: string;
  /** ハワイ語名 */
  name: string;
  /** 日本語の副題 */
  subtitle: string;
  /** 講座一覧に出す1〜2文 */
  lead: string;
  /** 講座ごとの1色。濃淡は CSS 側が color-mix() で作る */
  accent: string;
  lessons: Lesson[];
};

function lessons(slug: string, items: [title: string, goal: string, minutes?: number][]): Lesson[] {
  return items.map(([title, goal, minutes = 12], i) => ({
    id: `${slug}-${String(i + 1).padStart(2, "0")}`,
    number: i + 1,
    title,
    goal,
    minutes,
  }));
}

export const COURSES: Course[] = [
  {
    slug: "aina",
    name: "ʻĀina",
    subtitle: "地理と自然環境",
    lead: "島がどう生まれ、風と雨がどう降り、人がその土地をどう区切って暮らしたか。mele に出てくる地名と風雨の名も、ここで土台を作る。",
    accent: "#9a4a1e",
    lessons: lessons("aina", [
      ["ハワイ諸島の成り立ち", "ホットスポットと太平洋プレートの動きから、8つの島の年齢順と島の一生（盾状火山から環礁へ）を説明できる"],
      ["島ごとの地形と気候", "貿易風が作る風上・風下の差を理由から説明し、主要8島の位置と特徴を言える"],
      ["アフプアア — 山から海への土地区分", "moku・ahupuaʻa・ʻili の入れ子と、loʻi と loko iʻa がつながる水の流れを図で描ける"],
      ["火山とペレの地質", "Kīlauea と Mauna Loa の近年の噴火を年代つきで言え、溶岩の用語（pāhoehoe・ʻaʻā）を使い分けられる"],
      ["海 — 潮・うねり・サンゴ礁", "北岸に冬だけ大波が立つ理由と、Papahānaumokuākea が何をどう守っているかを説明できる"],
      ["Wahi pana と風・雨の名", "地名の語根を10個読み解き、mele に出る風と雨の名を島と結びつけて言える", 15],
    ]),
  },
  {
    slug: "mea-ola",
    name: "Nā Mea Ola",
    subtitle: "生態系と生きもの",
    lead: "世界で最も孤立した島に、生きものはどう辿り着き、どう枝分かれし、いま何に脅かされているか。フラで使う植物の名も、この講座で整理する。",
    accent: "#2f6b3a",
    lessons: lessons("mea-ola", [
      ["到達と固有種 — 風・波・翼", "在来の生きものが島に着いた3つの経路と、固有率が高い理由を説明できる"],
      ["鳥たちの危機", "ハワイミツスイの多様化と、蚊・鳥マラリア・温暖化が標高を押し上げる仕組みを説明できる"],
      ["植物 — カヌー植物・在来種・フラの植物", "カヌー植物と在来植物を区別し、フラで使う植物の名と扱いの作法を言える", 15],
      ["海の生きもの", "honu・ʻīlioholoikauaua・koholā の暮らしと、ʻaumakua としての海の生きものの見方を説明できる"],
      ["外来種と保全", "主な侵略種を5つ挙げ、ahupuaʻa 的な地域主体の保全の考え方を説明できる"],
    ]),
  },
  {
    slug: "moolelo",
    name: "Moʻolelo",
    subtitle: "神話と伝承",
    lead: "クムリポの創世観から、四大神、ペレとヒイアカ、ラカ、マウイまで。フラの mele が何を歌っているのかを読み解くための物語の地図。",
    accent: "#4b3d8f",
    lessons: lessons("moolelo", [
      ["クムリポ — 闇から生まれる系譜", "クムリポの構成（16の wā）と、サンゴ虫から始まる生命観、誰のために詠まれたかを説明できる", 15],
      ["四大神とマカヒキ", "Kāne・Kū・Lono・Kanaloa の領域と kinolau を言え、Makahiki が暦と社会にどう組み込まれていたかを説明できる"],
      ["ペレとヒイアカ", "ペレの来歴とヒイアカの旅の筋を追い、この叙事詩がフラの根拠とされる理由を出典つきで言える", 15],
      ["ラカとカポ — フラの守護", "Laka の kinolau と kuahu に置く植物を言え、Kapo との関係の諸説を整理できる"],
      ["マウイと英雄譚、ʻōlelo noʻeau", "Māui の主要譚と、Pukui の『ʻŌlelo Noʻeau』の使い方、kaona の考え方を説明できる", 15],
    ]),
  },
  {
    slug: "moaukala",
    name: "Mōʻaukala",
    subtitle: "歴史",
    lead: "到達から王国、転覆、州、そして復興まで。フラが禁じられ、蘇り、いま何を背負っているのかを年代で追う。",
    accent: "#7a4a2b",
    lessons: lessons("moaukala", [
      ["到達と古代社会", "ポリネシア人の到達時期の学説と、aliʻi・kahuna・makaʻāinana の社会構造、kapu の役割を説明できる"],
      ["カメハメハ・ʻAi Noa・宣教師", "統一の経過と、1819年の ʻAi Noa、1820年の宣教師到着がフラに与えた影響を年代つきで言える", 15],
      ["王国の時代", "Māhele が土地をどう変えたか、Kalākaua がフラと文化に何をしたか、Bayonet Constitution の意味を説明できる", 15],
      ["転覆と併合", "1893年から1898年の経過と、Kūʻē 請願・Kaulana Nā Pua の背景を説明できる", 15],
      ["準州から州へ、復興と主権", "1970年代のハワイアン・ルネサンスの出来事を5つ挙げ、ハワイ語復興と主権運動の現在地を言える", 15],
    ]),
  },
  {
    slug: "hula",
    name: "Hula",
    subtitle: "フラ — 歴史・用語・伝統・いま",
    lead: "起源伝承から Merrie Monarch まで。知っているつもりで曖昧だった用語と歴史を、出典に当たって確かめ直す。",
    accent: "#b3312f",
    lessons: lessons("hula", [
      ["起源と歴史", "起源伝承の複数説を出典つきで言え、抑圧と復興の年代（1830・1883・1970年代）を説明できる", 15],
      ["カヒコとアウアナ", "kahiko と ʻauana の分岐点を伴奏・言語・楽器で説明し、hula pahu と hula ʻālaʻapapa の違いを言える", 15],
      ["用語 — 動作・役割・衣装・教室の言葉", "基本ステップと役割語・衣装の語を定義つきで言え、流派差のある語を区別できる", 20],
      ["メレの種類と kaona", "mele の分類と oli の様式を言え、haʻina の意味と kaona の読み方を説明できる", 15],
      ["ハーラウ・クムフラ・ʻūniki", "hālau の語義と系譜の考え方、ʻūniki の意味と手順、教室の作法を説明できる", 15],
      ["現在の潮流", "Merrie Monarch の歴史と直近の結果、海外への広がり、敬意と盗用をめぐる議論を整理できる", 15],
    ]),
  },
  {
    slug: "olelo",
    name: "ʻŌlelo Hawaiʻi",
    subtitle: "ハワイ語 — 文法を体系的に",
    lead: "歌詞は読める。だから次は、なぜその形になるのかを文法として知る。Elbert & Pukui の文法書と辞書を正本に据えて進む。",
    accent: "#1c4f7a",
    lessons: lessons("olelo", [
      ["音と表記", "8子音・5母音の体系と、ʻokina と kahakō が意味を分ける例、強勢の規則を説明できる", 15],
      ["名詞・冠詞・所有（a/o）", "ka/ke の使い分けと、所有の a クラス・o クラスを判定基準から説明できる", 20],
      ["名詞文と場所文", "ʻO 文・He 文・Aia 文を作り分け、i と ma の違いを説明できる", 15],
      ["動詞文とアスペクト", "ua・e…ana・ke…nei・e の意味を言え、目的語の i/iā と受動 -ʻia を使える", 20],
      ["方向詞・前置詞・指示詞", "mai/aku/iho/aʻe を歌詞の例で説明し、前置詞と場所名詞の組み合わせを使える", 15],
      ["疑問・否定・関係節と辞書の引き方", "疑問詞と ʻaʻole 文を作れ、辞書の a/o 表示と略号を読める", 20],
    ]),
  },
];

export function findCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function findLesson(courseSlug: string, number: number): Lesson | undefined {
  return findCourse(courseSlug)?.lessons.find((l) => l.number === number);
}

export function lessonPath(courseSlug: string, number: number): string {
  return `/${courseSlug}/lesson-${String(number).padStart(2, "0")}`;
}

export const TOTAL_LESSONS = COURSES.reduce((n, c) => n + c.lessons.length, 0);
