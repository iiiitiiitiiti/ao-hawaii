import { useCallback, useEffect, useState } from "react";
import { load, save, toggle, visit, type ProgressState } from "./store";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => load());

  useEffect(() => {
    save(progress);
  }, [progress]);

  const toggleCompleted = useCallback((lessonId: string) => setProgress((s) => toggle(s, lessonId)), []);
  const markVisited = useCallback((lessonId: string) => setProgress((s) => visit(s, lessonId)), []);

  return { progress, toggleCompleted, markVisited };
}
