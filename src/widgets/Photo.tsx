import { findImage } from "../content/images";

export type PhotoProps = {
  /** images.json の id。取り込みスクリプトが付けたもの */
  id: string;
  /** 図の下に出す説明。何を見てほしいかを書く */
  caption?: string;
  /** 読み上げ用。省略時は caption、それも無ければ Commons の説明 */
  alt?: string;
};

/** 図版の枠。出典帯（作者・ライセンス・Commons へのリンク）を必ず一緒に出す。 */
export function Photo({ id, caption, alt }: PhotoProps) {
  const entry = findImage(id);
  if (!entry) throw new Error(`images.json に無い画像です: ${id}`);
  const src = `${import.meta.env.BASE_URL}images/${entry.file}`;
  return (
    <figure className="photo">
      <img
        className="photo__img"
        src={src}
        alt={alt ?? caption ?? entry.description}
        width={entry.width}
        height={entry.height}
      />
      {caption && <figcaption className="photo__caption">{caption}</figcaption>}
      <p className="photo__credit">
        <a href={entry.sourceUrl} target="_blank" rel="noreferrer">
          Wikimedia Commons
        </a>
        {" · "}
        {entry.author}
        {" · "}
        {entry.licenseUrl ? (
          <a href={entry.licenseUrl} target="_blank" rel="noreferrer">
            {entry.license}
          </a>
        ) : (
          entry.license
        )}
      </p>
    </figure>
  );
}
