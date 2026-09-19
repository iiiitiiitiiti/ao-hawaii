import { Route, Routes, useParams } from "react-router-dom";
import { findInstrument } from "./instruments/registry";
import { InstrumentLessonPage } from "./instruments/pages/InstrumentLessonPage";
import { InstrumentPage } from "./instruments/pages/InstrumentPage";
import { SongLibraryDetailRoute, SongLibraryListRoute } from "./instruments/pages/SongLibraryRoute";
import { CoursePage } from "./pages/CoursePage";
import { CreditsPage } from "./pages/CreditsPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { HomePage } from "./pages/HomePage";
import { LessonPage } from "./pages/LessonPage";
import { MeleListPage } from "./pages/MeleListPage";
import { MelePage } from "./pages/MelePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Shell } from "./pages/Shell";
import { StaticPage } from "./pages/StaticPage";
import { TimelinePage } from "./pages/TimelinePage";

/**
 * 先頭のセグメントが楽器（ukulele）なら楽器の画面、そうでなければ講座の画面（docs/decisions/013）。
 * 楽器の画面は useParams().instrumentSlug を読む。講座の画面には slug を props で渡す。
 */
function SectionPage({ lesson }: { lesson: boolean }) {
  const { instrumentSlug = "", lessonSlug = "" } = useParams();
  if (findInstrument(instrumentSlug)) return lesson ? <InstrumentLessonPage /> : <InstrumentPage />;
  return lesson ? <LessonPage courseSlug={instrumentSlug} lessonSlug={lessonSlug} /> : <CoursePage courseSlug={instrumentSlug} />;
}

export function AppRoutes() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="/notation" element={<StaticPage name="notation" />} />
        <Route path="/mele" element={<MeleListPage />} />
        <Route path="/mele/:meleId" element={<MelePage />} />
        <Route path="/:instrumentSlug" element={<SectionPage lesson={false} />} />
        {/* 静的セグメントは動的セグメントより優先されるため、下の :lessonSlug より先に当たる */}
        <Route path="/:instrumentSlug/songs" element={<SongLibraryListRoute />} />
        <Route path="/:instrumentSlug/songs/:songId" element={<SongLibraryDetailRoute />} />
        {/* React Router は「lesson-:number」のような部分的な動的セグメントを解釈しない。
            セグメント全体を受け取り、各ページ側で解釈する。 */}
        <Route path="/:instrumentSlug/:lessonSlug" element={<SectionPage lesson />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Shell>
  );
}
