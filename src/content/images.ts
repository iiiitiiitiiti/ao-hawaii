import raw from "./images.json";

/** images.json の1件。scripts/fetch-image.mjs が書く形と揃える */
export type ImageEntry = {
  id: string;
  file: string;
  title: string;
  sourceUrl: string;
  author: string;
  credit: string;
  license: string;
  licenseUrl: string;
  description: string;
  date: string;
  width: number;
  height: number;
  revision: number | null;
  fetchedAt: string;
  subjectNote: string;
};

// JSON が空配列のときに never[] へ推論されるのを避けるため、ここで型を与える
export const IMAGES: ImageEntry[] = raw as ImageEntry[];

export function findImage(id: string): ImageEntry | undefined {
  return IMAGES.find((entry) => entry.id === id);
}
