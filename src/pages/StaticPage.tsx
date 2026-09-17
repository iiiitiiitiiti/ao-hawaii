import { MDXProvider } from "@mdx-js/react";
import type { ComponentType } from "react";
import { mdxComponents } from "../lesson/mdxComponents";
import { NotFoundPage } from "./NotFoundPage";

type MdxModule = { default: ComponentType };
const pages = import.meta.glob<MdxModule>("../../content/pages/*.mdx", { eager: true });

/** content/pages/<name>.mdx を1枚のページとして出す（表記について など）。 */
export function StaticPage({ name }: { name: string }) {
  const Body = pages[`../../content/pages/${name}.mdx`]?.default;
  if (!Body) return <NotFoundPage />;
  return (
    <main className="static">
      <article className="lesson__body">
        <MDXProvider components={mdxComponents}>
          <Body />
        </MDXProvider>
      </article>
    </main>
  );
}
