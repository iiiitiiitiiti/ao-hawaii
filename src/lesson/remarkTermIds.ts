import type { Nodes, Root } from "mdast";

/**
 * 本文の <Terms ids={[...]} /> に並ぶ用語 id を集め、MDX モジュールから `export const termIds = [...]` として出す remark プラグイン。
 * 用語集の「出てくるレッスン」の逆引きは、これを読んで作る（手で索引を持たない）。
 *
 * ?raw で MDX の原文を読む方法は、@mdx-js/rollup が ?raw 付きの読み込みも変換してしまうため使えない。
 */

type JsxAttr = { type: string; name?: string; value?: unknown };
type JsxNode = { type: string; name?: string | null; attributes?: JsxAttr[] };

function collect(node: Nodes, out: string[]): void {
  const jsx = node as unknown as JsxNode;
  if ((jsx.type === "mdxJsxFlowElement" || jsx.type === "mdxJsxTextElement") && jsx.name === "Terms") {
    const attr = jsx.attributes?.find((a) => a.type === "mdxJsxAttribute" && a.name === "ids");
    const source = attr && typeof attr.value === "object" && attr.value !== null ? (attr.value as { value?: string }).value : undefined;
    if (source) for (const m of source.matchAll(/"([^"]+)"/g)) out.push(m[1]);
  }
  if ("children" in node) for (const child of node.children) collect(child, out);
}

export function remarkTermIds() {
  return (tree: Root) => {
    const ids: string[] = [];
    collect(tree, ids);
    const unique = [...new Set(ids)];
    // mdxjsEsm ノードは、MDX がそのまま JS として出力する。estree も併せて持たせる必要がある
    const literal = JSON.stringify(unique);
    tree.children.push({
      type: "mdxjsEsm",
      value: `export const termIds = ${literal};`,
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              source: null,
              attributes: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "termIds" },
                    init: { type: "ArrayExpression", elements: unique.map((v) => ({ type: "Literal", value: v, raw: JSON.stringify(v) })) },
                  },
                ],
              },
            },
          ],
        },
      },
    } as unknown as Root["children"][number]);
  };
}
