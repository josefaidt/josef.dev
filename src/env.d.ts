type Runtime = import("@astrojs/cloudflare").Runtime<Env>

declare namespace App {
  interface Locals extends Runtime {}
}

/**
 * The part of WebMCP the site uses, from https://webmachinelearning.github.io/webmcp/. TypeScript's
 * DOM types don't cover it yet, and browsers without it leave `document.modelContext` undefined.
 */
interface ModelContextTool {
  name: string
  title?: string
  description: string
  inputSchema?: object
  outputSchema?: object
  execute: (input: object, options: { signal: AbortSignal }) => Promise<unknown>
  annotations?: {
    readOnlyHint?: boolean
    untrustedContentHint?: boolean
    consequentialHint?: boolean
  }
}

interface ModelContext extends EventTarget {
  registerTool(
    tool: ModelContextTool,
    options?: { exposedTo?: string[]; signal?: AbortSignal },
  ): Promise<void>
}

interface Document {
  readonly modelContext?: ModelContext
}
