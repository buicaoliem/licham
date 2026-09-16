// The project's tsconfig deliberately omits DOM/Node lib types (types: []) so
// the published package stays environment-agnostic. A few tests print manual
// cross-check tables via console.log; declare just that global for them.
declare const console: { log: (...args: unknown[]) => void };
