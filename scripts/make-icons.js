//
// This script downloads and generates icons and icon metadata.
//
import Promise from 'bluebird';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import del from 'del';
import download from 'download';
import mkdirp from 'mkdirp';
import fm from 'front-matter';
import { readFileSync } from 'fs';
import { stat, readFile, writeFile } from 'fs/promises';
import glob from 'globby';
import path from 'path';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const iconDir = path.join(outdir, '/assets/bootstrap-icons');

const iconPackageData = JSON.parse(readFileSync('./node_modules/bootstrap-icons/package.json', 'utf8'));
let numIcons = 0;

(async () => {
  try {
    const version = iconPackageData.version;
    const srcPath = `./.cache/icons/icons-${version}`;
    const url = `https://github.com/twbs/icons/archive/v${version}.zip`;

    try {
      await stat(`${srcPath}/LICENSE.md`);
      console.log('Generating icons from cache');
    } catch {
      // Download the source from GitHub (since not everything is published to NPM)
      console.log(`Downloading and extracting Bootstrap Icons ${version} 📦`);
      await download(url, './.cache/icons', { extract: true });
    }

    // Copy icons
    console.log(`Copying icons and license`);
    await del([iconDir]);
    await mkdirp(iconDir);
    await Promise.all([
      copy(`${srcPath}/icons`, iconDir),
      copy(`${srcPath}/LICENSE.md`, path.join(iconDir, 'LICENSE.md')),
      copy(`${srcPath}/bootstrap-icons.svg`, './docs/assets/bootstrap-icons/sprite.svg', { overwrite: true })
    ]);

    // Generate metadata
    console.log(`Generating icon metadata`);
    const files = await glob(`${srcPath}/docs/content/icons/**/*.md`);

    const metadata = await Promise.map(files, async file => {
      const name = path.basename(file, path.extname(file));
      const data = fm(await readFile(file, 'utf8')).attributes;
      numIcons++;

      return {
        name,
        title: data.title,
        categories: data.categories,
        tags: data.tags
      };
    });

    await writeFile(path.join(iconDir, 'icons.json'), JSON.stringify(metadata, null, 2), 'utf8');

    console.log(chalk.cyan(`Successfully processed ${numIcons} icons ✨\n`));
  } catch (err) {
    console.error(err);
  }
})();

// fetch viur Icons
let numIcons2 = 0;
const iconDir2 = path.join(outdir, '/assets/icons');

(async () => {
  try {
    const version = 'master';
    const srcPath = `./.cache/icons/viur-icons-${version}`;
    const url = `https://github.com/viur-framework/viur-icons/archive/refs/heads/${version}.zip`;

    try {
      await stat(`${srcPath}/LICENSE`);
      console.log('Generating icons from cache');
    } catch {
      // Download the source from GitHub (since not everything is published to NPM)
      console.log(`Downloading and extracting ViUR Icons ${version} 📦`);
      await download(url, './.cache/icons', { extract: true });
    }

    // Copy icons
    console.log(`Copying icons and license`);
    await del([iconDir2]);
    await mkdirp(iconDir2);
    await Promise.all([
      copy(`${srcPath}`, iconDir2),
      //copy(`${srcPath}/LICENSE`, path.join(iconDir2, 'LICENSE')),
      //copy(`${srcPath}/bootstrap-icons.svg`, './docs/assets/icons/sprite.svg', { overwrite: true })
    ]);

    // Generate metadata
    console.log(`Generating icon metadata`);
    const files = await glob(`${srcPath}/*.svg`);

    const metadata = await Promise.map(files, async file => {
      const name = path.basename(file, path.extname(file));
      numIcons2++;

      return {
        name,
        title: name,
        categories: [name],
        tags: [name]
      };
    });
    const dom = new JSDOM();
    const sprite = await Promise.map(files, async file => {
      const name = path.basename(file, path.extname(file));
      const data = fm(await readFile(file, 'utf8'))
      let svgcode = dom.window.document.createRange().createContextualFragment(data["body"]).firstElementChild.innerHTML

      svgcode = svgcode.toString().replace(/#fff/g,'currentcolor')
      svgcode = svgcode.toString().replace(/#FFFFFF/g,'currentcolor')

      return `
        <symbol viewBox="0 0 60 60" id="${name}">
            ${svgcode}
        </symbol>
      `;
    });

    await writeFile('./docs/assets/icons/sprite.svg',
      `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${sprite.join()}</svg>`,
      'utf8');
    await writeFile(path.join(iconDir2, 'icons.json'), JSON.stringify(metadata, null, 2), 'utf8');

    console.log(chalk.cyan(`Successfully processed ${numIcons2} icons ✨\n`));
  } catch (err) {
    console.error(err);
  }
})();



