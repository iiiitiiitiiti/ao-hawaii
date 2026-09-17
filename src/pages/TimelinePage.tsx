import { Link } from "react-router-dom";
import { COURSES } from "../content/courses";
import { TIMELINE } from "../content/timeline";

export function TimelinePage() {
  return (
    <main className="timeline">
      <h1>年表</h1>
      <p className="timeline__lead">到達から現在まで。フラと言語に関わる出来事を中心に並べています。詳しくは各講座へ。</p>
      <ol className="timeline__list">
        {TIMELINE.map((ev, i) => {
          const course = ev.course ? COURSES.find((c) => c.slug === ev.course) : undefined;
          return (
            <li className="timeline__item" key={i}>
              <span className="timeline__year num">{ev.year}</span>
              <div className="timeline__body">
                <p className="timeline__title">{ev.title}</p>
                {ev.note && <p className="timeline__note">{ev.note}</p>}
                {course && (
                  <Link className="timeline__course" to={`/${course.slug}`} lang="haw">
                    {course.name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
