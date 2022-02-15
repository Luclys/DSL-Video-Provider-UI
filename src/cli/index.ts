import colors from 'colors';
import { Command } from 'commander';
import { languageMetaData } from '../language-server/generated/module';
import { App } from '../language-server/generated/ast';
import { createVideoProviderUiServices } from '../language-server/video-provider-ui-module';
import { extractAstNode } from './cli-util';
import { generateGrommet } from './generator';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const model = await extractAstNode<App>(fileName, languageMetaData.fileExtensions, createVideoProviderUiServices());
    await generateGrommet(model, fileName, opts.destination).then(() => {
        console.log(colors.green(`Grommet code generated successfully`));
    }).catch(err => {
        console.error(colors.red(`Grommet code generation failure\n`), err);
    });
};

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    program
        .command('generate')
        .argument('<file>', `possible file extensions: ${languageMetaData.fileExtensions.join(', ')}`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);

    program.parse(process.argv);
}
