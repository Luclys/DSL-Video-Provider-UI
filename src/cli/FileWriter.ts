import { AstNode } from "langium";
import { App, Component, isApp } from "../language-server/generated/ast";

export class FileWriter {

    constructor(
        private readonly appDestination: string,
        private readonly componentsDestination: string
    ) {
    }

    public writeFile(node: AstNode) {
        if (isApp(node)) {
            this.writeApp(<App> node);
        }
    }

    private writeApp(app: App) {

    }

    private writeComponent(component: Component) {

    }
}