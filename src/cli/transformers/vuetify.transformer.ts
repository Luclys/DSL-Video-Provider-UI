import * as fs from 'fs';
import fse from 'fs-extra';
import { join } from 'path';
import { App, Page } from '../../language-server/generated/ast';
// @ts-ignore
import streamReplace from 'stream-replace';

const template = `<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>
`

const script = `
<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }
    },
  }
</script>
`

export class VuetifyTransformer {

    private readonly generatedSourceDestination: string;

    constructor(private readonly templatesRootLocation: string, private readonly generatedRootDestination: string) {
        this.generatedSourceDestination = join(this.generatedRootDestination, '/src');
    }

    public generateApp(app: App): void {
        fse.copySync(join(this.templatesRootLocation, '/vuetify/vue.config.js'), this.generatedSourceDestination, {overwrite: false});
        fse.copySync(join(this.templatesRootLocation, '/vuetify/babel.config.js'), this.generatedSourceDestination, {overwrite: false});
        if (!fs.existsSync(join(this.generatedRootDestination, 'package.json'))) {
            const projectName = app.name.toLocaleLowerCase().replace(/\s+/, '-');
            const writeStream = fs.createWriteStream(join(this.generatedRootDestination, 'package.json'));
            fs.createReadStream(join(this.templatesRootLocation, 'package.json'))
                .pipe(streamReplace(/%NAME%/, projectName))
                .pipe(writeStream);
        }
        fse.copySync(join(this.templatesRootLocation, '/assets'), join(this.generatedRootDestination, 'assets'), {overwrite: false});
        fs.mkdirSync(join(this.generatedRootDestination, 'src/components'));

        for (const page of app.pages) {
            this.generatePage(page);
        }
    }

    private generatePage(page: Page): void {

    }
}
