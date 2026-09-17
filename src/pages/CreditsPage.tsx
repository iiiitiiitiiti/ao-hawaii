import { IMAGES as images } from "../content/images";

/** 画像の出典一覧。images.json をそのまま並べる。 */
export function CreditsPage() {
  return (
    <main className="credits">
      <h1>画像の出典</h1>
      <p className="credits__lead">
        図版はすべて Wikimedia Commons から、パブリックドメインまたは CC ライセンスのものを取り込んでいます。作者名とライセンスは Commons の記載を機械的に写したものです。
      </p>
      <ul className="credits__list">
        {images.map((img) => (
          <li key={img.id} className="credits__item">
            <img className="credits__thumb" src={`${import.meta.env.BASE_URL}images/${img.file}`} alt="" loading="lazy" />
            <div>
              <a href={img.sourceUrl} target="_blank" rel="noreferrer">
                {img.title.replace(/^File:/, "")}
              </a>
              <p className="credits__meta">
                {img.author} · {img.licenseUrl ? <a href={img.licenseUrl}>{img.license}</a> : img.license}
                {img.date && <> · {img.date}</>}
              </p>
              {img.subjectNote && <p className="credits__note">{img.subjectNote}</p>}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
