import fs from 'fs';
import { join } from "path";
import { App } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import { VuetifyTransformer } from "./transformers/vuetify.transformer";

export async function generateVuetify(app: App, filePath: string, destination: string | undefined): Promise<void> {
    const data = extractDestinationAndName(filePath, destination);
    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, {recursive: true});
    }

    await new VuetifyTransformer(join(__dirname, '../../templates'), data.destination).generateApp(app);
}
