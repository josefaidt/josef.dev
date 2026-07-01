import type { Element, Root } from "hast"
import { visit } from "unist-util-visit"

export function rehypeBlurWrapper() {
  return function (tree: Root) {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "img") return
      if (!parent || index == null) return

      const placeholder = node.properties?.["data-blur"] as string | undefined
      if (!placeholder) return

      const width = node.properties?.["data-blur-width"]
      const height = node.properties?.["data-blur-height"]

      const imgProps = { ...node.properties }
      delete imgProps["data-blur"]
      delete imgProps["data-blur-width"]
      delete imgProps["data-blur-height"]

      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: {
          class: "blur-wrapper",
          style: `aspect-ratio: ${width} / ${height}`,
        },
        children: [
          {
            type: "element",
            tagName: "img",
            properties: {
              class: "blur-placeholder",
              src: placeholder,
              "aria-hidden": "true",
              alt: "",
            },
            children: [],
          } as Element,
          {
            type: "element",
            tagName: "img",
            properties: {
              ...imgProps,
              class: "blur-full",
              loading: "lazy",
              decoding: "async",
              width,
              height,
            },
            children: [],
          } as Element,
        ],
      }

      parent.children.splice(index, 1, wrapper)
    })
  }
}
