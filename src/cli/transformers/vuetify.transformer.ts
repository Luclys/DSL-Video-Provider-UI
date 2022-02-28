import * as fs from 'fs';
import fse from 'fs-extra';
import { join } from 'path';
import { App, Header, Page } from '../../language-server/generated/ast';
import replaceStream from 'replacestream';
import stream from "node:stream";
import * as util from "util";
import { IHeaderAttributes, ILink } from "./interfaces";



export class VuetifyTransformer {

    private readonly generatedSourceDestination: string;
    private readonly templatesVuetifyLocation: string;
    private projectName: string = "";
    private pagePaths: ILink[] = [];

    constructor(private readonly templatesRootLocation: string, private readonly generatedRootDestination: string) {
        this.generatedSourceDestination = join(this.generatedRootDestination, '/src');
        this.templatesVuetifyLocation = join(this.templatesRootLocation, '/vuetify');
    }

    public generateApp(app: App): void {
        this.projectName = app.name.toLocaleLowerCase().replace(/[!$%^&*()+|~=`{}\[\]:";'<>?,.\/]/, '').replace(/\s+/, '-');
        fse.copySync(join(this.templatesVuetifyLocation, '/vue.config.js'), join(this.generatedRootDestination, 'vue.config.js'), {overwrite: false});
        fse.copySync(join(this.templatesVuetifyLocation, '/babel.config.js'), join(this.generatedRootDestination, 'babel.config.js'), {overwrite: false});
        if (!fs.existsSync(join(this.generatedRootDestination, 'package.json'))) {
            const writeStream = fs.createWriteStream(join(this.generatedRootDestination, 'package.json'));
            fs.createReadStream(join(this.templatesVuetifyLocation, 'package.json'))
                .pipe(replaceStream(/%NAME%/, this.projectName))
                .pipe(writeStream);
        }
        fse.copySync(join(this.templatesRootLocation, '/assets'), join(this.generatedRootDestination, 'assets'), {overwrite: false});

        const componentsFolder = join(this.generatedSourceDestination, 'components');
        if (!fs.existsSync(componentsFolder)) {
            fs.mkdirSync(componentsFolder, {recursive: true});
        }

        this.pagePaths = this.extractPagesPath(app.pages);

        this.generateHeader(app.header);

        for (const page of app.pages) {
            this.generatePage(page);
        }
    }

    private generateHeader(header: Header) {
        const attributes: IHeaderAttributes = this.extractHeaderAttributes(header);
        const templatePath = join(this.templatesVuetifyLocation, '/src/components/Header.vue');
        const destinationPath = join(this.generatedSourceDestination, '/components/Header.vue');

        if (!fs.existsSync(destinationPath)) {
            const writeStream = fs.createWriteStream(destinationPath);

            const pipes = [
                attributes.title && replaceStream(/%!?TitleComponent%/g, ''),
                attributes.title && replaceStream(/%Title%/g, this.projectName),
                !attributes.title && replaceStream(/%TitleComponent%.*%!TitleComponent%/g, ''),

                attributes.darkmodeBtn && replaceStream(/%!?DarkmodeComponent%/g, ''),
                !attributes.darkmodeBtn && replaceStream(/%DarkmodeComponent%.*%!DarkmodeComponent%/g, ''),
                /** Loïc */
                attributes.tableOfContent && replaceStream(/%!?ToCComponent%/g, ''),
                attributes.tableOfContent && replaceStream(/%ToCList%/g, JSON.stringify(this.pagePaths) ),
                !attributes.tableOfContent && replaceStream(/%ToCComponent%.*%!ToCComponent%/g, ''),

                /** Zaïd */

                writeStream,
            ].filter(Boolean);

            const pipeline = util.promisify(stream.pipeline);
            // @ts-ignore
            pipeline(fs.createReadStream(templatePath), ...pipes);
        }
    }

    private extractHeaderAttributes(header: Header): IHeaderAttributes {
        return header.attributes
          .map(ha => <IHeaderAttributes>Object.fromEntries([[ha.name, ha.value === 'true']]))
          .reduce((previousValue, currentValue) => Object.assign(previousValue, currentValue), {});
    }

    private generatePage(page: Page): void {

    }

    private extractPagesPath(pages: Array<Page>): ILink[] {
        //TODO escape chars + edit link
        return pages.map(page => {return {"title": page.name, "link": page.name}});
    }
}
