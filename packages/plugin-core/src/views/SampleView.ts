import {
    DMessage
} from "@dendronhq/common-all";
import * as vscode from "vscode";
import { DendronWebViewKey } from "../constants";
import { getWS } from "../workspace";
import { WebViewUtils } from "./utils";


export class SampleView implements vscode.WebviewViewProvider {
    public static readonly viewType = `dendron.${DendronWebViewKey.SAMPLE_VIEW}`;
    private _view?: vscode.WebviewView;

    constructor() {
        getWS().setWebView(DendronWebViewKey.SAMPLE_VIEW, this)
    }

    public postMessage(msg: DMessage) {
        this._view?.webview.postMessage(msg)
    }
    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }

    private _getHtmlForWebview(_webview: vscode.Webview) {
        return WebViewUtils.genHTML({ title: "SamplePage", view: DendronWebViewKey.SAMPLE_VIEW })
    }

}