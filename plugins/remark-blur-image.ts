import type { Root } from "mdast"
import path from "path"
import { visit } from "unist-util-visit"
import { getBlurPlaceholderFromFile, getBlurPlaceholderFromURL } from "./placeholder"

export function remarkBlurImage() {
  return async function (tree: Root, file: { path?: string }) {
    const dir = file.path ? path.dirname(file.path) : process.cwd()
    const nodes: any[] = []

    visit(tree, "image", (node) => {
      nodes.push(node)
    })

    await Promise.all(
      nodes.map(async (node) => {
        try {
          const placeholder =
            node.url.startsWith("http://") || node.url.startsWith("https://")
              ? await getBlurPlaceholderFromURL(node.url)
              : await getBlurPlaceholderFromFile(path.resolve(dir, node.url))

          node.data = node.data ?? {}
          node.data.hProperties = {
            ...node.data.hProperties,
            "data-blur": placeholder.dataURI,
            "data-blur-width": placeholder.width,
            "data-blur-height": placeholder.height,
          }
        } catch {
          // leave the image untouched if placeholder generation fails
        }
      }),
    )
  }
}
