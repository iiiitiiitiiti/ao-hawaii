import { Route, Routes } from "react-router-dom";
import { CoursePage } from "./pages/CoursePage";
import { CreditsPage } from "./pages/CreditsPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { HomePage } from "./pages/HomePage";
import { LessonPage } from "./pages/LessonPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Shell } from "./pages/Shell";
import { StaticPage } from "./pages/StaticPage";
import { TimelinePage } from "./pages/TimelinePage";

export function AppRoutes() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="/notation" element={<StaticPage name="notation" />} />
        <Route path="/:courseSlug" element={<CoursePage />} />
        {/* React Router は「lesson-:number」のような部分的な動的セグメントを解釈しない。
            セグメント全体を受け取り、LessonPage 側で解釈する。 */}
        <Route path="/:courseSlug/:lessonSlug" element={<LessonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Shell>
  );
}
