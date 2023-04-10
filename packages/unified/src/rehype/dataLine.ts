import type { Processor, Plugin } from "unified";
import type { Node } from "unist";
// @ts-ignore
import type { HastNode } from "hast-util-select";
// @ts-ignore
import parseSelector from "hast-util-parse-selector";
// @ts-ignore
import { selectAll } from "hast-util-select";

type PluginOpts = {
  selector?: string;
};

const plugin: Plugin<[PluginOpts?]> = function plugin(
  this: Processor,
  opts = {}
) {
  function transformer(tree: Node): void {
    const root = tree as HastNode;
    for (const match of selectAll(opts.selector || "*", root)) {
      if (match.position?.start.line) {
        (match.properties ||= {})["data-line"] = match.position.start.line;
      }
    }
  }
  return transformer;
};

export { plugin as dataLine };
