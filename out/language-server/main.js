"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const langium_1 = require("langium");
const node_1 = require("vscode-languageserver/node");
const video_provider_ui_module_1 = require("./video-provider-ui-module");
// Create a connection to the client
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
// Inject the language services
const services = (0, video_provider_ui_module_1.createVideoProviderUiServices)({ connection });
// Start the language server with the language-specific services
(0, langium_1.startLanguageServer)(services);
//# sourceMappingURL=main.js.map