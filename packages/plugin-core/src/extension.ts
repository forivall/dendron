import * as vscode from "vscode";
import { Logger } from "./logger";
import { DWorkspace } from "./workspacev2";

export function activate(context: vscode.ExtensionContext) {
  Logger.configure(context, "debug");
  const ext: typeof import("./_extension") = require("./_extension"); // eslint-disable-line global-require
  ext.activate(context);
  return {
    DWorkspace,
    Logger,
  };
}

export function deactivate() {
  const ext: typeof import("./_extension") = require("./_extension"); // eslint-disable-line global-require
  ext.deactivate();
}
