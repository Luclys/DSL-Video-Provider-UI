import fs from 'fs';
import fse from 'fs-extra';
import { App } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import { join } from "path";
import { generateApp } from "./transformers/grommet.transformer";

export async function generateGrommet (app: App, filePath: string, destination: string | undefined): Promise<void> {
    const data = extractDestinationAndName(filePath, destination);
    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    } else {
        await fse.emptydir(data.destination).catch(err => {
            console.warn(`Clean destination folder failure.`, err);
        });
    }

    fse.copySync(join(__dirname, '../../templates/grommet'), data.destination);
    fse.copySync(join(__dirname, '../../templates/assets'), join(data.destination, 'assets'));
    await generateApp(app, join(data.destination, 'src'));
}
